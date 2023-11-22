let currentSlide = 0;

function showSlide(index) {
    const carousel = document.getElementById("carousel");
    const totalSlides = document.querySelectorAll(".carousel-item").length;

    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    currentSlide = index;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}