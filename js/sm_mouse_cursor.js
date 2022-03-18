document.addEventListener("DOMContentLoaded", function () {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoint;
  if (!isTouchDevice) {
    smMouseCursorInit();
  }
});

const mouseCursor = document.querySelector(".sm-cursor");

// !  Trail Animation
const mouseCursorTrails = gsap.to(mouseCursor, {
  duration: 1,
  paused: true,
  ease: "power3",
});

const animateCursorTrail = (e) => {
  // Initial Setup
  if (mouseCursor.style.opacity == 0) {
    gsap.set(mouseCursor, {
      x: e.pageX,
      y: e.pageY,
      autoAlpha: 1,
    });
  }

  // Trail Animation
  let vars = mouseCursorTrails.vars;
  vars.x = e.pageX;
  vars.y = e.pageY;
  mouseCursorTrails.invalidate().restart();
};

// !  Hover Animation
const mouseCursorAnimation = gsap.to(mouseCursor, {
  duration: 0.5,
  paused: true,
  scale: 2,
  ease: "Back.easeOut.config(2)",
});

const smMouseCursorInit = () => {
  // Reset Cursor
  gsap.to(mouseCursor, { scale: 1, duration: 0.2 });
  if (mouseCursorAnimation.progress() > 0) {
    mouseCursorAnimation.reverse();
    mouseCursor.innerText = "";
  }

  //! Play Trail Animation
  document.addEventListener("mousemove", (e) => {
    animateCursorTrail(e);
  });

  if (document.querySelectorAll(".sm_image-trail-section") !== null) {
    const projectNames = document.querySelectorAll(".sm_image-trail-section");
    projectNames.forEach((el) => {
      el.addEventListener("mouseleave", (e) => {
        gsap.to(mouseCursor, { scale: 1, duration: 0.3 });
      });

      el.addEventListener("mousemove", (e) => {
        gsap.to(mouseCursor, { scale: 0, duration: 0.3 });
      });
    });
  }

  // ! Play Hover Animation
  let cursorTriggers = []; // Array with all elements that will trigger the cursor animation (mouseCursorAnimation)
  let linksTriggers, formTriggers, sliderTriggers;
  if (document.querySelectorAll(".animateCursor a") !== null) {
    linksTriggers = document.querySelectorAll(".animateCursor a");
    cursorTriggers = [...cursorTriggers, ...linksTriggers];
  }
  if (
    document.querySelectorAll(
      ".animateCursor input, .animateCursor textarea, .animateCursor button"
    ) !== null
  ) {
    formTriggers = document.querySelectorAll(
      ".animateCursor input, .animateCursor textarea, .animateCursor button"
    );
    cursorTriggers = [...cursorTriggers, ...formTriggers];
  }
  if (document.querySelector(".sm_main-carousel") !== null) {
    smCarousel = document.querySelectorAll(".sm_main-carousel");
    cursorTriggers = [...cursorTriggers, ...smCarousel];
  }

  cursorTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", (e) => {
      mouseCursorAnimation.play();
    });
    trigger.addEventListener("mouseleave", (e) => {
      mouseCursorAnimation.reverse();
      mouseCursor.innerText = "";
    });
  });

  // Add Text in the cursor when hovering the Carousel
  if (document.querySelector(".sm_main-carousel") !== null) {
    const smCarousel = document.querySelector(".sm_main-carousel");

    smCarousel.addEventListener("mousemove", (e) => {
      const cursorType = window.getComputedStyle(e.target)["cursor"]; //Get the cursor type of the element being hovered

      if (cursorType == "pointer") {
        //Hovering the Image
        mouseCursor.innerText = "View";
      }
      if (cursorType == "grab") {
        //Hovering the slider
        mouseCursor.innerText = "Drag";
      }
    });

    smCarousel.addEventListener("mouseleave", (e) => {
      mouseCursor.innerText = "";
    });
  }
};
