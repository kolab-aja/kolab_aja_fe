<template>
	<div class="pa-0" :style="containerStyle">
		<ckeditor :editor="editor" v-bind="$attrs" />
	</div>
</template>

<script setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { computed, defineProps } from "vue";

const editor = ClassicEditor;

const props = defineProps({
	maxWidth: {
		type: String,
		required: false,
	},
});

const containerStyle = computed(() => ({
	maxWidth: props.maxWidth ? `${props.maxWidth}px` : "none",
}));
</script>

<style>
.ck-editor .ck-editor__main .ck-content {
	min-height: 150px;
}

.ck-toolbar_grouping {
	background-color: #f7f4ff !important;
}
</style>
