<template>
   <auth-container>
      <h1 class="text-black font-semibold text-2xl mt-10 mb-2">
         Klaar!
      </h1>
      <p class="text-gray-400 text-sm">
         Het feest kan beginnen
      </p>
      <div class="mt-20 flex-1">
         
      </div>
      <div class="flex flex-col items-center">
         <router-link 
            :to="{name: 'Match'}"
         >
            <app-button>Vind jouw ....</app-button>
         </router-link>
      </div>
   </auth-container>
</template>

<script>
import AuthContainer from "./AuthContainer/AuthContainer.vue";

export default {
   components: { AuthContainer },
   name: "Code",
};
</script>