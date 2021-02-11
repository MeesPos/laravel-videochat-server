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
			@click="showFriendsFace" 
			type="button" 
			class="text-white"
		> 
			Call
		</button>
   </div>
</template>

<script>
import firebase from "firebase";

export default {
   name: "Match",
   data() {
      return {
         database : firebase.database().ref(),
         yourId : Math.floor(Math.random()*1000000000),
         servers : {
            'iceServers': 
               [
                  // {
                  //    'urls': 'stun:stun.services.mozilla.com'
                  // }, 
                  {
                     'urls': 'stun:stun.l.google.com:19302'
                  },
                  {
                     'urls': 'stun:stun.l.google.com:19302'
                  },
               ]
            },
         pc : new RTCPeerConnection(this.servers)
      }
   },
   methods: {
      async sendMessage(senderId, data) {
         const msg = await this.database.push({ sender: senderId, message: data });
         msg.remove();
      },

      readMessage(data) {
         const msg = JSON.parse(data.val().message);
         const sender = data.val().sender;
         if (sender != this.yourId) {
             if (msg.ice != undefined) {
                 this.pc.addIceCandidate(new RTCIceCandidate(msg.ice));
             }
             else if (msg.sdp.type == "offer") {
                 this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                   .then(() => this.pc.createAnswer())
                   .then(answer => this.pc.setLocalDescription(answer))
                   .then(() => this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription})));
             }
             else if (msg.sdp.type == "answer") {
                 this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
             }
         }
      },

      showMyFace() {
         navigator.mediaDevices.getUserMedia({audio:true, video:true})
            .then(stream => this.$refs.localVideo.srcObject = stream)
            .then(stream => this.pc.addStream(stream));
      },

      showFriendsFace() {
         this.pc.createOffer()
            .then(offer => this.pc.setLocalDescription(offer) )
            .then(() => {
               this.sendMessage(this.yourId, JSON.stringify({'sdp': this.pc.localDescription}))
            })
  }
   },
   async mounted() {
      this.pc.onicecandidate = (event => event.candidate ? this.sendMessage(this.yourId, JSON.stringify({'ice': event.candidate})): console.log("Sent All Ice") );
      this.pc.onaddstream = (event => {
         this.$refs.remoteVideo.srcObject = event.stream
      });
      this.showMyFace();
      this.database.on('child_added', this.readMessage);
	},
};
</script>

<style scoped>
button {
  margin: 5px 0px 0px 10px !important;
}
</style>