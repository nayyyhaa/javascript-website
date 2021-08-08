let controller;
let slideScene;
let pageScene;
const cursor = document.querySelector(".cursor");
const burger = document.querySelector(".burger");

function animateScroll() {

    /*Initialise*/
    controller = new ScrollMagic.Controller();
    //Select some things
    let slides = document.querySelectorAll('.slide');
    let navBar = document.querySelector(".nav-header")

    /*loop over*/ 
    slides.forEach((slide, index, slides) => {
        let revealImg = slide.querySelector(".reveal-img");
        let img = slide.querySelector("img");
        let revealText = slide.querySelector(".reveal-desc");
        //GSAP

        // /*individual animate*/
        // gsap.to(revealImg, 1, {x: "100%" });
        // gsap.to(img, 1, {scale: 1});

        /*group animate*/ 
        const slideT1 = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        });

        slideT1.fromTo(revealImg, {x: "0%"}, {x: "100%"});
        slideT1.fromTo(img, {scale: 2}, {scale: 1}, "-=1");
        slideT1.fromTo(revealText, {x: "0%", scale: "1"}, {x: "100%", scale: "0.3"}, "-=0.75");
        slideT1.fromTo(navBar, {y: "-100%"}, {y:"0%"}, "-=0.5");

        /*add scene*/ 
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(slideT1)
        // .addIndicators({colorStart: 'white', colorTrigger: 'white', name: 'slide'})
        .addTo(controller);

        /*new animation*/  
        const pageT1 = gsap.timeline();

        //select next slide to make current slide stay a bit longer
        // let nextSlide = slides.length -1 === index ? "end" : slides[index+1];
        // pageT1.fromTo(nextSlide, {y:"0%"}, {y:"50%"});
        // pageT1.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.1});
        // pageT1.fromTo(nextSlide, {y:"50%"}, {y:"0%"}, "-=0.5");

        // pageScene = new ScrollMagic.Scene({
        //     triggerElement: slide,
        //     duration: "100%",
        //     triggerHook: 0
        // })
        // .setTween(pageT1)
        // .setPin(slide, {pushFollowers: false}) //trigger hit start page, it made it stuck there
        // // .addIndicators({colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200})
        // .addTo(controller);

    })
}

/*cursor animation*/ 

function cursorAnimation(e) {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
}

function activeAnimation(e) {
    const item = e.target;
    console.log(item.id)
    if(item.id === "logo" || item.classList.contains("burger")) cursor.classList.add("active-nav");
    else cursor.classList.remove("active-nav");

    if(item.classList.contains("explore")) {
        cursor.classList.add("active-explore");
        gsap.to(".title-swipe",1,{y:"0%"});
    }
    else {
        cursor.classList.remove("active-explore");
        gsap.to(".title-swipe",1,{y:"100%"});
    }
}

function animateBurger(e) {
    if(!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        document.body.classList.add("hide");
        gsap.to(".line1", 0.5, {rotate: "45", y: 5, background: "black"});
        gsap.to(".line2", 0.5, {rotate: "-45", y: -5, background: "black"});
        gsap.to("#logo", 0.5, {color: "black"});
        gsap.to(".nav-bar", 0.5, {clipPath: "circle(2500px at 100% -10%)"});
        gsap.to(".cursor", 0.5, {border: "1px solid black"});
    } else {
        e.target.classList.remove("active");
        document.body.classList.remove("hide");
        gsap.to(".line1", 0.5, {rotate: "0", y: 0, background: "white"});
        gsap.to(".line2", 0.5, {rotate: "0", y: 0, background: "white"});
        gsap.to("#logo", 0.5, {color: "white"});
        gsap.to(".nav-bar", 0.5, {clipPath: "circle(2rem at 100% -10%)"});
        gsap.to(".cursor", 0.5, {border: "1px solid white"});
    }
}

/* Barba Transitions */

const logo = document.querySelector("#logo");

barba.init({
    //views: arrays of objs - pages we wanna transition
    views: [
        {
            namespace: "home",
            beforeEnter() {
                animateScroll();
                // dynamic logo update
                logo.href = './index.html';
            },
            beforeLeave() {
                slideScene.destroy();
                pageScene.destroy();
                controller.destroy();
            }
        },
        {
            namespace: "fashion",
            beforeEnter() {
                logo.href = '../index.html';
            }
        }
    ],
    transitions: [
        {
            //home
            leave({current, next}) {
                //check if last animation done/nah?
                const done = this.async();
                //Animation
                const tl = gsap.timeline({
                    defaults: {ease: 'power2.inOut'}
                })
                tl.fromTo(current.container, 1, {opacity: 1}, {opacity: 0})
                tl.fromTo('.swipe', 0.5, {x: '100%'}, {x: '0%', onComplete: done}, "-0.5")
            },
            //fashion
            enter({current, next}) { 
                //check if last animation done/nah?
                const done = this.async();
                //Scroll to the top
                window.scrollTo(0, 0);
                //Animation
                const tl = gsap.timeline({
                    defaults: {ease: 'power2.inOut'}
                })
                tl.fromTo('.swipe', 1, {x: '0%'}, {x: '100%', stagger: 0.25,  onComplete: done})
                tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1, onComplete: done})
            }
        }
    ]
})

/* Event Listeners */

document.addEventListener('mousemove',cursorAnimation);
document.addEventListener('mouseover',activeAnimation);
burger.addEventListener('click', (e) => animateBurger(e));
