import { Server } from '@hapi/hapi';
import * as handler from './handler';

export default function registerDetectRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/detect',
      handler: handler.createDetection,
    },
  ]);
}