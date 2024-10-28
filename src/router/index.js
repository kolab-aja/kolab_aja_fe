import { createRouter, createWebHistory } from "vue-router";

import publicRoute from "@/router/public/index.js";

import config from "@/plugins/config";
import clientRoute from "./client";
import controllerRoute from "./controller";
import creativeHubAdminRoute from "./creative-hub-admin";
import creativeHubTeamRoute from "./creative-hub-team";

import componentTestRoute from "./component-test";

const routes = [
    ...publicRoute,
    ...clientRoute,
    ...controllerRoute,
    ...creativeHubAdminRoute,
    ...creativeHubTeamRoute,

    ...componentTestRoute,
];

const router = createRouter({
    history: createWebHistory(config.base_url),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let middleware = to.meta.middleware;
    let nextIsCalled = false;

    if (middleware) {
        for (let i = 0; i < middleware.length; i++) {
            let currentMiddleware = middleware[i];
            console.log(`PATH : ${to.path} | MIDDLEWARE : ${currentMiddleware.funcName.name} | PARAM : ${currentMiddleware.param}`);
            nextIsCalled = await currentMiddleware.funcName(to, from, next, currentMiddleware.param);
            if ( nextIsCalled ) {
                break;
            }
        }
        if ( !nextIsCalled ) {
            next()
        }
    } else {
        next();
    }
});

export default router;
