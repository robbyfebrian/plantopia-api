import { Server } from '@hapi/hapi';
import registerDashboardRoutes from './routes/dashboard';
import registerArticleRoutes from './routes/articles';
import registerDetectRoutes from './routes/detect';
import { setupDrizzle } from './plugins/drizzle';
import registerAuthRoutes from './routes/auth';
import registerApiRoutes from './routes/api';

async function startServer() {
  const server = new Server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: { origin: ['*'] },
    },
  });

  await setupDrizzle(server);

  registerDashboardRoutes(server);
  registerArticleRoutes(server);
  registerDetectRoutes(server);
  registerAuthRoutes(server);
  registerApiRoutes(server);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
