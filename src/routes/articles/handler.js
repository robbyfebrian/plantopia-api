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
exports.deleteArticle = exports.searchArticles = exports.createArticle = exports.getArticleDetail = exports.getSavedArticles = exports.getMyArticles = exports.getExploreArticles = void 0;
const articles_1 = require("../../../schema/articles");
const articleSaves_1 = require("../../../schema/articleSaves");
const articleVotes_1 = require("../../../schema/articleVotes");
const comments_1 = require("../../../schema/comments");
const drizzle_orm_1 = require("drizzle-orm");
const authHelper_1 = require("../../utils/authHelper");
// Explore page: artikel random dari user lain
const getExploreArticles = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { userId } = request.query;
    const result = yield db
        .select()
        .from(articles_1.articles)
        .where((0, drizzle_orm_1.ne)(articles_1.articles.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(articles_1.articles.createdAt))
        .limit(20);
    return h.response(result).code(200);
});
exports.getExploreArticles = getExploreArticles;
// My articles: artikel milik user
const getMyArticles = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const result = yield db
        .select()
        .from(articles_1.articles)
        .where((0, drizzle_orm_1.eq)(articles_1.articles.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(articles_1.articles.createdAt));
    return h.response(result).code(200);
});
exports.getMyArticles = getMyArticles;
// Saved articles: artikel yang disimpan user
const getSavedArticles = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const result = yield db
        .select({
        id: articles_1.articles.id,
        userId: articles_1.articles.userId,
        title: articles_1.articles.title,
        description: articles_1.articles.description,
        thumbnailUrl: articles_1.articles.thumbnailUrl,
        content: articles_1.articles.content,
        createdAt: articles_1.articles.createdAt,
        updatedAt: articles_1.articles.updatedAt,
        savedAt: articleSaves_1.articleSaves.savedAt,
    })
        .from(articleSaves_1.articleSaves)
        .innerJoin(articleSaves_1.articleSaves, (0, drizzle_orm_1.eq)(articleSaves_1.articleSaves.articleId, articles_1.articles.id))
        .where((0, drizzle_orm_1.eq)(articleSaves_1.articleSaves.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(articleSaves_1.articleSaves.savedAt));
    return h.response(result).code(200);
});
exports.getSavedArticles = getSavedArticles;
// Detail artikel (dengan info save, vote, komentar)
const getArticleDetail = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const db = request.server.app.db;
    const { id } = request.params;
    // Ensure user is authenticated
    const userId = yield (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    // Artikel
    const [article] = yield db.select().from(articles_1.articles).where((0, drizzle_orm_1.eq)(articles_1.articles.id, id));
    if (!article)
        return h.response({ error: 'Not found' }).code(404);
    // Apakah disave user?
    const [saved] = yield db
        .select()
        .from(articleSaves_1.articleSaves)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(articleSaves_1.articleSaves.articleId, id), (0, drizzle_orm_1.eq)(articleSaves_1.articleSaves.userId, userId)));
    // Apakah di-vote user?
    const [vote] = yield db
        .select()
        .from(articleVotes_1.articleVotes)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(articleVotes_1.articleVotes.articleId, id), (0, drizzle_orm_1.eq)(articleVotes_1.articleVotes.userId, userId)));
    // Komentar
    const commentList = yield db
        .select()
        .from(comments_1.comments)
        .where((0, drizzle_orm_1.eq)(comments_1.comments.articleId, id))
        .orderBy((0, drizzle_orm_1.asc)(comments_1.comments.createdAt));
    return h
        .response(Object.assign(Object.assign({}, article), { isSaved: !!saved, voteType: (_a = vote === null || vote === void 0 ? void 0 : vote.voteType) !== null && _a !== void 0 ? _a : null, comments: commentList }))
        .code(200);
});
exports.getArticleDetail = getArticleDetail;
// Membuat artikel baru
const createArticle = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const userId = yield (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const payload = request.payload;
    const data = Object.assign(Object.assign({}, payload), { userId }); // userId dari token, bukan dari payload
    const [inserted] = yield db.insert(articles_1.articles).values(data).returning();
    return h.response(inserted).code(201);
});
exports.createArticle = createArticle;
const searchArticles = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { q } = request.query;
    if (!q) {
        return h.response([]).code(200);
    }
    // Contoh: search di title dan description
    const result = yield db
        .select()
        .from(articles_1.articles)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(articles_1.articles.title, `%${q}%`), (0, drizzle_orm_1.ilike)(articles_1.articles.description, `%${q}%`))))
        .orderBy((0, drizzle_orm_1.desc)(articles_1.articles.createdAt));
    return h.response(result).code(200);
});
exports.searchArticles = searchArticles;
const deleteArticle = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const db = request.server.app.db;
    const { id } = request.params;
    const userId = yield (0, authHelper_1.getUserIdFromRequest)(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    // Pastikan artikel milik user
    const [article] = yield db
        .select()
        .from(articles_1.articles)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(articles_1.articles.id, id), (0, drizzle_orm_1.eq)(articles_1.articles.userId, userId)));
    if (!article) {
        return h.response({ error: 'Not found or not your article' }).code(404);
    }
    yield db.delete(articles_1.articles).where((0, drizzle_orm_1.eq)(articles_1.articles.id, id));
    return h.response({ message: 'Deleted' }).code(200);
});
exports.deleteArticle = deleteArticle;
