<!-- DONT AUTO FORMATTING / USE PRETTIER ON THIS PAGE -->

<template>
	<v-app>
		<v-main>
			<v-container fluid class="d-flex flex-column ga-5">

				<div><TheButton size="s" >Tambah Projek</TheButton></div>

				<div class="section">
					<TheButton size="m" type="primary">Simpan</TheButton>
					<TheButton size="m" type="primary" :disabled="false">Simpan</TheButton>

					<TheButton size="m" type="secondary">Batal</TheButton>

					<TheButton size="m" type="primary" disabled>Simpan</TheButton>
					<TheButton size="m" type="primary" :disabled="true">Simpan</TheButton>

					<TheButton size="m" type="primary">Invite to Projects</TheButton>
				</div>

				<div class="section">
					<TheButton size="l" type="primary">Accept</TheButton>
					<TheButton size="l" type="secondary">Batal</TheButton>
					<TheButton size="l" type="primary">Cari</TheButton>
				</div>

				<div class="section">
					<TheButton size="xl" type="primary">Selesai!</TheButton>
					<TheButton size="xl" type="success">Selesai!</TheButton>
				</div>


				<div><TheButton prefix-icon="mdi-pencil" size="text-icon-m">Edit</TheButton></div>

				<div><TheButton suffix-icon="mdi-open-in-new" size="text-icon-l">Detail Project</TheButton></div>

				<div class="section">
					<TheButton size="icon-m" type="primary-icon-2" icon="mdi-bookmark-outline" />
					<TheButton size="icon-m" type="primary-icon-2" icon="mdi-check" />
					<TheButton size="icon-m" type="primary-icon-2" icon="mdi-file-document-outline" />
				</div>

				<div class="section">
					<TheButton size="icon-m" type="secondary-icon" icon="mdi-close" />
					<TheButton size="icon-m" type="secondary-icon" icon="mdi-close" disabled />
					<TheButton size="icon-m" type="primary-red-icon" icon="mdi-delete-outline" />
				</div>

				<div class="section">
					<TheButton size="icon-l" type="primary-icon-1" icon="mdi-arrow-left" />
					<TheButton size="icon-xl" type="primary-icon-1" icon="mdi-close" />
				</div>


		</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import TheButton from "@/components/common/TheButton.vue";
</script>

<style scoped>

.section {
	display: flex;
	flex-direction: row;
	gap: 30px;
	align-items: center;
}

</style>
