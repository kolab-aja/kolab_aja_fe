<template>
	<v-col
		class="d-flex flex-column pa-0"
		style="height: min-content"
		v-bind="colAttrs"
	>
		<label class="mb-2">{{ props.customLabel }}</label>
		<v-text-field
			density="compact"
			variant="outlined"
			color="lightPrimary"
			v-bind="textFieldAttrs"
			rounded="lg"
		>
			<slot></slot>
		</v-text-field>
	</v-col>
</template>

<script setup>
import { useAttrs, computed } from "vue";

defineOptions({
  	inheritAttrs: false
})

// BREAKPOINT ("xs", "sm", "md", "lg", "xl", "xxl") WILL GO TO V-COL , OTHERS WILL GO TO V-TEXT-FIELD
function filterAttrs(attrs, keys) {
	const result = {};
	keys.forEach((key) => {
		if (attrs[key] !== undefined) {
			result[key] = attrs[key];
		}
	});
	return result;
}

const attrs = useAttrs();
const breakpointList = ["xs", "sm", "md", "lg", "xl", "xxl"];

const colAttrs = computed(() => filterAttrs(attrs, breakpointList));
const textFieldAttrs = computed(() => {
	const result = { ...attrs };
	breakpointList.forEach((key) => delete result[key]);
	return result;
});

const props = defineProps({
	customLabel: {
		type: String,
		required: false,
	},
});
</script>

<style scoped>
* {
	font-family: "Outfit", sans-serif;
}

.text-style {
	font-size: 16px !important;
}
</style>
