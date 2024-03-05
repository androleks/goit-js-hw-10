let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};


const startBtn = document.querySelector('button[data-action-start]');
const stopBtn = document.querySelector('button[data-action-stop]');
const clockface = document.querySelector('.js-clockface');

// =======================================

let isActive;
let intervalId;
let initTime = new Date('03.04.2024 12:43');

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    renderTime(diff);

    if (diff < 1000) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

// =========================================

startBtn.addEventListener('click', () => {
  startTimer();
});

stopBtn.addEventListener('click', () => {
  stopTimer();
});

function renderTime(diff) {
  const time = convertMsToTime(diff);
  clockface.innerHTML = time;
}


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}