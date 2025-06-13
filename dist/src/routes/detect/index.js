import * as handler from './handler';
export default function registerDetectRoutes(server) {
    server.route([
        {
            method: 'POST',
            path: '/detect',
            handler: handler.createDetection,
        },
    ]);
}
