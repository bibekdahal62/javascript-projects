let clockElement = document.querySelector(".clock")
let dayElement = document.querySelector(".day")

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let isVisible = true

function updateClock() {
    let currentTime = new Date()
    let hour = String(currentTime.getHours()).padStart(2, "0");
    let minute = String(currentTime.getMinutes()).padStart(2, "0");
    let second = String(currentTime.getSeconds()).padStart(2, "0");
    clockElement.innerHTML = `${hour} ${minute} ${second}`
    let dayIndex = currentTime.getDay()
    let day = dayNames[dayIndex]
    let year = String(currentTime.getFullYear())
    let monthIndex = currentTime.getMonth();
    let month = monthNames[monthIndex]
    let date = currentTime.getDate()
    dayElement.innerHTML = day + "&nbsp;&nbsp;&nbsp;" + month + "&nbsp;&nbsp;" + date + "&nbsp;&nbsp;" + year
    return (`${hour}:${minute}:${second}`)
}
updateClock()

setInterval(() => {
    const currentTimes = updateClock()
    if (isVisible) {
        clockElement.innerHTML = currentTimes
    } else {
        let currentTimeUpdated = currentTimes.replaceAll(":", "&nbsp;")
        clockElement.innerHTML = currentTimeUpdated
    }
    isVisible = !isVisible
}, 1000);
