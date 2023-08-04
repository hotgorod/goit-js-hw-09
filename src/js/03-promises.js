// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
//   скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position),
//   що створюється, і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
//   який виконується або відхиляється через delay часу.Значенням промісу повинен бути 
// об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// ===============================================================================
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
    event.preventDefault()
  let delay = Number(event.currentTarget.elements.delay.value)
  const step = Number(event.currentTarget.elements.step.value)
  const amount = Number(event.currentTarget.elements.amount.value)


  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay)
    .then(({ position, delay }) => {
      
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay+=step
  }
  


}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = {
    position, delay
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
    res(promise)
    } else {
      rej(promise)
    }

   }, delay)
  })
  
}
