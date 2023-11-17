let slideIndex = 0;
function showSlides() {
    const slider = document.getElementById("slider");
    const sliderItems = Array.from(slider.children);

    for (let i = 0; i < sliderItems.length; i++) {
        sliderItems[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > sliderItems.length) {
        slideIndex = 1;
    }
    sliderItems[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}

window.onload = function () {
    showSlides();
};
