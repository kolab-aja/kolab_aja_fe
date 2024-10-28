import ForceFill from "@/middleware/ForceFill"
import WithRoles from "@/middleware/WithRoles"

import EditProfile from "@/views/client/EditProfilePage.vue"
import Profile from "@/views/client/ProfilePage.vue"
import EditPayment from "@/views/client/EditPaymentPage.vue"
import Payment from "@/views/client/PaymentPage.vue"
import Progress from "@/views/client/ProgressPage.vue"
import AddProject from "@/views/client/AddProjectPage.vue";
import ControllerDetailPage from "@/views/client/ControllerDetailPage.vue";
// import CheckApplicant from "@/views/controller/CheckApplicantPage.vue";
import FindControllersPage from "@/views/client/FindControllersPage.vue"
import ProjectPreviewPage from "@/views/client/ProjectPreviewPage.vue"
import DetailMilestonePage from "@/views/creative-hub-team/DetailMilestonePage.vue";

const clientRoute = [
	{
		path: "/client",
		name: "client",
		meta: {
			middleware: [
				{funcName: WithRoles, param: ["client"]},
				{funcName: ForceFill}
			],
		},
		children: [
			{
				path: "edit-profile",
				name: "client-edit-profile",
				component: EditProfile,
			},
			{
				path: "profile",
				name: "client-private-profile",
				component: Profile,
			},
			{
				path: "edit-payment",
				name: "client-edit-payment",
				component: EditPayment,
			},
			{
				path: "payment",
				name: "client-payment",
				component: Payment,
			},
			{
				path: "progress",
				name: "client-progress",
				component: Progress,
			},
			{
				path: "add-project",
				name: "add-project",
				component: AddProject,
			},
			{
				path: "controller-detail/:id",
				name: "client-controller-detail",
				component: ControllerDetailPage,
			},
			// {
			// 	path: "check-applicant",
			// 	name: "client-check-applicant",
			// 	component: CheckApplicant,
			// },
			{
				path: "detail-milestone/:id",
				name: "client-detail-milestone",
				component: DetailMilestonePage,
			},
			{
				path: "find-controllers/:id",
				name: "client-find-controllers",
				component: FindControllersPage,
			},
			{
				path: "project-preview",
				name: "client-project-preview",
				component: ProjectPreviewPage,
			},
		]
	},
]

export default clientRoute
