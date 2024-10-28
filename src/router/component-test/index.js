import commonComponentRoute from "@/router/component-test/common/index.js";

import componentTest from "@/component-test/App.vue"

const componentTestRoute = [
	{
		path: "/component-test",
		name: "component-test",
		children: [
			{
				path: "",
				name: "component-test-index",
				component: componentTest,
			},
			{
				path: "common",
				name: "component-test-common",
				children: [ ...commonComponentRoute ],
			},
			{
				path: "controller",
				name: "component-test-controller",
				children: [],
			},
			{
				path: "client",
				name: "component-test-client",
				children: [],
			},
			{
				path: "creative-hub-admin",
				name: "component-test-creative-hub-admin",
				children: [],
			},
			{
				path: "creative-hub-team",
				name: "component-test-creative-hub-team",
				children: [],
			},
		],
	},
];

export default componentTestRoute;
