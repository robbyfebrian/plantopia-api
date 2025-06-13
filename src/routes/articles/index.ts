import { Server } from '@hapi/hapi';
import * as handler from './handler';

export default function registerArticleRoutes(server: Server) {
  server.route([
    {
      method: 'GET',
      path: '/articles/explore',
      handler: handler.getExploreArticles,
    },
    {
      method: 'GET',
      path: '/articles/my',
      handler: handler.getMyArticles,
    },
    {
      method: 'GET',
      path: '/articles/saved',
      handler: handler.getSavedArticles,
    },
    {
      method: 'GET',
      path: '/articles/{id}',
      handler: handler.getArticleDetail,
    },
    {
      method: 'POST',
      path: '/articles',
      handler: handler.createArticle,
    },
    {
      method: 'GET',
      path: '/articles/search',
      handler: handler.searchArticles,
    },
    {
      method: 'DELETE',
      path: '/articles/{id}',
      handler: handler.deleteArticle,
    },
  ]);
}
