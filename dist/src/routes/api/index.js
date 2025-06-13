import * as handler from './handler';
export default function registerApiRoutes(server) {
    server.route([
        {
            method: 'POST',
            path: '/achievements',
            handler: handler.createAchievement,
        },
        {
            method: 'POST',
            path: '/user-achievements',
            handler: handler.createUserAchievement,
        },
        { method: 'POST', path: '/missions', handler: handler.createMission },
        {
            method: 'POST',
            path: '/user-missions',
            handler: handler.createUserMission,
        },
        { method: 'POST', path: '/diseases', handler: handler.createDisease },
        { method: 'POST', path: '/detections', handler: handler.createDetection },
        {
            method: 'POST',
            path: '/collected-plants',
            handler: handler.createCollectedPlant,
        },
        {
            method: 'POST',
            path: '/article-tags',
            handler: handler.createArticleTag,
        },
        {
            method: 'POST',
            path: '/article-votes',
            handler: handler.createArticleVote,
        },
        {
            method: 'POST',
            path: '/article-saves',
            handler: handler.createArticleSave,
        },
        { method: 'POST', path: '/comments', handler: handler.createComment },
    ]);
}
