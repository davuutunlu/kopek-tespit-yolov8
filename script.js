/* ==========================
   SCROLL ANIMATION
========================== */

const hiddenElements = document.querySelectorAll(".about, .gallery, .services");

if (hiddenElements.length) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                observer.unobserve(entry.target);

            }

        });

    });

    hiddenElements.forEach(el => {

        el.classList.add("hidden");
        observer.observe(el);

    });

}

/* ==========================
   NAVBAR
========================== */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        navbar.classList.toggle("scrolled", window.scrollY > 60);

    });

}

/* ==========================
   LIGHTBOX
========================== */

const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

if (galleryItems.length && lightbox && lightboxImg && closeBtn) {

    galleryItems.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.classList.add("active");
            lightboxImg.src = img.src;

        });

    });

    closeBtn.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            lightbox.classList.remove("active");

        }

    });

}

/* ==========================
   COUNTER
========================== */

const counters = document.querySelectorAll(".counter");

if (counters.length) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let count = 0;

            const increment = target / 80;

            function updateCounter() {

                count += increment;

                if (count < target) {

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => counterObserver.observe(counter));

}

/* ==========================
   PRELOADER
========================== */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

            setTimeout(() => {

                preloader.remove();

            }, 1000);

        }, 500);

    }

});

/* ==========================
   SCROLL PROGRESS
========================== */

const progressBar = document.getElementById("progress-bar");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const scroll = document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (scroll / height) * 100;

        progressBar.style.width = progress + "%";

    });

}

/* ==========================
   SCROLL TO TOP
========================== */

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll", () => {

        scrollBtn.classList.toggle("show", window.scrollY > 400);

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}
/*=========================
MOBILE MENU
=========================*/

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

menuToggle.classList.toggle("active");

menu.classList.toggle("active");

});

document.querySelectorAll(".menu a").forEach(link=>{

link.addEventListener("click",()=>{

menu.classList.remove("active");

menuToggle.classList.remove("active");

});

});

}
/*=========================
ACTIVE MENU
=========================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

const sectionHeight=section.offsetHeight;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
/*=========================
SMOOTH SCROLL
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});