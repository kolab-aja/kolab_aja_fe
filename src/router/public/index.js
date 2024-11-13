import RegisterPage from "@/views/public/RegisterPage.vue";
import NotFoundPage from "@/views/public/NotFoundPage.vue";
import AboutUsPage from "@/views/public/AboutUsPage.vue";
import LandingPage from "@/views/public/LandingPage.vue";
import LogoutPage from "@/views/public/LogoutPage.vue";
import LoginPage from "@/views/public/LoginPage.vue";

import BlockLogin from "@/middleware/BlockLogin";
import DirectLogout from "@/middleware/DirectLogout";
import ForgotPassPage from "@/views/public/ForgotPassPage.vue";
import ResetPasswordPage from "@/views/public/ResetPasswordPage.vue";

const publicRoute = [
	{
		path: "/",
		name: "landing",
		component: LandingPage,
	},
	{
		path: "/about-us",
		name: "aboutUs",
		component: AboutUsPage,
	},
	{
		path: "/login",
		name: "login",
		component: LoginPage,
		meta: {
			middleware: [{ funcName: BlockLogin }],
		},
	},
	{
		path: "/register",
		name: "register",
		component: RegisterPage,
		meta: {
			middleware: [{ funcName: BlockLogin }],
		},
	},
	{
		path: "/logout",
		name: "logout",
		component: LogoutPage,
		meta: {
			middleware: [{ funcName: DirectLogout }],
		},
	},
	{
		path: "/not-found",
		name: "notfound",
		component: NotFoundPage,
	},
	{
		path: "/forgot-password",
		name: "ForgotPassPage",
		component: ForgotPassPage,
	},
	{
		path: "/reset-password",
		name: "ResetPassword",
		component: ResetPasswordPage
	}
];

export default publicRoute;
