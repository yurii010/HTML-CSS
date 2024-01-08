// Демонстраційні фото
document.addEventListener('DOMContentLoaded', function () {
    let slideIndex = 0;
    showSlides();
    function showSlides() {
        const slider = document.getElementById("slider");
        if (slider) {
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
    }
});

// Загрузка машин по вибору користувача
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    const cars = [
        { name: 'Volkswagen Arteon', image: './img/cars/arteon.png', model: "Model: Volkswagen Arteon", engine: "Engine: 2.0 TSI gasoline engine", power: "Power: 280 hp", year: "Year of manufacture: 2023", price: "Price: 65.000$" },
        { name: 'Audi RS7', image: './img/cars/audi.png', model: "Model: Audi RS7", engine: "Engine: Twin-turbocharged V8", power: "Power: 600 hp", year: "Year of manufacture: 2021", price: "Price: 175.000$" },
        { name: 'Dodge Challenger Hellcat', image: './img/cars/hellcat.png', model: "Model: Dodge Challenger Hellcat", engine: "Engine: Supercharged V8", power: "Power: 800 hp", year: "Year of manufacture: 2019", price: "Price: 80.000$" },
        { name: 'BMW M5 F90', image: './img/cars/bmw.png', model: "Model: BMW M5 F90", engine: "Engine: Twin-turbocharged V8", power: "Power: 625 hp", year: "Year of manufacture: 2018", price: "Price: 90.000$" },
        { name: 'Chevrolet Corvette C6', image: './img/cars/corvette.png', model: "Model: Chevrolet Corvette C6", engine: "Engine: V8", power: "Power: 505 hp", year: "Year of manufacture: 2018", price: "Price: 100.000$" },
        { name: 'Mercedes-Benz E63', image: './img/cars/mercedes.png', model: "Model: Mercedes-Benz E63", engine: "Engine: Twin-turbocharged V8", power: "Power: 603 hp", year: "Year of manufacture: 2016", price: "Price: 50.000$" },
        { name: 'Pagani Zonda R', image: './img/cars/pagani.png', model: "Model: Pagani Zonda R", engine: "Engine: AMG V12", power: "Power: 800 hp", year: "Year of manufacture: 2011", price: "Price: 1.500.000$" },
        { name: 'Porsche 911', image: './img/cars/porsche.png', model: "Model: Porsche 911", engine: "Engine: V6", power: "Power: 600 hp", year: "Year of manufacture: 2021", price: "Price: 185.000$" },
        { name: 'Lamborghini Aventador', image: './img/cars/aventador.png', model: "Model: Lamborghini Aventador", engine: "Engine: V12", power: "Power: 780 hp", year: "Year of manufacture: 2021", price: "Price: 350.000$" }
    ];

    const carDetailsContent = document.getElementById('carDetailsContent');
    if (cars[carId]) {
        const car = cars[carId];
        let imageElement = document.createElement('img');
        imageElement.src = car.image;
        let h2Element = document.createElement('h2');
        h2Element.textContent = car.name;
        let pElement = document.createElement('p');
        // ??
        pElement.innerHTML = `${car.model} <br> ${car.engine} <br> ${car.power} <br> ${car.year} <br> ${car.price}`;
        carDetailsContent.appendChild(imageElement);
        carDetailsContent.appendChild(h2Element);
        carDetailsContent.appendChild(pElement);
    }
});

// Виведення коментарів
fetch('../json/comments.json')
    .then(response => response.json())
    .then(comments => {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        const carComments = comments.filter(comment => comment.carId === parseInt(carId));

        carComments.forEach(item => {
            let newCom = document.createElement('div');
            let nameElement = document.createElement('p');
            let commentElement = document.createElement('p');
            let commentsContainer = document.querySelector(".comments");
            nameElement.setAttribute('id', 'name');
            commentElement.setAttribute('id', 'comment-text');
            nameElement.textContent = item.name;
            commentElement.textContent = item.comments;
            commentsContainer.appendChild(newCom);
            newCom.appendChild(nameElement);
            newCom.appendChild(commentElement);
        });
    });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.submit').addEventListener('click', function () {
        let commentName = document.querySelector('.form-name').value;
        let commentText = document.querySelector('.form-comment').value;
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carId: parseInt(carId),
                name: commentName,
                comments: commentText,
            }),
        })
            .then(response => response.json())
    });
});


