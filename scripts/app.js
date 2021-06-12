let controller;
let slideScene;
function animateScroll() {

    /*Initialise*/
    controller = new ScrollMagic.Controller();
    //Select some things
    let slides = document.querySelectorAll('.slide');
    let navBar = document.querySelector(".nav-header")

    /*loop over*/ 
    slides.forEach(slide => {
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
        slideT1.fromTo(revealText, {x: "0%"}, {x: "100%"}, "-=0.75");
        slideT1.fromTo(navBar, {y: "-100%"}, {y:"0%"}, "-=0.9");

        /*add scene*/ 
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(slideT1)
        .addIndicators({colorStart: 'white', colorTrigger: 'white', name: 'slide'})
        .addTo(controller);

        /*new animation*/  
        const pageT1 = gsap.timeline();

        pageT1.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.1});

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
        .setTween(pageT1)
        .setPin(slide, {pushFollowers: false})
        .addIndicators({colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200})
        .addTo(controller);


    })
}

animateScroll();