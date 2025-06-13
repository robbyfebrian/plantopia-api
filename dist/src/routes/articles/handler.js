import { articles } from '../../../schema/articles';
import { articleSaves } from '../../../schema/articleSaves';
import { articleVotes } from '../../../schema/articleVotes';
import { comments } from '../../../schema/comments';
import { eq, ne, and, or, ilike, asc, desc } from 'drizzle-orm';
import { getUserIdFromRequest } from '../../utils/authHelper';
// Explore page: artikel random dari user lain
export const getExploreArticles = async (request, h) => {
    const db = request.server.app.db;
    const { userId } = request.query;
    const result = await db
        .select()
        .from(articles)
        .where(ne(articles.userId, userId))
        .orderBy(desc(articles.createdAt))
        .limit(20);
    return h.response(result).code(200);
};
// My articles: artikel milik user
export const getMyArticles = async (request, h) => {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const result = await db
        .select()
        .from(articles)
        .where(eq(articles.userId, userId))
        .orderBy(desc(articles.createdAt));
    return h.response(result).code(200);
};
// Saved articles: artikel yang disimpan user
export const getSavedArticles = async (request, h) => {
    const db = request.server.app.db;
    // Ensure user is authenticated
    const userId = getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const result = await db
        .select({
        id: articles.id,
        userId: articles.userId,
        title: articles.title,
        description: articles.description,
        thumbnailUrl: articles.thumbnailUrl,
        content: articles.content,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        savedAt: articleSaves.savedAt,
    })
        .from(articleSaves)
        .innerJoin(articleSaves, eq(articleSaves.articleId, articles.id))
        .where(eq(articleSaves.userId, userId))
        .orderBy(desc(articleSaves.savedAt));
    return h.response(result).code(200);
};
// Detail artikel (dengan info save, vote, komentar)
export const getArticleDetail = async (request, h) => {
    const db = request.server.app.db;
    const { id } = request.params;
    // Ensure user is authenticated
    const userId = await getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    // Artikel
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    if (!article)
        return h.response({ error: 'Not found' }).code(404);
    // Apakah disave user?
    const [saved] = await db
        .select()
        .from(articleSaves)
        .where(and(eq(articleSaves.articleId, id), eq(articleSaves.userId, userId)));
    // Apakah di-vote user?
    const [vote] = await db
        .select()
        .from(articleVotes)
        .where(and(eq(articleVotes.articleId, id), eq(articleVotes.userId, userId)));
    // Komentar
    const commentList = await db
        .select()
        .from(comments)
        .where(eq(comments.articleId, id))
        .orderBy(asc(comments.createdAt));
    return h
        .response({
        ...article,
        isSaved: !!saved,
        voteType: vote?.voteType ?? null,
        comments: commentList,
    })
        .code(200);
};
// Membuat artikel baru
export const createArticle = async (request, h) => {
    const db = request.server.app.db;
    const userId = await getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    const payload = request.payload;
    const data = { ...payload, userId }; // userId dari token, bukan dari payload
    const [inserted] = await db.insert(articles).values(data).returning();
    return h.response(inserted).code(201);
};
export const searchArticles = async (request, h) => {
    const db = request.server.app.db;
    const { q } = request.query;
    if (!q) {
        return h.response([]).code(200);
    }
    // Contoh: search di title dan description
    const result = await db
        .select()
        .from(articles)
        .where(and(or(ilike(articles.title, `%${q}%`), ilike(articles.description, `%${q}%`))))
        .orderBy(desc(articles.createdAt));
    return h.response(result).code(200);
};
export const deleteArticle = async (request, h) => {
    const db = request.server.app.db;
    const { id } = request.params;
    const userId = await getUserIdFromRequest(request);
    if (!userId)
        return h.response({ error: 'Unauthorized' }).code(401);
    // Pastikan artikel milik user
    const [article] = await db
        .select()
        .from(articles)
        .where(and(eq(articles.id, id), eq(articles.userId, userId)));
    if (!article) {
        return h.response({ error: 'Not found or not your article' }).code(404);
    }
    await db.delete(articles).where(eq(articles.id, id));
    return h.response({ message: 'Deleted' }).code(200);
};
