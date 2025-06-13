import * as handler from './handler';
export default function registerDashboardRoutes(server) {
    server.route([
        {
            method: 'GET',
            path: '/dashboard/overview',
            handler: handler.getOverview,
        },
        {
            method: 'GET',
            path: '/dashboard/plant-collection',
            handler: handler.getPlantCollection,
        },
        {
            method: 'GET',
            path: '/dashboard/disease-journal',
            handler: handler.getDiseaseJournal,
        },
        {
            method: 'GET',
            path: '/dashboard/achievement',
            handler: handler.getAchievementJournal,
        },
        {
            method: 'GET',
            path: '/dashboard/mission',
            handler: handler.getMissionJournal,
        },
    ]);
}
