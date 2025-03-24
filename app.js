const container = document.querySelector(".container");
const spinners = document.querySelectorAll(".spinner");

const slowModifier = 1; // Higher value for slower animation, 1 for normal
const originalDasharray = "40 150";
const shrinkedDasharray = "17 150";
const duration = 0.5 * slowModifier;
const delays = [0, 0.06, 0.12, 0.18, 0.22, 0.26];

document.addEventListener("DOMContentLoaded", () => {
  gsap.set(".path", { strokeDasharray: originalDasharray });
  spinners.forEach((spinner, idx) => getAnimation(spinner, idx));
  gsap.from(".wrapper", { autoAlpha: 0 });
  // GSDevTools.create({ target: ".spinner" });
});

function getAnimation(spinner, idx) {
  gsap.set(spinner, { zIndex: 10 - idx });
  const delay = delays[idx] * slowModifier;
  const path = spinner.querySelector(".path");
  const animation = gsap.timeline({ repeat: -1, delay });

  // Initial 2 spins
  animation.to(spinner, {
    rotation: 360,
    ease: "linear",
    duration,
    repeat: 1
  });

  // 3rd small spin just while shrinking the path
  animation.to(spinner, { duration: duration * 1.25, rotation: 490 });
  animation.to(path, { duration, strokeDasharray: shrinkedDasharray }, "<");

  // Reverse spin
  animation.to(spinner, { duration: duration / 2, rotation: 360 });

  // Final spin while expanding the spinner to original size
  animation.to(path, { duration, strokeDasharray: originalDasharray });
  animation.fromTo(
    spinner,
    { rotate: 0 },
    { rotate: 360, duration, ease: "linear" },
    "<0.1"
  );
  return animation;
}
