import TheButtonPage from "@/component-test/common/TheButton.vue";
import TheInputPage from "@/component-test/common/TheInput.vue";
import TheVColPage from "@/component-test/common/TheVCol.vue";
import TheVRowPage from "@/component-test/common/TheVRow.vue";
import TheInputDropDownPage from "@/component-test/common/TheInputDropDown.vue"
import TheSnackBarPage from "@/component-test/common/TheSnackBar.vue"
import TheInputNumberPage from "@/component-test/common/TheInputNumber.vue"
import TheRichTextBoxPage from "@/component-test/common/TheRichTextBox.vue";

const commonComponentRoute = [
	{
        path: "TheButton",
        name: "TheButton",
        component: TheButtonPage
    },
    {
        path: "TheInput",
        name: "TheInput",
        component: TheInputPage
    },
    {
        path: "TheVCol",
        name: "TheVCol",
        component: TheVColPage
    },
    {
        path: "TheVRow",
        name: "TheVRow",
        component: TheVRowPage
    },
    {
        path: "TheInputDropDown",
        name: "TheInputDropDown",
        component: TheInputDropDownPage
    },
    {
        path: "TheSnackBar",
        name: "TheSnackBar",
        component: TheSnackBarPage
    },
    {
        path: "TheInputNumber",
        name: "TheInputNumber",
        component: TheInputNumberPage
    },
    {
        path: "TheRichTextBox",
        name: "TheRichTextBox",
        component: TheRichTextBoxPage
    }
];

export default commonComponentRoute;
