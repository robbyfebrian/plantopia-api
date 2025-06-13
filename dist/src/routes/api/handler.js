import { achievements, userAchievements, missions, userMissions, diseases, detections, collectedPlants, articles, articleTags, articleVotes, articleSaves, comments, } from '../../../schema';
// ACHIEVEMENTS
export const createAchievement = async (request, h) => {
    const db = request.server.app.db;
    const { name, description, iconUrl, conditionType, conditionValue } = request.payload;
    const [achievement] = await db
        .insert(achievements)
        .values({ name, description, iconUrl, conditionType, conditionValue })
        .returning();
    return h.response(achievement).code(201);
};
// USER ACHIEVEMENTS
export const createUserAchievement = async (request, h) => {
    const db = request.server.app.db;
    const { userId, achievementId } = request.payload;
    const [userAchievement] = await db
        .insert(userAchievements)
        .values({ userId, achievementId })
        .returning();
    return h.response(userAchievement).code(201);
};
// MISSIONS
export const createMission = async (request, h) => {
    const db = request.server.app.db;
    const { description, goalType, goalValue, xpReward, type } = request.payload;
    const [mission] = await db
        .insert(missions)
        .values({ description, goalType, goalValue, xpReward, type })
        .returning();
    return h.response(mission).code(201);
};
// USER MISSIONS
export const createUserMission = async (request, h) => {
    const db = request.server.app.db;
    const { userId, missionId, isCompleted } = request.payload;
    const [userMission] = await db
        .insert(userMissions)
        .values({ userId, missionId, isCompleted })
        .returning();
    return h.response(userMission).code(201);
};
// DISEASES
export const createDisease = async (request, h) => {
    const db = request.server.app.db;
    const { name, description, careTips, imageUrl } = request.payload;
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
export const createDetection = async (request, h) => {
    const db = request.server.app.db;
    const { userId, plantName, diseaseId, confidenceScore, imageUrl } = request.payload;
    const [detection] = await db
        .insert(detections)
        .values({ userId, plantName, diseaseId, confidenceScore, imageUrl })
        .returning();
    return h.response(detection).code(201);
};
// COLLECTED PLANTS
export const createCollectedPlant = async (request, h) => {
    const db = request.server.app.db;
    const { userId, plantName } = request.payload;
    const [plant] = await db
        .insert(collectedPlants)
        .values({ userId, plantName })
        .returning();
    return h.response(plant).code(201);
};
// ARTICLES
export const createArticle = async (request, h) => {
    const db = request.server.app.db;
    const { userId, title, description, thumbnailUrl, content } = request.payload;
    const [article] = await db
        .insert(articles)
        .values({ userId, title, description, thumbnailUrl, content })
        .returning();
    return h.response(article).code(201);
};
// ARTICLE TAGS
export const createArticleTag = async (request, h) => {
    const db = request.server.app.db;
    const { articleId, tag } = request.payload;
    const [articleTag] = await db
        .insert(articleTags)
        .values({ articleId, tag })
        .returning();
    return h.response(articleTag).code(201);
};
// ARTICLE VOTES
export const createArticleVote = async (request, h) => {
    const db = request.server.app.db;
    const { userId, articleId, voteType } = request.payload;
    const [vote] = await db
        .insert(articleVotes)
        .values({ userId, articleId, voteType })
        .returning();
    return h.response(vote).code(201);
};
// ARTICLE SAVES
export const createArticleSave = async (request, h) => {
    const db = request.server.app.db;
    const { userId, articleId } = request.payload;
    const [save] = await db
        .insert(articleSaves)
        .values({ userId, articleId })
        .returning();
    return h.response(save).code(201);
};
// COMMENTS
export const createComment = async (request, h) => {
    const db = request.server.app.db;
    const { userId, articleId, parentCommentId, content } = request.payload;
    const [comment] = await db
        .insert(comments)
        .values({ userId, articleId, parentCommentId, content })
        .returning();
    return h.response(comment).code(201);
};
