<template>

	<div class="flex flex-col justify-between items-center w-screen h-screen p-5">
		<div class=" flex flex-col gap-16 justify-center items-center">
			<h1 class="text-2xl">Bienvenue sur (RE)Sources Relationnelles</h1>
			<img src="/img/pictograms/undraw/authentication.svg" alt="" class="hidden w-96 md:block">
		</div>

		<div class="grid grid-cols-1 w-full lg:grid-cols-2 gap-5">
			<a href="/login" class="w-full">
				<div class="p-5 flex items-center justify-between border-b-4 border-violet-950 bg-neutral-100 w-full">
					<img src="/img/pictograms/leisure/culture.svg" alt="" class="h-16">
					<h3 class="text-xl text-center">
						Se connecter
					</h3>
				</div>
			</a>
			<a href="/register" class="w-full">
				<div class="p-5 flex items-center justify-between border-b-4 border-violet-950 bg-neutral-100 w-full">
					<img src="/img/pictograms/environment/human-cooperation.svg" alt="" class="h-16">
					<h3 class="text-xl text-center">
						S'inscrire
					</h3>
				</div>
			</a>
			<div class="p-5 flex items-center justify-between border-b-4 border-violet-950 bg-neutral-100 w-full">
				<img src="/img/pictograms/system/information.svg" alt="" class="h-16">
				<h3 class="text-xl text-center">À Propos</h3>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">

</script>
