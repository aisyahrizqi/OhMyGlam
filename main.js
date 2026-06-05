/* ==============================================
   OMG — Oh My Glow | main.js
   ============================================== */

(function () {
  "use strict";

  // ============================================
  // THEME TOGGLE
  // ============================================

  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = themeToggleBtn.querySelector(".theme-icon");

  const savedTheme = localStorage.getItem("omg-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("omg-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================

  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  if (cursor && cursorRing && window.innerWidth > 768) {
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll(
      "a, button, .product-card, .cat-card, .review-card",
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorRing.style.width = "56px";
        cursorRing.style.height = "56px";
        cursor.style.transform = "translate(-50%,-50%) scale(1.6)";
      });
      el.addEventListener("mouseleave", () => {
        cursorRing.style.width = "34px";
        cursorRing.style.height = "34px";
        cursor.style.transform = "translate(-50%,-50%) scale(1)";
      });
    });
  }

  // ============================================
  // NAVBAR SCROLL
  // ============================================

  const navbar = document.getElementById("navbar");

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );

  // ============================================
  // MOBILE MENU
  // ============================================

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
  mobileClose.addEventListener("click", () =>
    mobileMenu.classList.remove("open"),
  );
  mobileMenu
    .querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("open")),
    );

  // ============================================
  // SCROLL REVEAL
  // ============================================

  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ============================================
  // LAZY IMAGE FALLBACK (in case Unsplash fails)
  // ============================================

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.style.display = "none";
      const wrap = this.closest(
        ".card-img-wrap, .hero-img-wrap, .about-visual, .cat-card",
      );
      if (wrap) {
        wrap.style.background = "linear-gradient(145deg, #1a1a1a, #2a2016)";
        const placeholder = document.createElement("div");
        placeholder.style.cssText =
          "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:serif;font-size:2rem;color:rgba(201,169,110,0.3);font-style:italic;";
        placeholder.textContent = "OMG";
        wrap.appendChild(placeholder);
      }
    });
  });

  // ============================================
  // SMOOTH ANCHOR SCROLL
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ============================================
  // PRODUCT CARD PARALLAX TILT (desktop only)
  // ============================================

  if (window.innerWidth > 768) {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        card.style.transition = "transform 0.1s";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.4s cubic-bezier(0.4,0,0.2,1)";
      });
    });
  }

  // ============================================
  // MARQUEE PAUSE ON HOVER
  // ============================================

  const marqueeTrack = document.querySelector(".marquee-track");
  const marqueeWrap = document.querySelector(".marquee-wrap");

  if (marqueeTrack && marqueeWrap) {
    marqueeWrap.addEventListener("mouseenter", () => {
      marqueeTrack.style.animationPlayState = "paused";
    });
    marqueeWrap.addEventListener("mouseleave", () => {
      marqueeTrack.style.animationPlayState = "running";
    });
  }
})();
