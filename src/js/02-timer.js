

import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const flatpickr = require("flatpickr");
const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('.js-start');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

let select = 0;
let idTimerInterval = 0;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDatesMs = selectedDates[0].getTime();
        const currentDateMs = options.defaultDate.getTime();
        
        if ((selectedDatesMs - currentDateMs) < 0) {
            Report.warning(
                'Warning',
                '"Please choose a date in the future"',
                'Okay',
                );
            return
        }
        select = selectedDatesMs- currentDateMs;
        startButton.removeAttribute('disabled');
        return select
    },
};

flatpickr(input, options);



startButton.addEventListener('click', onButtonClick)

function onButtonClick() {
        startButton.disabled = true;
        idTimerInterval = setInterval(() => {
        const selectedDateObject = convertMs(select)
        days.textContent = Object.values(selectedDateObject)[0].toString().padStart(2, 0)
        hours.textContent = Object.values(selectedDateObject)[1].toString().padStart(2, 0)
        minutes.textContent = Object.values(selectedDateObject)[2].toString().padStart(2, 0)
        seconds.textContent = Object.values(selectedDateObject)[3].toString().padStart(2, 0)
            select -= 1000
            if (select < 0) {
                clearInterval(idTimerInterval)
            }
                        
        }, 1000)
    }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


