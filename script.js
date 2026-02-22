
document.addEventListener("DOMContentLoaded", function() {
    // =========================
    // CAROUSEL HERO LOGIC
    // =========================
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let current = 0;
    let autoSlideInterval = null;
    const slideCount = slides.length;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            slide.setAttribute('aria-hidden', i !== idx);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === idx);
            ind.setAttribute('aria-selected', i === idx ? 'true' : 'false');
            ind.setAttribute('tabindex', i === idx ? '0' : '-1');
        });
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % slideCount);
    }
    function prevSlide() {
        showSlide((current - 1 + slideCount) % slideCount);
    }
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 2000);
    }
    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }
    if (carousel && slides.length > 0) {
        showSlide(0);
        startAutoSlide();
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }
        
        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => {
                showSlide(i);
                startAutoSlide();
            });
            ind.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    showSlide(i);
                    startAutoSlide();
                }
            });
        });
        
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }



// =========================
// SMOOTH SCROLL NAV LINKS
// =========================

document.querySelectorAll('nav a').forEach(link=>{
    link.addEventListener('click', function(e){

        const targetId = this.getAttribute("href");

        if(targetId && targetId.startsWith("#")){
            const target = document.querySelector(targetId);

            if(target){
                e.preventDefault();
                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
            }
        }

    });
});



// =========================
// ACTIVE NAV ON SCROLL
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

function setActiveNav(){

    let scrollY = window.pageYOffset;

    sections.forEach(section=>{

        const top = section.offsetTop - 140;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if(scrollY >= top && scrollY < top + height){

            navLinks.forEach(link=>{
                link.classList.remove("active");

                if(link.getAttribute("href") === "#" + id){
                    link.classList.add("active");
                }
            });

        }

    });

}

window.addEventListener("scroll", setActiveNav);



// =========================
// IMAGE CLICK ZOOM
// =========================

document.querySelectorAll(".card img, .products img, .certificate-image").forEach(img=>{

    img.style.cursor="pointer";

    img.addEventListener("click", ()=>{

        const overlay=document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.top="0";
        overlay.style.left="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,0.9)";
        overlay.style.display="flex";
        overlay.style.alignItems="center";
        overlay.style.justifyContent="center";
        overlay.style.zIndex="9999";
        overlay.style.cursor="pointer";

        const big=document.createElement("img");
        big.src=img.src;
        big.style.maxWidth="95%";
        big.style.maxHeight="95%";
        big.style.borderRadius="12px";
        big.style.boxShadow="0 10px 40px rgba(0,0,0,0.5)";

        overlay.appendChild(big);

        overlay.onclick=()=>overlay.remove();

        document.body.appendChild(overlay);

    });

});

});