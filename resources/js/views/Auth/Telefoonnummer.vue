<template>
   <auth-container>
      <h1 class="text-black font-semibold text-2xl mt-10 mb-2">
         Wat is jouw telefoonnummer?
      </h1>
      <p class="text-gray-400 text-sm">
         Je e-mail wordt verborgen gehouden totdat ..
      </p>
      <div class="mt-20 flex-1">
         <div class="flex p-3 border border-gray-300 rounded-full items-center">
            <p class="text-black font-semibold mr-2">+ 31 6</p>
            <input
               type="text"
               class="flex-1 focus:outline-none"
               placeholder="00 00 00 000"
               v-model="phonenumber"
            />
         </div>
         <p class="mt-2 text-xs text-red-600 pl-2">{{error}}</p>
         <div class="relative flex items-start mt-10">
            <div class="flex items-center h-5">
               <input
                  id="voorwaarden"
                  name="voorwaarden"
                  type="checkbox"
                  v-model="consent"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
               />
            </div>
            <div class="ml-3 text-sm">
               <label for="voorwaarden" class="text-gray-500">
                  Ik ga akkoord met de
                  <span class="underline">voorwaarden</span>
               </label>
            </div>
         </div>
         <div class="relative flex items-start mt-5">
            <div class="flex items-center h-5">
               <input
                  id="age_check"
                  name="age_check"
                  type="checkbox"
                  v-model="above_18"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
               />
            </div>
            <div class="ml-3 text-sm">
               <label for="age_check" class="text-gray-500">
                  Ik ben 18 jaar en ouder
               </label>
            </div>
         </div>
         <div class="mt-10 mx-auto" id="recaptcha-container"></div>
      </div>
      <div class="flex flex-col items-center">
         <app-button 
            @click.native="sendVerificationCode"
            id="sign-in-button"
         >
            Stuur verificatie code
         </app-button>
         <p class="mt-4 font-semibold text-gray-400">1/3</p>
      </div>
   </auth-container>
</template>

<script>
import AuthContainer from "./AuthContainer/AuthContainer.vue"
import firebase from 'firebase'

export default {
   components: { AuthContainer },
   name: "Home",
   data(){
      return {
         phonenumber: '',
         error: '',
         above_18: false,
         consent: false,
      }
   },
   methods:{
      async sendVerificationCode(){
         if(this.consent && this.above_18){
            try{
               await this.$store.dispatch('user/sendCode', this.phonenumber)
               this.$router.push({
                  name: 'Code'
               })
            }catch(e){
               console.log(e)
               this.error = 'Telefoonnummer niet geldig'
            }
         }else{
            alert('Error')
         }
      }
   },
   mounted() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
         "sign-in-button",
         {size:'invisible'}
      )
   },
};
</script>