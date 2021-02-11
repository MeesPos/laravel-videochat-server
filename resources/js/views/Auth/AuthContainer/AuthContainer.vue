<template>
   <div class="max-w-7xl mx-auto w-full h-full bg-white flex flex-col p-5 sm:px-6 lg:px-8">
      <header class="flex items-center">
         <img src="@/assets/logo.png" class="w-12">
         <p class="ml-3 font-semibold">Seconden</p>
      </header>
      <div class="flex flex-col flex-1">
         <slot/>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style>

</style>