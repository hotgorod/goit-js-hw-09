// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body >
// на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
// }
// =======================================================================
const startButton = document.querySelector('.js-start')
const stopButton = document.querySelector('.js-stop')
let intervalID = 0;
stopButton.disabled = true

const body = document.querySelector('body')

startButton.addEventListener('click', onClickStart);
stopButton.addEventListener('click', onClickStop);

function randomBodyColor() {
        body.style.backgroundColor = getRandomHexColor()
        function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
        }
}

function onClickStart(evt) {
    intervalID = setInterval(randomBodyColor, 1000);
    evt.target.setAttribute('disabled', true);
    evt.target.nextElementSibling.removeAttribute('disabled');
}
   
function onClickStop(evt) {
    clearInterval(intervalID);
    evt.target.setAttribute('disabled', true);
    evt.target.previousElementSibling.removeAttribute('disabled');
}
