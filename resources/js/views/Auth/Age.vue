<template>
   <auth-container>
      <h1 class="text-black font-semibold text-2xl mt-10 mb-2">
         Hoe oud ben je?
      </h1>
      <p class="text-gray-400 text-sm">Hiermee kunnen wij bepalen ...</p>
      <div class="mt-20 flex-1">
         <input
            type="date"
            v-model="birthday"
            class="border-2 w-full text-gray-400 border-yellow-400 p-3 rounded-full"
         />
         <p class="mt-2 text-xs text-red-600 pl-2">{{error}}</p>
      </div>
      <div class="flex flex-col items-center">
         <app-button @click.native="ageCheck">Volgende</app-button>
         <p class="mt-4 font-semibold text-gray-400">3/3</p>
      </div>
   </auth-container>
</template>

<script>
import AuthContainer from "./AuthContainer/AuthContainer.vue";
import getAge from 'get-age'

export default {
   components: { AuthContainer },
   name: "Location",
   data(){
      return{
         birthday: '',
         error:''
      }
   },
   methods:{
      async ageCheck(){
         const age = Number(getAge(this.birthday))
         if(age > 18){
            await this.$store.commit('user/setUserAge', age)
            await this.$store.dispatch('user/store')
            this.$router.push({name:'Match'})
         }else{
            this.error = 'Je moet ouder dan 18 jaar zijn'
         }
      }
   }
};
</script>