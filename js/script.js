const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const projectTiles = document.querySelectorAll(".project-tile");
const projectDetails = document.querySelectorAll(".project-detail");
const closeButtons = document.querySelectorAll("[data-close-details]");

function closeAllDetails() {
  projectDetails.forEach((detail) => {
    detail.hidden = true;
  });
}

projectTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const targetId = tile.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    closeAllDetails();
    target.hidden = false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeAllDetails();
  });
});

const revealTargets = document.querySelectorAll(
  ".page-hero, .panel, .project-tile, .story-card, .portrait-card, .project-detail, .cv-frame-wrap, .showcase-card"
);

if (revealTargets.length > 0) {
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}
