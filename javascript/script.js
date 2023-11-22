import axios from 'axios';

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

let prevSlide = document.getElementById("prev");
prevSlide.addEventListener("click", function () {
    currentSlide--;
    showSlide(currentSlide)
});

let nextSlide = document.getElementById("next");
nextSlide.addEventListener("click", function () {
    currentSlide++;
    showSlide(currentSlide)
});


var temporadas = document.getElementsByClassName('temporada-item');
Array.from(temporadas).forEach(temporada => {
    let id = temporada.getAttribute("id").match(/(\d+)/)[0];

    temporada.addEventListener("click", function () {
        function cargarDatosJSON() {
            const jsonURL = 'https://raw.githubusercontent.com/jng150/HTML_CSS_PEC1/main/episodes.json'

            axios.get(jsonURL)
                .then(response => {
                    const episodios = response.data;
                    let contenedorEpisodios = document.querySelector(".episodio");
                    contenedorEpisodios.innerHTML = ``;
                    mostrarEpisodios(episodios.filter(episodio => episodio.Season === id));
                })
                .catch(error => {
                    console.error('Error al recuperar el archivo JSON:', error);
                });
        }
        function mostrarEpisodios(episodios) {
            const contenedorEpisodios = document.querySelector(".episodio");

            episodios.forEach(episodio => {
                const { Title, Released, Episode, Season, Synopsis, youtubeLink } = episodio;

                contenedorEpisodios.innerHTML += `
                    <div class="episodioContainer">
                        <div>
                            <p><b>Título:</b> ${Title}</p>
                            <p><b>Fecha de lanzamiento:</b> ${Released}</p>
                            <p><b>Número de episodio:</b> ${Episode}</p>
                            <p><b>Temporada:</b> ${Season}</p>
                            <p><b>Resumen:</b><br/> ${Synopsis}</p>
                            <p>${youtubeLink}</p>
                        </div>
                    </div>
                `;
            });
        }
        cargarDatosJSON();
    }, false)
});

