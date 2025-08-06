const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control_prev');
const next_btn = document.querySelector('.control_next');
const slider = document.querySelector('.header-slider');

let n = 0;
let sliderInterval;

function changeSlider(){
    for(let i = 0; i< imgs.length; i++){
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block';
}
changeSlider();

function startSlider() {
    sliderInterval = setInterval(() => {
        n = (n + 1) % imgs.length;
        changeSlider();
    }, 3000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

if (slider) {
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
    startSlider();
}

if (prev_btn) {
    prev_btn.addEventListener('click', () => {
        n = (n > 0) ? n - 1 : imgs.length - 1;
        changeSlider();
    });
}
if (next_btn) {
    next_btn.addEventListener('click', () => {
        n = (n < imgs.length - 1) ? n + 1 : 0;
        changeSlider();
    });
}

let searchInput = document.querySelector('.nav-search');
document.querySelector('#nav-btn').onclick = () => {
    searchInput.classList.toggle('active');
};