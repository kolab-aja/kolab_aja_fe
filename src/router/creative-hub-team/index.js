import WithRoles from "@/middleware/WithRoles";
import ForceFill from "@/middleware/ForceFill";

import EditProfilePage from "@/views/creative-hub-team/EditProfilePage.vue";
import BillingInformationPageTeam from "@/views/creative-hub-team/BillingInformationPage.vue";
import AccountPage from "@/views/creative-hub-team/AccountPage.vue";
import EditAccountPage from "@/views/creative-hub-team/EditAccountPage.vue";
import PaymentPage from "@/views/creative-hub-team/PaymentPage.vue";
import EditPaymentPage from "@/views/creative-hub-team/EditPaymentPage.vue";
import ProgressPage from "@/views/creative-hub-team/ProgressPage.vue";
import FindProjectPage from "@/views/creative-hub-team/FindProjectPage.vue";
import EditMyTeamPage from "@/views/creative-hub-team/EditMyTeamPage.vue";
import MyTeamPage from "@/views/creative-hub-team/MyTeamPage.vue";
import DetailMilestonePage from "@/views/creative-hub-team/DetailMilestonePage.vue";
import CollaboratorListPage from "@/views/creative-hub-team/CollaboratorListPage.vue";
import FindProjectDetailPage from "@/views/creative-hub-team/FindProjectDetailPage.vue";

const creativeHubTeamRoute = [
    {
        path: "/creative-hub-team",
        name: "creative-hub-team",
		meta: {
			middleware: [
				{ funcName: WithRoles, param: ["creative-hub-team"] },
				{ funcName: ForceFill },
			],
		},
        children: [
            {
                path: "profile",
                name: "team-my-team",
                component: MyTeamPage,
            },
			{
				path: "account",
				name: "team-account",
				component: AccountPage,
			},
			{
				path: "edit-account",
				name: "team-edit-account",
				component: EditAccountPage,
			},
			{
				path: "payment",
				name: "team-payment",
				component: PaymentPage,
			},
			{
				path: "edit-payment",
				name: "team-edit-payment",
				component: EditPaymentPage,
			},
            {
                path: "billing-information",
                name: "billing-information-team",
                component: BillingInformationPageTeam,
            },
			{
				path: "progress",
				name: "team-progress",
				component: ProgressPage,
			},
			{
				path: "detail-milestone/:id",
				name: "team-detail-milestone",
				component: DetailMilestonePage,
			},
			{
				path: "find-project",
				name: "team-find-project",
				component: FindProjectPage,
			},
			{
				path: "find-project-detail/:id",
				name: "team-find-project-detail",
				component: FindProjectDetailPage,
			},
			{
				path: "edit-profile",
				name: "team-edit-my-team",
				component: EditMyTeamPage,
			},
			{
				path: "collaborator-list",
				name: "team-collaborator-list",
				component: CollaboratorListPage,
			}
        ]
    }
]

export default creativeHubTeamRoute
