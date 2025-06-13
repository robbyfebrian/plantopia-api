import { Request, ResponseToolkit } from '@hapi/hapi';
import { userProfiles } from '../../../schema/userProfiles';
import { userAchievements } from '../../../schema/userAchievements';
import { achievements } from '../../../schema/achievements';
import { collectedPlants } from '../../../schema/collectedPlants';
import { detections } from '../../../schema/detections';
import { diseases } from '../../../schema/diseases';
import { missions } from '../../../schema/missions';
import { userMissions } from '../../../schema/userMissions';
import { eq, desc } from 'drizzle-orm';
import { getUserIdFromRequest } from '../../utils/authHelper';

// Overview dashboard
export const getOverview = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;

  // Ensure user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) return h.response({ error: 'Unauthorized' }).code(401);

  // User profile
  const [user] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.id, userId));
  if (!user) return h.response({ error: 'User not found' }).code(404);

  // Last achievement
  const [lastUserAchievement] = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId))
    .orderBy(desc(userAchievements.achievedAt))
    .limit(1);

  let lastAchievement = null;
  if (lastUserAchievement && lastUserAchievement.achievementId) {
    [lastAchievement] = await db
      .select()
      .from(achievements)
      .where(eq(achievements.id, lastUserAchievement.achievementId))
      .orderBy(desc(achievements.createdAt));
  }

  // Total collected plants & health status
  const plantCollection = await db
    .select()
    .from(collectedPlants)
    .where(eq(collectedPlants.userId, userId));
  // Optionally, join with detections for health status

  // Total diseases found
  const foundDiseases = await db
    .select()
    .from(detections)
    .where(eq(detections.userId, userId));
  const uniqueDiseaseIds = [...new Set(foundDiseases.map((d) => d.diseaseId))];

  // Today's missions
  const todayMissions = await db
    .select()
    .from(userMissions)
    .innerJoin(missions, eq(userMissions.missionId, missions.id))
    .where(eq(userMissions.userId, userId));

  return h
    .response({
      user: {
        id: user.id,
        username: user.username,
        level: user.level,
        xp: user.xp,
        streakCount: user.streakCount,
      },
      lastAchievement,
      totalCollectedPlants: plantCollection.length,
      plantCollection,
      totalDiseasesFound: uniqueDiseaseIds.length,
      todayMissions,
    })
    .code(200);
};

// Koleksi tanaman user
export const getPlantCollection = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;

  // Ensure user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) return h.response({ error: 'Unauthorized' }).code(401);

  const result = await db
    .select()
    .from(collectedPlants)
    .where(eq(collectedPlants.userId, userId));
  return h.response(result).code(200);
};

// Jurnal penyakit (semua penyakit, info ditemukan user)
export const getDiseaseJournal = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;

  // Ensure user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) return h.response({ error: 'Unauthorized' }).code(401);

  const allDiseases = await db.select().from(diseases);
  const userDetections = await db
    .select()
    .from(detections)
    .where(eq(detections.userId, userId));
  const foundDiseaseIds = new Set(userDetections.map((d) => d.diseaseId));

  const result = allDiseases.map((d) => ({
    ...d,
    isFound: foundDiseaseIds.has(d.id),
  }));

  return h.response(result).code(200);
};

// Jurnal lencana (semua lencana, info sudah didapat user)
export const getAchievementJournal = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;

  // Ensure user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) return h.response({ error: 'Unauthorized' }).code(401);

  const allAchievements = await db.select().from(achievements);
  const userAch = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));
  const achievedIds = new Set(userAch.map((a) => a.achievementId));

  const result = allAchievements.map((a) => ({
    ...a,
    isAchieved: achievedIds.has(a.id),
  }));

  return h.response(result).code(200);
};

// Jurnal misi (semua misi, info sudah selesai user)
export const getMissionJournal = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;

  // Ensure user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) return h.response({ error: 'Unauthorized' }).code(401);

  const allMissions = await db.select().from(missions);
  const userMissionRows = await db
    .select()
    .from(userMissions)
    .where(eq(userMissions.userId, userId));
  const completedMissionIds = new Set(
    userMissionRows
      .filter((m) => m.isCompleted === 'true')
      .map((m) => m.missionId)
  );

  const result = allMissions.map((m) => ({
    ...m,
    isCompleted: completedMissionIds.has(m.id),
  }));

  return h.response(result).code(200);
};
