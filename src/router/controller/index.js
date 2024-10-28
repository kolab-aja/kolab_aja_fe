import ForceFill from "@/middleware/ForceFill";
import WithRoles from "@/middleware/WithRoles";

import ProfilePageController from "@/views/controller/ProfilePage.vue";
import EditProfilePageController from "@/views/controller/EditProfilePage.vue";
import ProgressPageController from "@/views/controller/ProgressPage.vue";
import EditPaymentPage from "@/views/controller/EditPaymentPage.vue";
import PaymentPage from "@/views/controller/PaymentPage.vue";
import MilestonePage from "@/views/controller/MilestonePage.vue";
import AddMilestone from "@/views/controller/AddMilestonePage.vue";
import DetailMilestone from "@/views/controller/DetailMilestonePage.vue";
import DetailMilestonePage from "@/views/creative-hub-team/DetailMilestonePage.vue";
import CheckApplicantPage from "@/views/controller/CheckApplicantPage.vue";

const controllerRoute = [
	{
		path: "/controller",
		name: "controller",
		meta: {
			middleware: [
				{ funcName: WithRoles, param: ["controller"] },
				{ funcName: ForceFill },
			],
		},
		children: [
			{
				path: "profile",
				name: "controller-profile",
				component: ProfilePageController,
			},
			{
				path: "edit-profile",
				name: "controller-edit-profile",
				component: EditProfilePageController,
			},
			{
				path: "edit-payment",
				name: "controller-edit-payment",
				component: EditPaymentPage,
			},
			{
				path: "progress",
				name: "controller-progress",
				component: ProgressPageController,
			},
			{
				path: "payment",
				name: "controller-payment",
				component: PaymentPage,
			},
			{
				path: "milestone",
				name: "controller-milestone",
				component: MilestonePage,
			},
			{
				path: "add-milestone/:id",
				name: "controller-add-milestone",
				component: AddMilestone,
			},
			{
				path: "detail-milestone",
				name: "controller-detail-milestone",
				component: DetailMilestone,
			},
			{
				path: "detail-milestone/:id",
				name: "controller-detail-milestone-list",
				component: DetailMilestonePage,
			},
			{
				path: "check-applicant/:id",
				name: "check-applicant",
				component: CheckApplicantPage,
			},
		],
	},
];

export default controllerRoute;
