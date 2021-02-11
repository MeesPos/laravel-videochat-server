<template>
   <button
      :class="`${
         width ? width : ''
      } text-white font-semibold py-1 px-4 rounded-full relative focus:outline-none`"
      :style="{
         background: 'linear-gradient(to left, #F49C25, #C10DD4)',
      }"
   >
      <slot />
   </button>
</template>

<script>
export default {
   name: "Button",
   props: {
      width: {
         type: String,
      },
   },
};
</script>

<style scoped>
button::after {
   content: "";
   position: absolute;
   z-index: -1;
   bottom: -5px;
   left: 0;
   height: 110%;
   width: 100%;
   opacity: 0.8;
   border-radius: 50px;

   /* Declaring our shadow color inherit from the parent (button) */
   background: inherit;

   /* Blurring the element for shadow effect */
   -webkit-filter: blur(4px);
   -moz-filter: blur(4px);
   -o-filter: blur(4px);
   -ms-filter: blur(4px);
   filter: blur(4px);

   /* Transition for the magic */
   -webkit-transition: all 0.2s;
   transition: all 0.2s;
}
</style>