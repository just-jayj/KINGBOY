const musicButton = document.querySelector('a[href="#music"]');
const aboutButton = document.querySelector('a[href="#about"]');

const musicSection = document.getElementById('music');
const aboutSection = document.getElementById('about');
const home = document.querySelector('main');

function showSection(section) {
    home.style.display = "none";

    musicSection.classList.remove("active");
    aboutSection.classList.remove("active");

    section.classList.add("active");
}

musicButton.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(musicSection);
});

aboutButton.addEventListener("click", function(event) {
    event.preventDefault();
    showSection(aboutSection);
});