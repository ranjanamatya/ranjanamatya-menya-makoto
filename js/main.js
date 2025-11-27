// Simple hero slider
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

if (slides.length > 0) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 6000); // 6 seconds
}

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      const headerHeight = document.querySelector(".site-header").offsetHeight;
      const targetPosition =
        targetEl.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight +
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile nav if open
      mainNav.classList.remove("open");
    }
  });
});

// Highlight current section in nav while scrolling
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const scrollPos = window.pageYOffset;
  const headerHeight = document.querySelector(".site-header").offsetHeight;

  sections.forEach((section) => {
    const offsetTop = section.offsetTop - headerHeight - 80;
    const offsetBottom = offsetTop + section.offsetHeight;

    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// Menu tabs
const menuTabs = document.querySelectorAll(".menu-tab");
const menuLists = document.querySelectorAll(".menu-list");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetKey = tab.getAttribute("data-menu");
    menuTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    menuLists.forEach((list) => {
      const id = list.id.replace("menu-", ""); // e.g. starters
      list.classList.toggle("active", id === targetKey);
    });
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Simple fake submit handler for reservations form
const reservationsForm = document.querySelector(".reservations-form");
if (reservationsForm) {
  reservationsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your booking request has been sent.");
    reservationsForm.reset();
  });
}

/* ... */

const navStrip = document.getElementById("navigation");

// Horizontal movement based on mouse X
function updateNavPosition(e) {
  const viewportWidth = window.innerWidth;
  const stripWidth = navStrip.scrollWidth;

  const extra = stripWidth - viewportWidth; // how much wider than screen
  if (extra <= 0) {
    navStrip.style.transform = "translateX(0)";
    return;
  }

  const mouseX = e.clientX;
  const percent = mouseX / viewportWidth; // 0 (left) -> 1 (right)
  const offset = -extra * percent; // move strip to left when mouse right

  navStrip.style.transform = `translateX(${offset}px)`;
}

window.addEventListener("mousemove", updateNavPosition);
window.addEventListener("resize", () => {
  navStrip.style.transform = "translateX(0)";
});

/* ... */
// document.addEventListener("DOMContentLoaded", function () {
//   const navLinks = document.querySelectorAll(".nav-link");
//   const sections = document.querySelectorAll("section[id]");

//   // Scroll to a section smoothly
//   function scrollToSection(id) {
//     const sec = document.getElementById(id);
//     if (!sec) return;

//     sec.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }

//   // Mark active link
//   function setActiveLink(sectionId) {
//     navLinks.forEach((link) => {
//       const target = link.dataset.target;
//       link.classList.toggle("active", target === sectionId);
//     });
//   }

//   // Map pathname (/about, /menu, etc.) to section IDs
//   function pathToSection(pathname) {
//     const slug = pathname.replace(/\/+$/, "").split("/").pop(); // get last part

//     if (!slug || slug === "") return "hero"; // homepage

//     switch (slug) {
//       case "about":
//         return "about";
//       case "menu":
//         return "menu";
//       case "blog":
//         return "blog";
//       case "reservations":
//         return "reservations";
//       case "gallery":
//         return "gallery";
//       case "contact":
//         return "contact";
//       default:
//         return "hero";
//     }
//   }

//   // Handle nav clicks (no page refresh)
//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       e.preventDefault();

//       const targetSection = this.dataset.target;
//       const targetUrl = this.getAttribute("href");

//       // Scroll
//       scrollToSection(targetSection);

//       // Change URL without refreshing
//       history.pushState({ section: targetSection }, "", targetUrl);

//       // Update active state
//       setActiveLink(targetSection);
//     });
//   });

//   // Handle back/forward buttons
//   window.addEventListener("popstate", function (e) {
//     const sectionId = e.state?.section || pathToSection(location.pathname);
//     scrollToSection(sectionId);
//     setActiveLink(sectionId);
//   });

//   // On first load: go to correct section if URL is /about, /menu, etc.
//   const initialSection = pathToSection(location.pathname);
//   setActiveLink(initialSection);
//   // optional: auto-scroll on load
//   if (initialSection !== "hero") {
//     scrollToSection(initialSection);
//   }
// });
/*  */
