import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
// import { profileRoutes } from '../modules/profile/profile.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/user',
        route: userRoutes
    },
    // {
    //     path: '/user',
    //     route: profileRoutes
    // },
    // {
    //     path: '/meta',
    //     route: 'metaRoutes'
    // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;