import firebase from 'firebase'

export default {
   namespaced: true,
   state: {
      verificationId: null,
      user: null
   },
   getters: {
      verificationId: state => state.verificationId,
      user: state => state.user,
   },
   mutations: {
      setVerificationId(state, id){
         state.verificationId = id
      },
      setUser(state, user){
         state.user = user
      },
      setUserAge(state, age){
         state.user.age = age
      },
   },
   actions: {
      store: async ({commit, state})=>{
         await firebase.firestore()
            .collection('users')
            .doc(state.user.uid)
            .set({...state.user})
         commit('setUser', state.user)
      },
      verifyCode: async ({commit, state}, code)=>{
         try{
            const credential = firebase.auth.PhoneAuthProvider.credential(
               state.verificationId,
               code
            )
            const res = await firebase.auth().signInWithCredential(credential)
            const user = {
               uid: res.user.uid,
               phoneNumber: res.user.phoneNumber
            }
            commit('setUser', user)
         }catch(e){
            throw new Error(e.message)
         }
      },
      sendCode: async ({commit}, phonenumber)=>{
         try{
            const res = await firebase
               .auth()
               .signInWithPhoneNumber(`+316${phonenumber}`, window.recaptchaVerifier)
            commit('setVerificationId', res.verificationId)
         }catch(e){
            throw new Error(e.message)
         }
      }
   }  
}