// Демонстраційні фото

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

// Загрузка машин по вибору користувача

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    const cars = [
        { name: 'Volkswagen Arteon', image: './img/cars/arteon.png', info: "Model: Volkswagen Arteon<br>Engine: 2.0 TSI gasoline engine<br>Power: 280 hp<br>Year of manufacture: 2023<br>Price: 65.000$" },
        { name: 'Audi RS7', image: './img/cars/audi.png', info: "Model: Audi RS7<br>Engine: Twin-turbocharged V8<br>Power: 600 hp<br>Year of manufacture: 2021<br>Price: 175.000$" },
        { name: 'Dodge Challenger Hellcat', image: './img/cars/hellcat.png', info: "Model: Dodge Challenger Hellcat<br>Engine: Supercharged V8<br>Power: 800 hp<br>Year of manufacture: 2019<br>Price: 80.000$" },
        { name: 'BMW M5 F90', image: './img/cars/bmw.png', info: "Model: BMW M5 F90<br>Engine: Twin-turbocharged V8<br>Power: 625 hp<br>Year of manufacture: 2018<br>Price: 90.000$" },
        { name: 'Chevrolet Corvette C6', image: './img/cars/corvette.png', info: "Model: Chevrolet Corvette C6<br>Engine: V8<br>Power: 505 hp<br>Year of manufacture: 2018<br>Price: 100.000$" },
        { name: 'Mercedes-Benz E63', image: './img/cars/mercedes.png', info: "Model: Mercedes-Benz E63<br>Engine: Twin-turbocharged V8<br>Power: 603 hp<br>Year of manufacture: 2016<br>Price: 50.000$" },
        { name: 'Pagani Zonda R', image: './img/cars/pagani.png', info: "Model: Pagani Zonda R<br>Engine: AMG V12<br>Power: 800 hp<br>Year of manufacture: 2011<br>Price: 1.500.000$" },
        { name: 'Porsche 911', image: './img/cars/porsche.png', info: "Model: Porsche 911<br>Engine: V6<br>Power: 600 hp<br>Year of manufacture: 2021<br>Price: 185.000$" },
        { name: 'Lamborghini Aventador', image: './img/cars/aventador.png', info: "Model: Lamborghini Aventador<br>Engine:V12<br>Power: 780 hp<br>Year of manufacture: 2021<br>Price: 350.000$" }
    ];

    const carDetailsContent = document.getElementById('carDetailsContent');
    if (cars[carId]) {
        const car = cars[carId];
        carDetailsContent.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h2>${car.name}</h2>
            <p>${car.info}</p>
        `;
    }
});

// Виведення коментарів

fetch('./comments.json')
    .then(response => response.json())
    .then(comments => {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        const carComments = comments.filter(comment => comment.carId === parseInt(carId));

        carComments.forEach(item => {
            let newCom = document.createElement('div');
            let commentsContainer = document.querySelector(".comments");
            newCom.classList.add('comment');
            newCom.innerHTML = `
                <p id="name">${item.name}</p>
                <p id="comment-text">${item.comments}</p>
            `;
            commentsContainer.appendChild(newCom);
        });
    });
