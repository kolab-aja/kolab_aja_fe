<template>
	<v-app>
		<v-container>
			<h1>Common component</h1>
			<ul>
				<li class="ml-5" v-for="item in commonComponent" :key="item">
					{{ item }} :
					<a target="_blank" :href="`/component-test${item}`">link</a>
				</li>
			</ul>
		</v-container>
	</v-app>
</template>

<script setup>
const commonComponent = [
	"/common/TheButton",
	"/common/TheInput",
	"/common/TheInputDropDown",
	"/common/TheVCol",
	"/common/TheVRow",
	"/common/TheSnackBar",
	"/common/TheInputNumber",
	"/common/TheRichTextBox"
];
</script>

<style scoped></style>
