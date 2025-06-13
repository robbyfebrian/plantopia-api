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
exports.createComment = exports.createArticleSave = exports.createArticleVote = exports.createArticleTag = exports.createArticle = exports.createCollectedPlant = exports.createDetection = exports.createDisease = exports.createUserMission = exports.createMission = exports.createUserAchievement = exports.createAchievement = void 0;
const schema_1 = require("../../../schema");
// ACHIEVEMENTS
const createAchievement = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { name, description, iconUrl, conditionType, conditionValue } = request.payload;
    const [achievement] = yield db
        .insert(schema_1.achievements)
        .values({ name, description, iconUrl, conditionType, conditionValue })
        .returning();
    return h.response(achievement).code(201);
});
exports.createAchievement = createAchievement;
// USER ACHIEVEMENTS
const createUserAchievement = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, achievementId } = request.payload;
    const [userAchievement] = yield db
        .insert(schema_1.userAchievements)
        .values({ userId, achievementId })
        .returning();
    return h.response(userAchievement).code(201);
});
exports.createUserAchievement = createUserAchievement;
// MISSIONS
const createMission = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { description, goalType, goalValue, xpReward, type } = request.payload;
    const [mission] = yield db
        .insert(schema_1.missions)
        .values({ description, goalType, goalValue, xpReward, type })
        .returning();
    return h.response(mission).code(201);
});
exports.createMission = createMission;
// USER MISSIONS
const createUserMission = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, missionId, isCompleted } = request.payload;
    const [userMission] = yield db
        .insert(schema_1.userMissions)
        .values({ userId, missionId, isCompleted })
        .returning();
    return h.response(userMission).code(201);
});
exports.createUserMission = createUserMission;
// DISEASES
const createDisease = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { name, description, careTips, imageUrl } = request.payload;
    const [disease] = yield db
        .insert(schema_1.diseases)
        .values({
        name,
        description,
        careTips,
        imageUrl
    })
        .returning();
    return h.response(disease).code(201);
});
exports.createDisease = createDisease;
// DETECTIONS
const createDetection = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, plantName, diseaseId, confidenceScore, imageUrl } = request.payload;
    const [detection] = yield db
        .insert(schema_1.detections)
        .values({ userId, plantName, diseaseId, confidenceScore, imageUrl })
        .returning();
    return h.response(detection).code(201);
});
exports.createDetection = createDetection;
// COLLECTED PLANTS
const createCollectedPlant = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, plantName } = request.payload;
    const [plant] = yield db
        .insert(schema_1.collectedPlants)
        .values({ userId, plantName })
        .returning();
    return h.response(plant).code(201);
});
exports.createCollectedPlant = createCollectedPlant;
// ARTICLES
const createArticle = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, title, description, thumbnailUrl, content } = request.payload;
    const [article] = yield db
        .insert(schema_1.articles)
        .values({ userId, title, description, thumbnailUrl, content })
        .returning();
    return h.response(article).code(201);
});
exports.createArticle = createArticle;
// ARTICLE TAGS
const createArticleTag = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { articleId, tag } = request.payload;
    const [articleTag] = yield db
        .insert(schema_1.articleTags)
        .values({ articleId, tag })
        .returning();
    return h.response(articleTag).code(201);
});
exports.createArticleTag = createArticleTag;
// ARTICLE VOTES
const createArticleVote = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, articleId, voteType } = request.payload;
    const [vote] = yield db
        .insert(schema_1.articleVotes)
        .values({ userId, articleId, voteType })
        .returning();
    return h.response(vote).code(201);
});
exports.createArticleVote = createArticleVote;
// ARTICLE SAVES
const createArticleSave = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, articleId } = request.payload;
    const [save] = yield db
        .insert(schema_1.articleSaves)
        .values({ userId, articleId })
        .returning();
    return h.response(save).code(201);
});
exports.createArticleSave = createArticleSave;
// COMMENTS
const createComment = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId, articleId, parentCommentId, content } = request.payload;
    const [comment] = yield db
        .insert(schema_1.comments)
        .values({ userId, articleId, parentCommentId, content })
        .returning();
    return h.response(comment).code(201);
});
exports.createComment = createComment;
