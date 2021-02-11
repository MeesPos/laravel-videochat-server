<template>
   <auth-container>
      <h1 class="text-black font-semibold text-2xl mt-10 mb-2">
         Heb je een code binnen?
      </h1>
      <p class="text-gray-400 text-sm">
         Zo weten wij zeker dat jij het bent
      </p>
      <div class="mt-20 flex-1">
         <div class="flex justify-around m-auto">
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
            <input 
               type="number" 
               max="9"
               min="0"
               value="0"
               class="bg-gray-100 text-gray-300 h-24 rounded-md border-2 border-gray-300 text-4xl text-center w-12 focus:outline-none"
            >
         </div>
         <p class="mt-2 text-xs text-red-600 pl-2">{{error}}</p>
      </div>
      <div class="flex flex-col items-center">
         <app-button @click.native="sendVerificationCode">Stuur verificatie code</app-button>
         <p class="mt-4 font-semibold text-gray-400">2/3</p>
      </div>
   </auth-container>
</template>

<script>
import AuthContainer from "./AuthContainer/AuthContainer.vue"

export default {
   components: { AuthContainer },
   name: "Code",
   data(){
      return{
         error: ''
      }
   },
   methods:{
      async sendVerificationCode(){
         const code = Array
            .from(this.$el.querySelectorAll('input'))
            .map(x=>Number(x.value))
            .join('')
         try{
            await this.$store.dispatch('user/verifyCode', code)
            this.$router.push({
               name: 'Age'
            })
         }catch(e){
            if(e.message.includes('credential failed')){
               alert('Code is verlopen!')
               this.$router.replace({name: 'Telefoonnummer'})
            }
            this.error = 'Code is invalid'
         }
      }
   }
};
</script>