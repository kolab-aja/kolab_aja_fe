<template>
	<v-app>
		<v-container class="d-flex flex-column ga-5">
			<div>
				<label for="message">Message</label>
				<v-text-field id="message" v-model="message" type="text" />
			</div>

			<div>
				<label for="timeout">Timeout in mili second</label>
				<v-text-field id="timeout" v-model="timeout" type="number" />
			</div>

			<div><v-btn @click="handleSummonSnackbar" type="button">Summon Timeout Snackbar</v-btn></div>
		</v-container>
	</v-app>
</template>

<script setup>
import { ref } from "vue";
import { useSnackbarStore } from "@/store/snackbar";

const message = ref("");
const timeout = ref(5000);

const snackbarStore = useSnackbarStore();

const handleSummonSnackbar = () => {
	snackbarStore.showSnackbar({
		message: message.value,
		timeout: timeout.value,
	});
};

</script>

<style lang="scss" scoped></style>
