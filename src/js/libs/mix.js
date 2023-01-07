import mixitup from "mixitup";
import { _slideDown, _slideUp, _slideToggle } from "../files/functions.js";

const containerEl = document.querySelector(".servicies__cards");
const mixer = mixitup(containerEl, {
   animation: {
      applyPerspective: false
   }
});

const buttonMore = document.querySelector(".servicies__more");
const countOfAll = document.querySelectorAll(".servicies__card").length;
const cards = Array.from(document.querySelector(".servicies__cards").children);
let curItems = 3;
buttonMore.addEventListener("click", hideBlock);

function hideBlock() {
   curItems += 3;
   const visibleItems = cards.slice(0, curItems);
   visibleItems.forEach(item => {
      item.hasAttribute("hidden") ? _slideToggle(item) : null;
   });
   if (curItems >= countOfAll) {
      mixer.forceRefresh();
      mixer.filter("all");
      $(buttonMore).hide();
      buttonMore.removeEventListener("click", hideBlock)
   }
}