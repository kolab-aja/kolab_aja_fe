<template>
	<v-app>
		<v-main>
			<v-container fluid>
				<TheVCol class="d-flex flex-column ga-15">
					<div>
						<TheInputDropDown
							lg="6"
							:result="selectedPotongan1"
							@update:result="selectedPotongan1 = $event"
							:options="optionPotongan1"
							custom-label="Potongan - Custom Options : "
						/>
						<p>Potongan - Custom Options : {{ selectedPotongan1 }}</p>
					</div>

					<v-divider />

					<div>
						<TheInputDropDown
							lg="6"
							:result="selectedPotongan2"
							@update:result="selectedPotongan2 = $event"
							:options="optionPotongan2"
							custom-label="Potongan - Vuetify Options : "
						/>
						<p>Potongan - Vuetify Options : {{ selectedPotongan2 }}</p>
					</div>

					<v-divider />

					<div>
						<TheInputDropDown
							lg="6"
							:result="selectedChipHobi1"
							@update:result="selectedChipHobi1 = $event"
							:options="option1Hobi"
							custom-label="Hobi - Custom Options : "
							multiple
						/>
						<p>Hobi - Custom Options : {{ selectedChipHobi1 }}</p>
					</div>

					<v-divider />

					<div>
						<TheInputDropDown
							lg="6"
							:result="selectedChipHobi2"
							@update:result="selectedChipHobi2 = $event"
							:options="option2Hobi"
							custom-label="Hobi - Vuetify Options : "
							multiple
						/>
						<p>Hobi - Vuetify Options : {{ selectedChipHobi2 }}</p>
					</div>

				</TheVCol>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import TheInputDropDown from "@/components/common/TheInputDropDown.vue";
import TheVCol from "@/components/common/TheVCol.vue";
import { ref } from "vue";

const optionPotongan1 = [
	{ title: "10%", value: 10 },
	{ title: "20%", value: 20 },
	{ title: "30%", value: 30 },
];

const optionPotongan2 = ["10%", "20%", "30%"];

const option1Hobi = [
	{ title: "Menulis", value: 1 },
	{ title: "Membaca", value: 2 },
	{ title: "Menggambar", value: 3 },
	{ title: "Memasak", value: 4 },
	{ title: "Coding", value: 5 },
];

const option2Hobi = ["Menulis", "Membaca", "Menggambar", "Memasak", "Coding"];

const selectedPotongan1 = ref(10);

const selectedPotongan2 = ref("10%");

const selectedChipHobi1 = ref([1,3,5]);

const selectedChipHobi2 = ref(["Menulis", "Coding"]);
</script>

<style scoped></style>
