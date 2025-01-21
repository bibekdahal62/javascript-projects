let clockElement = document.querySelector(".clock")
let dayElement = document.querySelector(".day")

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let isVisible = true
let currentTime = new Date()
let dayIndex = currentTime.getDay()
let day = dayNames[dayIndex]
let year = String(currentTime.getFullYear())
let monthIndex = currentTime.getMonth();
let month = monthNames[monthIndex]
let date = currentTime.getDate()


function updateClock() {
    let hour = String(currentTime.getHours()).padStart(2, "0");
    let minute = String(currentTime.getMinutes()).padStart(2, "0");
    clockElement.innerHTML = `${hour}:${minute} AM`
    return (`${hour}:${minute} AM`)
}

dayElement.innerHTML = day + "&nbsp;&nbsp;&nbsp;" + month + "&nbsp;&nbsp;" + date + "&nbsp;&nbsp;" + year
updateClock()

setInterval(() => {
    const currentTime = updateClock()
    if (isVisible) {
        clockElement.innerHTML = currentTime
    } else {
        let currentTimeUpdated = currentTime.replace(":", "&nbsp;")
        clockElement.innerHTML = currentTimeUpdated
    }
    isVisible = !isVisible
}, 1000);
