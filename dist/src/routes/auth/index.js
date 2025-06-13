import { loginHandler, registerHandler } from './handler';
export default function registerAuthRoutes(server) {
    server.route([
        { method: 'POST', path: '/auth/register', handler: registerHandler },
        { method: 'POST', path: '/auth/login', handler: loginHandler },
    ]);
}
