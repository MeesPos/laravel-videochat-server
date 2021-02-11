<template>
   <div class="w-full h-full bg-main flex flex-col">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col justify-center items-center flex-1">
         <div class="flex flex-col text-white text-2xl font-semibold items-center">
            <img class="w-36" src="/assets/logo.png" alt="">
            <h1 class="mt-4">Seconden</h1>
         </div>

         <router-link 
            :to="{name: 'Telefoonnummer'}"
            class="w-full"
         >
            <app-button 
               width="w-full"
               class="mt-12"
            >
               Start
            </app-button>
         </router-link>
      </div>
   </div>
</template>

<script>
export default {
   name: "Home",
};
</script>