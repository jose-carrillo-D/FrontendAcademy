const ACTIVE = 'icon-star-full';
const INACTIVE = 'icon-star-empty';

function changeRating(stars) {
    stars.map((star) => {
        star.onclick = () => {
            const starIndex = stars.indexOf(star);
            for(let i = 0; i <= starIndex; i++) {
                stars[i].classList.remove(INACTIVE);
                stars[i].classList.add(ACTIVE);
            }
            for(let i = starIndex + 1; i < stars.length; i++) {
                stars[i].classList.remove(ACTIVE);
                stars[i].classList.add(INACTIVE);
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
    const stars = [...document.getElementsByClassName('icon-star-empty')];
    changeRating(stars);
});