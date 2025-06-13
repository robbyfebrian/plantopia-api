import { Request, ResponseToolkit } from '@hapi/hapi';
import {
  achievements,
  userAchievements,
  missions,
  userMissions,
  diseases,
  detections,
  collectedPlants,
  articles,
  articleTags,
  articleVotes,
  articleSaves,
  comments,
} from '../../../schema';

// ACHIEVEMENTS
export const createAchievement = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { name, description, iconUrl, conditionType, conditionValue } =
    request.payload as any;
  const [achievement] = await db
    .insert(achievements)
    .values({ name, description, iconUrl, conditionType, conditionValue })
    .returning();
  return h.response(achievement).code(201);
};

// USER ACHIEVEMENTS
export const createUserAchievement = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { userId, achievementId } = request.payload as any;
  const [userAchievement] = await db
    .insert(userAchievements)
    .values({ userId, achievementId })
    .returning();
  return h.response(userAchievement).code(201);
};

// MISSIONS
export const createMission = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { description, goalType, goalValue, xpReward, type } =
    request.payload as any;
  const [mission] = await db
    .insert(missions)
    .values({ description, goalType, goalValue, xpReward, type })
    .returning();
  return h.response(mission).code(201);
};

// USER MISSIONS
export const createUserMission = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { userId, missionId, isCompleted } = request.payload as any;
  const [userMission] = await db
    .insert(userMissions)
    .values({ userId, missionId, isCompleted })
    .returning();
  return h.response(userMission).code(201);
};

// DISEASES
export const createDisease = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { name, description, careTips, imageUrl } = request.payload as {
    name: string;
    description: string;
    careTips: string[];
    imageUrl: string;
  };
  const [disease] = await db
    .insert(diseases)
    .values({
      name,
      description,
      careTips,
      imageUrl
    })
    .returning();
  return h.response(disease).code(201);
};

// DETECTIONS
export const createDetection = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { userId, plantName, diseaseId, confidenceScore, imageUrl } =
    request.payload as any;
  const [detection] = await db
    .insert(detections)
    .values({ userId, plantName, diseaseId, confidenceScore, imageUrl })
    .returning();
  return h.response(detection).code(201);
};

// COLLECTED PLANTS
export const createCollectedPlant = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { userId, plantName } = request.payload as any;
  const [plant] = await db
    .insert(collectedPlants)
    .values({ userId, plantName })
    .returning();
  return h.response(plant).code(201);
};

// ARTICLES
export const createArticle = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { userId, title, description, thumbnailUrl, content } =
    request.payload as any;
  const [article] = await db
    .insert(articles)
    .values({ userId, title, description, thumbnailUrl, content })
    .returning();
  return h.response(article).code(201);
};

// ARTICLE TAGS
export const createArticleTag = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { articleId, tag } = request.payload as any;
  const [articleTag] = await db
    .insert(articleTags)
    .values({ articleId, tag })
    .returning();
  return h.response(articleTag).code(201);
};

// ARTICLE VOTES
export const createArticleVote = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { userId, articleId, voteType } = request.payload as any;
  const [vote] = await db
    .insert(articleVotes)
    .values({ userId, articleId, voteType })
    .returning();
  return h.response(vote).code(201);
};

// ARTICLE SAVES
export const createArticleSave = async (
  request: Request,
  h: ResponseToolkit
) => {
  const db = request.server.app.db;
  const { userId, articleId } = request.payload as any;
  const [save] = await db
    .insert(articleSaves)
    .values({ userId, articleId })
    .returning();
  return h.response(save).code(201);
};

// COMMENTS
export const createComment = async (request: Request, h: ResponseToolkit) => {
  const db = request.server.app.db;
  const { userId, articleId, parentCommentId, content } =
    request.payload as any;
  const [comment] = await db
    .insert(comments)
    .values({ userId, articleId, parentCommentId, content })
    .returning();
  return h.response(comment).code(201);
};
