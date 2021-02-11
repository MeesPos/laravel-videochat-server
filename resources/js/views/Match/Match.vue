<template>
   <div class="w-full h-full bg-main flex flex-col">
		<div class="max-w-7xl mx-auto p-4 sm:p:6 lg:p-8 flex flex-col flex-1">
			<div class="flex-1 flex flex-col relative">
				<div class="absolute top-0 right-0 m-2 h-40 w-20">
					<video class="w-full h-full rounded bg-white" autoplay muted ref="localVideo"></video>
				</div>
				<video class="bg-gray-200 flex-1 rounded" autoplay playsinline ref="remoteVideo"></video>
			</div>
		</div>
      <button 
			type="button" 
			class="text-white"
         @click="startVideoChat"
		> 
			Call
		</button>
   </div>
</template>

<script>
import firebase from "firebase";
import Pusher from 'pusher-js';
import Peer from 'simple-peer';

export default {
   name: "Match",
   props: ['pusherKey', 'pusherCluster'],
   data() {
      return {
         database : firebase.database().ref(),
         userId : firebase.auth().currentUser.uid,
         channel: null,
         stream: null,
         peers: {},
         users: []
      }
   },
   methods: {
      startVideoChat() {
         this.getPeer(this.users[0].uid, true);
      },
      getPeer(userId, initiator) {
         if(this.peers[userId] === undefined) {
           let peer = new Peer({
             initiator,
             stream: this.stream,
             trickle: false
           });
           peer.on('signal', (data) => {
             this.channel.trigger(`client-signal-${userId}`, {
               userId: this.userId,
               data: data
             });
           })
           .on('stream', (stream) => {
             const videoThere = this.$refs['remoteVideo'];
             videoThere.srcObject = stream;
           })
           .on('close', () => {
             const peer = this.peers[userId];
             if(peer !== undefined) {
               peer.destroy();
             }
             delete this.peers[userId];
           });
           this.peers[userId] = peer;
         } 
         return this.peers[userId];
      },
      async setupVideoChat() {
         // To show pusher errors
         // Pusher.logToConsole = true;
         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
         const videoHere = this.$refs['localVideo'];
         videoHere.srcObject = stream;
         this.stream = stream;
         const pusher = this.getPusherInstance();
         this.channel = pusher.subscribe('presence-video-chat');
         this.channel.bind(`client-signal-${this.userId}`, (signal) => 
         {
           const peer = this.getPeer(signal.userId, false);
           peer.signal(signal.data);
         });
      },
      getPusherInstance() {
         return new Pusher(this.pusherKey, {
           authEndpoint: '/auth/video_chat',
           cluster: this.pusherCluster,
           auth: {
             headers: {
               'X-CSRF-Token': document.head.querySelector('meta[name="csrf-token"]').content
             }
           }
         });
      }
   },
   mounted() {
      firebase.firestore().collection('users').onSnapshot(async snapshot => {
         this.users = snapshot.docs
            .map(doc =>doc.data())
            .filter(x=>x.uid !== firebase.auth().currentUser.uid)
         await this.setupVideoChat();
         // this.startVideoChat();
      });
   }
};
</script>

<style scoped>
button {
  margin: 5px 0px 0px 10px !important;
}
</style>