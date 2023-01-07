import mixitup from "mixitup";

const containerEl = document.querySelector(".");
const mixer = mixitup(containerEl, {
   animation: {
      applyPerspective: false,
   },
   selectors: {
      control: '.servicies__button'
   },
   callbacks: {
      onMixStart: function(state, futureState) {
         console.log(state, futureState);
         // const button = originalEvent.target;
         // if (button.classList.contains("_tapped")) {
         //    console.log(this, mixer);
         //    button.classList.remove("_tapped");
         // } else {
         //    setTimeout(() => button.classList.add("_tapped"), 400);
         // }  
      }
   }
});