export const pageRouter = {
    name: "edit",
    path: "/edit",
    meta: {
        title: "主页"
    },
    // redirect: "/home/subject",
    component: () => import("@/views/edit")
    // children: [
    //     {
    //         name: "subject",
    //         path: "subject",
    //         meta: {
    //             title: "页面模版",
    //             icon: "ios-paper-outline"
    //         },
    //         component: () => import("@/views/home/subject")
    //     }
    // ]
};

export const routes: Array<any> = [
    pageRouter,
    {
        path: "/",
        redirect: "/edit"
    },
    {
        name: "500",
        path: "/500",
        component: () => import("@/views/errors/500")
    },
    {
        name: "403",
        path: "/403",
        component: () => import("@/views/errors/403")
    },
    {
        name: "404",
        path: "/*",
        component: () => import("@/views/errors/404")
    }
];
