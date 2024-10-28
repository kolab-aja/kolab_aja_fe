<template>
	<v-col class="d-flex flex-column pa-0" v-bind="colAttrs">
		<label class="mb-2">{{ customLabel }}</label>
		<v-select v-bind="dropDownAttrs" density="compact" rounded="lg" variant="outlined" color="lightPrimary"
			v-model="dropDownModelValue" :items="props.options"></v-select>
	</v-col>
</template>

<script setup>
import { ref, watch, useAttrs, computed, onMounted } from "vue";
import isEqualObject from "@/lib/isEqualObject";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
	customLabel: {
		type: String,
		required: false,
	},
	result: {
		type: [Number, String, Array, null],
		required: false,
	},
	options: {
		type: Array,
		required: true,
	},
});

const dropDownModelValue = ref();

const emit = defineEmits(["update:result"]);

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


// FORMATTING AND EMIT RESULTS

const isObjectFormat = props.options && props.options.length > 0 && typeof props.options[0] === "object";

const colAttrs = computed(() => filterAttrs(attrs, breakpointList));
const dropDownAttrs = computed(() => {

	// SET THE DEFAULT VALUE IF props.value IS PASSED

	// OPTION = [ 10, 20, 30 ] | RESULT = 10
	if (!isObjectFormat && !Array.isArray(props.result)) {
		dropDownModelValue.value = props.result
	}
	// OPTION = [ 10, 20, 30 ] | RESULT = [ 10, 20 ]
	else if (!isObjectFormat && Array.isArray(props.result)) {
		dropDownModelValue.value = props.result
	}
	// OPTION = [ { title : "test1", value: 1 }, ... ] | RESULT = 1
	else if (isObjectFormat && !Array.isArray(props.result)) {
		dropDownModelValue.value = props.options.find(option => option.value == props.result)
	}
	// OPTION = [ { title : "test1", value: 1 }, ... ] | RESULT = [1,2,3]
	else if (isObjectFormat && Array.isArray(props.result)) {
		dropDownModelValue.value = props.options.filter(option => props.result.includes(option.value))
	}

	const result = { ...attrs };
	breakpointList.forEach((key) => delete result[key]);
	if (isObjectFormat) {
		result["item-title"] = "title";
		result["item-value"] = "value";
		result["return-object"] = true;
	}
	return result;
});

watch(dropDownModelValue, (newValue, oldValue) => {
	let formatedValue = newValue
	// WATCHER THINK OLD VALUE { A : 1 } AND NEW VALUE { A : 1 } IS THE SAME
	if (isObjectFormat && Array.isArray(newValue)) {
		// console.log("IS ARRAY : ", Array.isArray(newValue), " | IS OBJECT FORMAT : ", isObjectFormat, " | INNER V-MODEL VALUE : ", dropDownModelValue.value, " | FORMATED VALUE : ", formatedValue)
		if (!isEqualObject(newValue, oldValue)) {
			formatedValue = newValue.map(item => item.value);
			emit("update:result", formatedValue);
		}
	} else if (isObjectFormat && !Array.isArray(newValue)) {
		// console.log("IS ARRAY : ", Array.isArray(newValue), " | IS OBJECT FORMAT : ", isObjectFormat, " | INNER V-MODEL VALUE : ", dropDownModelValue.value, " | FORMATED VALUE : ", formatedValue)
		formatedValue = newValue.value
		emit("update:result", formatedValue);
	} else {
		// console.log("IS ARRAY : ", Array.isArray(newValue), " | IS OBJECT FORMAT : ", isObjectFormat, " | INNER V-MODEL VALUE : ", dropDownModelValue.value, " | FORMATED VALUE : ", formatedValue)
		emit("update:result", formatedValue);
	}
});

</script>

<style scoped></style>