<template>
	<v-btn variant="flat" class="text-body-1 content" :class="`content-${props.size} ${props.type} ${disabledStyle}`" v-bind="$attrs" :density="density" :type="buttonType" >
            <v-icon :icon="prefixIcon" v-if="prefixIcon" size="20" class="mr-2" />
            <v-icon v-if="$attrs.icon" :icon="$attrs.icon" :color="iconColor" :size="iconSize" /> <!-- FOR ICON ONLY BUTTON -->
            <slot></slot>
            <v-icon :icon="suffixIcon" v-if="suffixIcon" size="20" class="ml-2" />
    </v-btn>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps({
    buttonType: {
        type: String,
        required: false,
        default: "button",
        validator(value, props) {
            return ["button", "submit"].includes(value)
        }
    },
	size: {
		type: String,
		default: "m",
		required: false,
        validator(value, props) {
            return ["s", "m", "l", "xl", "text-icon-m", "text-icon-l", "icon-m", "icon-l", "icon-xl"].includes(value)
        }
	},
    type: {
        type: String,
        default: "primary",
        required: false,
        validator(value, props) {
            return ["primary", "secondary", "success", "primary-icon-1", "primary-icon-2", "secondary-icon", "primary-red-icon"].includes(value)
        }
    },
    prefixIcon: {
        type: String,
        required: false,
    },
    suffixIcon: {
        type: String,
        required: false,
    },
});

const attrs = useAttrs()

{/* <TheButton /> -> density = default | <TheButton icon /> -> density = compact | <TheButton icon="abc" /> -> density = compact  */}
const density = computed(() => {
    return attrs.icon === undefined ? "default" : "compact"
})

const iconSize = computed(() => {
    if ( props.size == "icon-m" ) return 24
    else if ( props.size == "icon-l" ) return 28
    else if (props.size == "icon-xl" ) return 33
    else return 24
})

const iconColor = computed(() => {
    if ( props.type == "primary-icon-1" || props.type == "primary-icon-2" || props.type ==  "secondary-icon" || attrs.disabled !== undefined ) return "darkPurple"
    else if ( props.type == "primary-red-icon" ) return "white"
    else return "darkPurple"
})

const disabledStyle = computed(() => {
    if ( attrs.disabled !== undefined && attrs.disabled !== false ) {
        if ( props.type == "primary" || props.type == "secondary" ) {
            return "disabled-primary";
        } else if ( props.type == "primary-icon-1" || props.type == "primary-icon-2" || props.type == "secondary-icon" || props.type == "primary-red-icon" ) {
            return "disabled-icon"
        }
    }
    return ""
})

</script>

<style scoped>

.content {
	font-family: "Outfit", sans-serif;
    border-radius: 500px;
}





/* content-<size>, content-text-icon-<size>, content-icon-<size> UNTUK MENGATUR SIZE */

/* BUTTON ON NAVBAR */
.content-s {
    font-size: 11px !important;
    padding-left: 18px !important;
    padding-right: 18px !important;
    font-weight: bold;
}

/* SUBMIT AND CANCEL BUTTON  */
.content-m {
    font-size: 11px !important;
    padding: 12px 18px !important;
    font-weight: normal;
    height: fit-content !important;
}

/* CARI DI REKOMENDASI CONTROLLERS DAN REKOMENDASI TEAM | BUTTON BATAL DAN ACCEPT */
.content-l {
    font-size: 16px !important;
    padding: 12px 49px !important;
    font-weight: normal;
    height: fit-content !important;
}

/* BUTTON SUCCESS SUPER BESAR DI POP UP DIALOG */
.content-xl {
    font-size: 25px !important;
    padding: 12px 50px !important;
    font-weight: bold;
    height: fit-content !important;
}



/* TEXT + ICON || ICON + TEXT */
/* THE ICON NOT CUSTOMIZED , ONLY PRIMARY THEME ( BACKGROUND-COLOR PRIMARY && ICON-COLOR WHITE ) */

.content-text-icon-m {
    padding: 10px 22px !important;
    background-color: #46377D !important;
    color: white !important;
    height: fit-content !important;
    font-size: 13px !important;
}

.content-text-icon-l {
    padding: 15px 22px !important;
    background-color: #46377D !important;
    color: white !important;
    height: fit-content !important;
    font-size: 16px !important;
}



/* ICON ONLY */
.content-icon-m {
    padding: 3px !important;
    box-sizing: content-box !important;
}

.content-icon-l {
    padding: 6px !important;
    box-sizing: content-box !important;
}

.content-icon-xl {
    padding: 10px !important;
    box-sizing: content-box !important;
    width: fit-content !important;
    height: fit-content !important;
}





/* primary, secondary, success, disabled, primary-icon, ... UNTUK MENGATUR COLOR THEME */
/* disabled, disabled-primary, disabled-secondary, ... TIDAK PERLU DIREGISTER PADA props.type KARENA AKAN DIPASANG DI COMPUTED disabledStyle */

.primary {
    background-color: #46377D !important;
    border: 1px solid #46377D;
    color: white !important;
}

.secondary {
    background-color: white !important;
    border: 1px solid #221943;
    color: #221943;
    box-sizing: border-box;
}

.success {
    background-color: white !important;
    border: 4px solid #016158;
    color: #016158;
    box-sizing: border-box;
}

.disabled-primary {
    background-color: #B8B8B8 !important;
    border: 1px solid #B8B8B8 !important;
    color: white !important;
}

/* SUCCESS DOESN'T NEED DISABLED STYLING FOR NOW */



.primary-icon-1 {
    border: 1px solid #8A76D4 !important;
    background-color: #F7F4FF !important;
}

.primary-icon-2 {
    border: 1px solid #DEE4F0 !important;
    background-color: #F7F4FF !important;
}

.primary-red-icon {
    background-color: #CF455E !important;
    border: 1px solid #CF455E !important;
}

.secondary-icon {
    border: 1px solid #DEE4F0 !important;
    background-color: white !important;
}

.disabled-icon {
    border: 1px solid #B8B8B8 !important;
    background-color: #B8B8B8 !important;
}

/* SECONDARY ICON DOESN'T NEED DISABLED STYLING FOR NOW */


</style>
