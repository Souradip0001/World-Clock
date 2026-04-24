// GET ELEMENTS
const digitalClock = document.getElementById("digitalClock");
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");

const timezoneSelect = document.getElementById("timezone");

// DEFAULT TIMEZONE
let currentTimezone = "local";

// UPDATE TIME FUNCTION
function updateClock() {
    let now;

    // HANDLE TIMEZONE
    if (currentTimezone === "local") {
        now = new Date();
    } else {
        now = new Date(new Date().toLocaleString("en-US", { timeZone: currentTimezone }));
    }

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // FORMAT DIGITAL CLOCK
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');

    digitalClock.textContent = `${h}:${m}:${s}`;

    // ANALOG CALCULATION
    let secDeg = seconds * 6;
    let minDeg = minutes * 6 + seconds * 0.1;
    let hourDeg = (hours % 12) * 30 + minutes * 0.5;

    // APPLY ROTATION
    secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

// RUN CLOCK
setInterval(updateClock, 1000);
updateClock();

// TIMEZONE CHANGE
timezoneSelect.addEventListener("change", (e) => {
    currentTimezone = e.target.value;
    updateClock();
});
