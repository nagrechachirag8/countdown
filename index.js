const date = document.getElementById("date-input")
const time = document.getElementById("time-input")
const calculateBtn = document.getElementById("calculate-btn")
var dateVal;
var timeVal;
var selectedDateTime;
let countdownTimeout; 

date.addEventListener("change", function () {
    dateVal = this.value;
})

time.addEventListener("change", function () {
    timeVal = this.value
})

calculateBtn.addEventListener("click", function() {
    selectedDateTime = new Date(`${dateVal}T${timeVal}`)

    clearTimeout(countdownTimeout);

    startCountDown(selectedDateTime);
})

function startCountDown(selectedDateTime) {
    function updateCountdown(){
        const currentDate = new Date();
        const timeDifference = selectedDateTime - currentDate 

        if (timeDifference <= 0) {
            document.getElementById("countdown").innerHTML = "0d 0h 0m 0s";
            document.getElementById("countdown-label").innerHTML = `Time's up!`;
            return;
        }
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        document.getElementById("countdown-label").innerHTML = `Until ${formatDateTime(selectedDateTime)}`;
    
        countdownTimeout = setTimeout(updateCountdown,1000);
    }
    updateCountdown();
}

function formatDateTime(dateTime) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // To display time in 12-hour format
    };
    return dateTime.toLocaleString('en-US', options);
}