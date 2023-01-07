// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

import { getDigFormat, getDigFromString, _slideDown, _slideUp, _slideToggle, removeClasses } from "./functions.js";

function setPrice(target, value, delay) {
   delay = delay ? delay : 200;
   target.fadeOut(delay);
   setTimeout(() => {target.text(value);}, delay)
   target.fadeIn(delay);
}

function changePrice(el, tariff, device, type) {
   const tarifResult = $(el).find(".service__result-price").find("[data-tariff]");
   const deviceResult = $(el).find(".service__result-price").find("[data-device]");
   const tariffValue = getDigFromString(tarifResult.text());
   const resultValue = getDigFromString(deviceResult.text());
   if (type == "true") {
      tariff ? setPrice(tarifResult, tariffValue + tariff, 200) : null;
      device ? setPrice(deviceResult, resultValue + device, 200) : null;
      
   } else {
      tariff ? setPrice(tarifResult, tariffValue - tariff, 200) : null;
      device ? setPrice(deviceResult, resultValue - device, 200) : null;
   }
}

let previousValue;

function deviceSelect(el, value) {
   const price = $(el).find(".service__result-price").find("[data-device]");
   const actualPrice = getDigFromString($(price).text());
   setPrice(price, getDigFormat(actualPrice - previousValue + value));
   console.log(actualPrice, previousValue, value);
}

$('select.device__select').selectric();

$('select.device__select').on('selectric-before-change', function(event, element, selectric) {
   const isStatic = element.value.includes("static");
   previousValue = isStatic ? 0 : getDigFromString(element.value);
})

$('select.device__select').on('selectric-change', function(event, element, selectric) {
   const value = parseInt(element.value);
   const isStatic = element.value.includes("static");
   const priceStrong = $(element.closest(".device")).find(".device__price").find("strong");
   const priceSpan = $(element.closest(".device")).find(".device__price").find("span");
   setPrice(priceStrong, getDigFormat(value), 200);
   if (!isStatic && element.closest(".service__content")) {
      deviceSelect($(element.closest(".service__content")), value);
   } else if (isStatic && element.closest(".service__content")) {
      deviceSelect($(element.closest(".service__content")), 0);
   }
   if (isStatic) {
      setPrice(priceSpan, "руб.", 200);
   } else {
      setPrice(priceSpan, "р/мес", 200);
   }
});

$(".other__item:not(._disabled)").on("click", function() {
   $(this).toggleClass("_active");
   const moreButton = $(this).find("button.other__choose");
   moreButton.attr("aria-checked", (_, origValue) => origValue == "true" ? "false" : "true");
   moreButton.attr("aria-label", (_, origValue) => origValue == "Добавить опцию" ? "Убрать опцию" : "Добавить опцию");
   changePrice($(this).closest(".service__content"), parseInt($(this).attr("data-tariff-price")), parseInt($(this).attr("data-device-price")), $(moreButton).attr("aria-checked"))
});

const cardButtons = document.querySelectorAll('.service__more');
cardButtons.forEach(button => {
   button.addEventListener("click", function() {
      button.classList.toggle("_open");
      const cardBody = this.closest(".service").querySelector(".service__content");
      _slideToggle(cardBody, 500);
   })
})

const otherButton = document.querySelectorAll(".other__more");
otherButton.forEach(button => {
   button.addEventListener("click", function() {
      button.classList.toggle("_open");
      const cardBody = this.closest(".other__item").querySelector(".other__description");
      _slideToggle(cardBody, 500);
   })
})

$(".sales__slider").slick({
   slidesToShow: 3.9,
   infinite: true,
   dots: false,
   prevArrow: "",
   nextArrow: `<button class="sales__arrow"><svg><use xlink:href="./img/sprite.svg#right-arrow"></svg></button>`,
   responsive: [
      {
      breakpoint: 1366,
      settings: {
         slidesToShow: 3,
      }
   },
   {
      breakpoint: 992,
      settings: {
         slidesToShow: 2.5,
      }
   },
   {
      breakpoint: 768,
      settings: {
         slidesToShow: 2,
      }
   },
   {
      breakpoint: 640,
      settings: {
         slidesToShow: 1,
         variableWidth: true
      }
   }
   ]
})

document.addEventListener("DOMContentLoaded", () => {
   if (window.innerWidth < 540) {
      $(".address__cards").slick({
         arrows: false,
         dots: true,
         slidesToShow: 1,
         infinite: false,
         appendDots: ".address__dots",
      })
   }
})

const buttonMore = document.querySelector(".servicies__more");
const items = document.querySelectorAll(".servicies__item")
const returnItems = () => items.forEach(item => {
   // item.classList.remove("_fully-hidden");
   // setTimeout(() => item.classList.remove("_hidden"), 300)
   // $(item).fadeIn(200);
});
const countOfAll = items.length;
const filterButtons = document.querySelectorAll(".servicies__button");
const cards = Array.from(document.querySelector(".servicies__cards").children);

let curItems = 3;
buttonMore.addEventListener("click", hideBlock);

let previousFilter;
let prevButton;

filterButtons.forEach(button => button.addEventListener("click", filterAction));
function filterAction(event) {
   const button = event.target;   
   if (button == prevButton) {
      removeClasses(filterButtons, "_active");
      items.forEach(item => {
         if (!item.hasAttribute("hidden") && item.style.display == "none") {
            $(item).fadeIn(400);
         }
      });
      return;
   }
   const value = button.dataset.filter;
   removeClasses(filterButtons, "_active");
   button.classList.add("_active");
   prevButton = button;
   previousFilter = value;
   items.forEach(item => {
      if (!item.classList.contains(value)) {
         $(item).fadeOut(0);
      } 
      if ($(item).hasClass(value) && !item.hasAttribute("hidden")) {
         $(item).fadeIn(400);
      }
   });
}

function hideBlock() {
   curItems += 3;
   const visibleItems = cards.slice(0, curItems);
   visibleItems.forEach(item => {
      console.log(previousFilter)
      if (item.hasAttribute("hidden")) {
         item.removeAttribute("hidden");
         if (item.classList.contains(previousFilter)) {
            $(item).fadeIn(400);
         } else {
            item.style.display = "none";
         }
      }
   });
   if (curItems >= countOfAll) {
      $(buttonMore).fadeOut(500);
      buttonMore.removeEventListener("click", hideBlock)
   }
}


// let prevFilter = "*";

// const $grid = $('.servicies__cards').isotope({
//    itemSelector: '.servicies__item',
// });
// $('.servicies__filter').on('click','button', function() {
//    const filterValue = $(this).attr('data-filter');
//    console.log(prevFilter, filterValue);
//    prevFilter = $(this).attr('data-filter');
//    $grid.isotope({ filter: filterValue });

   // if ($(this).hasClass("_tapped")) {
   //    $(this).removeClass("_tapped")
   // } else {
   //    setTimeout(() => $(this).addClass("_tapped"), 500);
   //    $grid.isotope({ filter: "*" });
   // }
// });

// function formPrice() {
//    const form = document.querySelector(".form-servicies");
//    const connectPrice = form.querySelector(".form-servicies__price [data-form-result]");
//    let settingPrice = 0;
//    form.querySelectorAll("select").forEach(sel => {
//       if (!sel.value.includes("static")) {
//          settingPrice += getDigFromString(sel.value);
//       }
//    });
//    setPrice($(connectPrice), getDigFormat(settingPrice))
// }
// document.addEventListener("DOMContentLoaded", formPrice);