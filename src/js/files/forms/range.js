// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
   const ranges = document.querySelectorAll(".form-choose__range");
   if (ranges.length) {
      ranges.forEach(range => {
         const priceSlider = range.querySelector(".form-choose__slider");
         let textFrom = parseInt(priceSlider.getAttribute('data-from'));
         let textTo = parseInt(priceSlider.getAttribute('data-to'));
         noUiSlider.create(priceSlider, {
            start: [textFrom, textTo],
            connect: [false, true, false],
            range: {
               'min': [textFrom],
               'max': [textTo]
            }
         });
         const priceStart = range.querySelector('.form-choose__start');
         const priceEnd = range.querySelector('.form-choose__end');
         priceStart.addEventListener('change', setPriceValues);
         priceEnd.addEventListener('change', setPriceValues);
         function setPriceValues() {
            let priceStartValue;
            let priceEndValue;
            if (priceStart.value != '') {
               priceStartValue = priceStart.value;
            }
            if (priceEnd.value != '') {
               priceEndValue = priceEnd.value;
            }
            priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
         }

         priceSlider.noUiSlider.on('update', function (values, handle) {
            priceStart.value = parseInt(values[0]);
            priceEnd.value = parseInt(values[1]);
         });
      })
   }
}
rangeInit();