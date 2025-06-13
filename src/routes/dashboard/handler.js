"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissionJournal = exports.getAchievementJournal = exports.getDiseaseJournal = exports.getPlantCollection = exports.getOverview = void 0;
const userProfiles_1 = require("../../../schema/userProfiles");
const userAchievements_1 = require("../../../schema/userAchievements");
const achievements_1 = require("../../../schema/achievements");
const collectedPlants_1 = require("../../../schema/collectedPlants");
const detections_1 = require("../../../schema/detections");
const diseases_1 = require("../../../schema/diseases");
const missions_1 = require("../../../schema/missions");
const userMissions_1 = require("../../../schema/userMissions");
const drizzle_orm_1 = require("drizzle-orm");
const authHelper_1 = require("../../utils/authHelper");
// Overview dashboard
const getOverview = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    // User profile
    const [user] = yield db
        .select()
        .from(userProfiles_1.userProfiles)
        .where((0, drizzle_orm_1.eq)(userProfiles_1.userProfiles.id, userId));
    if (!user)
        return h.response({ error: 'User not found' }).code(404);
    // Last achievement
    const [lastUserAchievement] = yield db
        .select()
        .from(userAchievements_1.userAchievements)
        .where((0, drizzle_orm_1.eq)(userAchievements_1.userAchievements.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(userAchievements_1.userAchievements.achievedAt))
        .limit(1);
    let lastAchievement = null;
    if (lastUserAchievement && lastUserAchievement.achievementId) {
        [lastAchievement] = yield db
            .select()
            .from(achievements_1.achievements)
            .where((0, drizzle_orm_1.eq)(achievements_1.achievements.id, lastUserAchievement.achievementId))
            .orderBy((0, drizzle_orm_1.desc)(achievements_1.achievements.createdAt));
    }
    // Total collected plants & health status
    const plantCollection = yield db
        .select()
        .from(collectedPlants_1.collectedPlants)
        .where((0, drizzle_orm_1.eq)(collectedPlants_1.collectedPlants.userId, userId));
    // Optionally, join with detections for health status
    // Total diseases found
    const foundDiseases = yield db
        .select()
        .from(detections_1.detections)
        .where((0, drizzle_orm_1.eq)(detections_1.detections.userId, userId));
    const uniqueDiseaseIds = [...new Set(foundDiseases.map((d) => d.diseaseId))];
    // Today's missions
    const todayMissions = yield db
        .select()
        .from(userMissions_1.userMissions)
        .innerJoin(missions_1.missions, (0, drizzle_orm_1.eq)(userMissions_1.userMissions.missionId, missions_1.missions.id))
        .where((0, drizzle_orm_1.eq)(userMissions_1.userMissions.userId, userId));
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
});
exports.getOverview = getOverview;
// Koleksi tanaman user
const getPlantCollection = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const result = yield db
        .select()
        .from(collectedPlants_1.collectedPlants)
        .where((0, drizzle_orm_1.eq)(collectedPlants_1.collectedPlants.userId, userId));
    return h.response(result).code(200);
});
exports.getPlantCollection = getPlantCollection;
// Jurnal penyakit (semua penyakit, info ditemukan user)
const getDiseaseJournal = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const allDiseases = yield db.select().from(diseases_1.diseases);
    const userDetections = yield db
        .select()
        .from(detections_1.detections)
        .where((0, drizzle_orm_1.eq)(detections_1.detections.userId, userId));
    const foundDiseaseIds = new Set(userDetections.map((d) => d.diseaseId));
    const result = allDiseases.map((d) => (Object.assign(Object.assign({}, d), { isFound: foundDiseaseIds.has(d.id) })));
    return h.response(result).code(200);
});
exports.getDiseaseJournal = getDiseaseJournal;
// Jurnal lencana (semua lencana, info sudah didapat user)
const getAchievementJournal = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const allAchievements = yield db.select().from(achievements_1.achievements);
    const userAch = yield db
        .select()
        .from(userAchievements_1.userAchievements)
        .where((0, drizzle_orm_1.eq)(userAchievements_1.userAchievements.userId, userId));
    const achievedIds = new Set(userAch.map((a) => a.achievementId));
    const result = allAchievements.map((a) => (Object.assign(Object.assign({}, a), { isAchieved: achievedIds.has(a.id) })));
    return h.response(result).code(200);
});
exports.getAchievementJournal = getAchievementJournal;
// Jurnal misi (semua misi, info sudah selesai user)
const getMissionJournal = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const allMissions = yield db.select().from(missions_1.missions);
    const userMissionRows = yield db
        .select()
        .from(userMissions_1.userMissions)
        .where((0, drizzle_orm_1.eq)(userMissions_1.userMissions.userId, userId));
    const completedMissionIds = new Set(userMissionRows
        .filter((m) => m.isCompleted === 'true')
        .map((m) => m.missionId));
    const result = allMissions.map((m) => (Object.assign(Object.assign({}, m), { isCompleted: completedMissionIds.has(m.id) })));
    return h.response(result).code(200);
});
exports.getMissionJournal = getMissionJournal;
