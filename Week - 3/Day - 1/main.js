const DEFAULT_TOPIC = 'food';
let img;
let refreshButton;
let searchButton;
let searchInput;
let topic = DEFAULT_TOPIC;

document.addEventListener("DOMContentLoaded", function(event) {
    img = document.querySelector('img');
    refreshButton = document.getElementById("refresh-btn");
    searchButton = document.getElementById("search-btn");
    searchInput = document.getElementById("search-bar");
    turnOffButtons();
    refreshImage();
});

function fetchBySearch() {
    topic = searchInput.value === '' ? topic : searchInput.value;
    turnOnButtons();
    refreshImage();
}

function refreshImage() {
    turnOffButtons();
    fetchImage().then((url) => {
        img.src = url;
    }).catch(() => {
        topic = DEFAULT_TOPIC;
        img.src = './spec-guide.PNG';
        turnOnButtons();
    })
}

async function fetchImage() {
    try {
        const rawResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=wpfSungwcsrgdgjJIao189f1UrB95z1q&s=${topic}`, {mode: 'cors'});
        const jsonResponse = await rawResponse.json();
        return jsonResponse.data.images.original.url;
    } catch (err) {
        console.error(err);
        return err;
    }
}

function updateRefreshBtn() {
    turnOnButtons();
}

function turnOnButtons() {
    refreshButton.removeAttribute('disabled');
    searchButton.removeAttribute('disabled');
}

function turnOffButtons() {
    refreshButton.setAttribute('disabled', 'disabled');
    searchButton.setAttribute('disabled', 'disabled');
}