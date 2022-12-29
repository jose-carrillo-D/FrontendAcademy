window.addEventListener("load", ()=>{
    const bars = document.querySelectorAll('#container .progress-bar');
    bars.forEach(bar => {
        const porcentage = bar.id.replace(/\D/g, '');
        console.log(porcentage);
        setProgress(bar, porcentage);
    } );
});

function setProgress(container, porcentage){
    const bar = container.querySelector('.bar-container .bar');
    const progress = bar.querySelector('.color');
    const indicator = progress.querySelector('.indicator');
    const status = ['In progress', 'In review', 'Almost Done!', 'Done!!'];
    const statusClasses = ['in-progress', 'in-review', 'almost-done', 'almost-done'];
    const currentStatus = (porcentage != 100) ? parseInt(porcentage / (100 / status.length - 1)) : 3;

    //Set progress size
    progress.style.width = `${porcentage}%`;
    progress.className = `color ${statusClasses[currentStatus]}`;
    //Set indicator status
    indicator.innerHTML = `<span>${porcentage}%</span> ${status[currentStatus]}`;
}