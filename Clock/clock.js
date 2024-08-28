const body = document.querySelector("body"),
    hourhand = document.querySelector(".hour"),
    minutehand = document.querySelector(".minute"),
    secondhand = document.querySelector(".second"),
    modeswitch = document.querySelector(".modeswitch");

if (localStorage.getItem("mode") === "Dark Mode") {
    body.classList.add("dark");
    modeswitch.textContent = "Light Mode";
}

modeswitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDarkMode = body.classList.contains("dark");
    modeswitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

const updateTime = () => {
    let date = new Date(),
        seconds = date.getSeconds(),
        minutes = date.getMinutes(),
        hours = date.getHours(),
        secToDeg = (seconds / 60) * 360,
        minToDeg = (minutes / 60) * 360,
        hrToDeg = (hours / 12) * 360 + (minutes / 60) * 30; // Adjusted to account for minutes

    secondhand.style.transform = `rotate(${secToDeg}deg)`;
    minutehand.style.transform = `rotate(${minToDeg}deg)`;
    hourhand.style.transform = `rotate(${hrToDeg}deg)`;
};

setInterval(updateTime);