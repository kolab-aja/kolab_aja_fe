import Profile from "@/views/creative-hub-admin/ProfilePage.vue"
import EditProfile from "@/views/creative-hub-admin/EditProfilePage.vue"
import MyTeam from "@/views/creative-hub-admin/MyTeamPage.vue"
import WithRoles from "@/middleware/WithRoles";
import ForceFill from "@/middleware/ForceFill";

const creativeHubAdminRoute = [
	{
		path: "/creative-hub-admin",
		name: "creative-hub-admin",
		meta: {
			middleware: [
				{ funcName: WithRoles, param: ["creative-hub-admin"] },
				{ funcName: ForceFill }
			],
		},
		children: [
			{
				path: "profile",
				name: "admin-profile",
				component: Profile,
			},
			{
				path: "edit-profile",
				name: "admin-edit-profile",
				component: EditProfile,
			},
			{
				path: "my-team",
				name: "admin-my-team",
				component: MyTeam,
			}
		]
	}
]

export default creativeHubAdminRoute
