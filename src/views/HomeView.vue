<template>

	<div class="flex flex-col justify-between items-center w-screen h-screen p-5">
		<div class=" flex flex-col gap-16 justify-center items-center">
			<h1 class="text-2xl">(RE)Sources Relationnelles</h1>
		</div>

		<div class="flex flex-col w-full gap-5">

      <TileComponent url="/login" name="Se connecter" icon="/img/pictograms/leisure/culture.svg"/>
      <TileComponent url="/register" name="S'inscrire" icon="/img/pictograms/environment/human-cooperation.svg"/>

		</div>
	</div>

</template>

<script setup>

import TileComponent from "@/components/Home/TileComponent.vue";

</script>
