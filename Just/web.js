function toggleLorem() {
    var hiddenText = document.getElementById("hiddenText");
    var toggleIcon = document.getElementById("toggleIcon");

    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "block";
        toggleIcon.innerHTML = "-";
    } else {
        hiddenText.style.display = "none";
        toggleIcon.innerHTML = "+";
    }
}

function toggleLorem1() {
    var hiddenText = document.getElementById("hiddenText1");
    var toggleIcon = document.getElementById("toggleIcon1");

    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "block";
        toggleIcon.innerHTML = "-";
    } else {
        hiddenText.style.display = "none";
        toggleIcon.innerHTML = "+";
    }
}

function toggleLorem2() {
    var hiddenText = document.getElementById("hiddenText2");
    var toggleIcon = document.getElementById("toggleIcon2");

    if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
        hiddenText.style.display = "block";
        toggleIcon.innerHTML = "-";
    } else {
        hiddenText.style.display = "none";
        toggleIcon.innerHTML = "+";
    }
}