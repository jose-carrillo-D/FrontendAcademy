'use strict'

let animationFlag = true;

window.addEventListener("load", () => {

    //Get all slides
    const slides = document.querySelectorAll("ul li");
    const bg = document.querySelector("#bg");

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            const active = document.querySelector("ul li.active");
            if(active && active.id != slide.id){
                active.classList.remove('active');
                setBackground(slide, bg);
            }
        });
    });

    setBackground(slides[0], bg);

});

function setBackground(slide, bg){
    slide.className = 'active';
    bg.style.background = `url("./attachments/${slide.id}.jpg")`;
    bg.style.animation = 'none';
    reloadAnimation(bg);
    displayContent(slide);
}

function reloadAnimation(bg){
    if(animationFlag) bg.style.animation = 'appear1 0.5s';
    else bg.style.animation = 'appear2 0.5s';
    animationFlag = !animationFlag;
}

function displayContent(slide){
    setTimeout(() => {
        slide.classList.add('display-content');
    }, 200);
}