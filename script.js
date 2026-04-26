import { frame, motionValue, scroll, springValue } from "motion";

/* =================================================================
   Parth Kevadiya — Cinematic Portfolio Script
   Motion scroll-driven video-frame sequence + text overlays
   ================================================================= */

(function () {
  "use strict";

  const FRAME_COUNT = 169;
  const FRAME_DIR = "/assets/cinematic-frames";

  // Text overlays: scroll-progress ranges for visibility
  // First text starts fully visible and fades out
  const TEXT_RANGES = [
    { start: -0.01, peak: 0.00, end: 0.18 },  // "Parth Kevadiya" — visible on load
    { start: 0.16, peak: 0.26, end: 0.38 },    // "Data-Driven AI Engineer"
    { start: 0.36, peak: 0.46, end: 0.58 },    // "Architecting Systems..."
    { start: 0.56, peak: 0.66, end: 0.78 },    // "Full-Stack Developer..."
    { start: 0.78, peak: 0.88, end: 0.97 },    // "The Work Below"
  ];

  // ---------- STATE ----------
  const frameCanvas = document.getElementById("frame-canvas");
  const frameContext = frameCanvas.getContext("2d", { alpha: false });
  const preloader = document.getElementById("preloader");
  const loadText = document.getElementById("load-text");
  const textOverlays = document.querySelectorAll(".text-overlay");
  const frameContainer = document.getElementById("frame-container");
  const textOverlayContainer = document.getElementById("text-overlays");
  const cinematic = document.getElementById("cinematic");
  const resume = document.getElementById("resume");
  const frameImages = [];
  let renderedFrame = -1;
  let lastProgress = 0;

  // ---------- PRELOAD VIDEO FRAMES ----------
  function frameSrc(index) {
    return `${FRAME_DIR}/frame-${String(index + 1).padStart(4, "0")}.jpg`;
  }

  function preloadFrames() {
    return new Promise((resolve) => {
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
          if (loadText) loadText.textContent = `Loading ${pct}%`;
          if (loadedCount >= FRAME_COUNT) resolve();
        };
        img.src = frameSrc(i);
        frameImages[i] = img;
      }
    });
  }

  // ---------- RENDER FRAME ----------
  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }

  function renderFrame(progress) {
    const clamped = clamp01(progress);
    const index = Math.round(clamped * (FRAME_COUNT - 1));
    lastProgress = clamped;

    if (index !== renderedFrame) {
      renderedFrame = index;
      drawFrame(frameImages[index]);
    }

    // Scroll-linked parallax: pan canvas -5vh → +5vh as progress goes 0 → 1
    const parallaxY = (clamped * 2 - 1) * 5;
    frameContainer.style.transform = `translateY(${parallaxY}vh)`;

    updateTextOverlays(clamped);
    updateFrameOverlay();
  }

  function resizeFrameCanvas() {
    const width = frameCanvas.clientWidth;
    const height = frameCanvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = Math.max(1, Math.round(width * dpr));
    const canvasHeight = Math.max(1, Math.round(height * dpr));

    if (frameCanvas.width !== canvasWidth || frameCanvas.height !== canvasHeight) {
      frameCanvas.width = canvasWidth;
      frameCanvas.height = canvasHeight;
      renderedFrame = -1;
      renderFrame(lastProgress);
    }
  }

  function drawFrame(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const canvasWidth = frameCanvas.width;
    const canvasHeight = frameCanvas.height;
    const canvasRatio = canvasWidth / canvasHeight;
    const imageRatio = img.naturalWidth / img.naturalHeight;

    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (imageRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    frameContext.drawImage(img, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
  }

  // ---------- UPDATE TEXT OVERLAYS ----------
  function updateTextOverlays(progress) {
    textOverlays.forEach((el, i) => {
      const range = TEXT_RANGES[i];
      if (!range) return;

      let opacity = 0;
      if (progress >= range.start && progress <= range.end) {
        if (progress <= range.peak) {
          const denom = range.peak - range.start;
          opacity = denom <= 0 ? 1 : (progress - range.start) / denom;
        } else {
          opacity = 1 - (progress - range.peak) / (range.end - range.peak);
        }
      }
      opacity = Math.max(0, Math.min(1, opacity));

      el.style.opacity = opacity;
      if (opacity > 0.05) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  function updateFrameOverlay() {
    const overlay = document.getElementById("frame-overlay");
    let maxTextOpacity = 0;

    textOverlays.forEach((el) => {
      const op = parseFloat(el.style.opacity) || 0;
      if (op > maxTextOpacity) maxTextOpacity = op;
    });

    overlay.style.opacity = 0.2 + maxTextOpacity * 0.35;
  }

  // ---------- INIT MOTION ----------
  function initMotionScroll() {
    const rawProgress = motionValue(0);
    const smoothProgress = springValue(rawProgress, {
      stiffness: 420,
      damping: 48,
      mass: 0.22,
    });

    smoothProgress.on("change", (latest) => {
      frame.render(() => renderFrame(latest));
    });

    scroll(() => {
      rawProgress.set(getCinematicProgress());
    }, { trackContentSize: true });

    scroll(() => {
      updateCinematicExit();
    }, { trackContentSize: true });
  }

  function getCinematicProgress() {
    const rect = cinematic.getBoundingClientRect();
    const scrollLength = Math.max(1, cinematic.offsetHeight - window.innerHeight);
    return clamp01(-rect.top / scrollLength);
  }

  function updateCinematicExit() {
    const rect = resume.getBoundingClientRect();
    const start = window.innerHeight * 0.9;
    const end = window.innerHeight * 0.2;
    const progress = clamp01((start - rect.top) / (start - end));
    const opacity = 1 - progress;

    frameContainer.style.opacity = opacity;
    textOverlayContainer.style.opacity = opacity;

    if (progress >= 1) {
      frameContainer.style.display = "none";
      textOverlayContainer.style.display = "none";
    } else {
      frameContainer.style.display = "";
      textOverlayContainer.style.display = "";
    }
  }

  function initResumeReveal() {
    const revealEls = document.querySelectorAll(".resume-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = [...revealEls].indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("visible"), index * 80);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });

    revealEls.forEach((el) => observer.observe(el));
  }

  function initExperienceGallery() {
    const cards = [...document.querySelectorAll("[data-experience-card]")];
    const dots = [...document.querySelectorAll("[data-experience-dot]")];
    const prevButton = document.querySelector("[data-experience-prev]");
    const nextButton = document.querySelector("[data-experience-next]");
    let activeIndex = 0;

    if (!cards.length) return;

    function setActive(nextIndex) {
      activeIndex = (nextIndex + cards.length) % cards.length;

      cards.forEach((card, index) => {
        const offset = (index - activeIndex + cards.length) % cards.length;
        const state = offset === 0 ? "active" : offset === 1 ? "next" : offset === cards.length - 1 ? "prev" : "hidden";
        card.dataset.state = state;
        card.setAttribute("aria-hidden", state === "active" ? "false" : "true");
      });

      dots.forEach((dot, index) => {
        dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
      });
    }

    prevButton?.addEventListener("click", () => setActive(activeIndex - 1));
    nextButton?.addEventListener("click", () => setActive(activeIndex + 1));
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => setActive(index));
    });

    setActive(0);
  }

  // ---------- HUD CLOCK ----------

  // ---------- NAV SCROLL BEHAVIOR ----------
  function initNav() {
    const nav = document.getElementById("site-nav");
    const tabs = document.querySelectorAll(".nav-tab");
    const anchors = ["cinematic", "about-anchor", "proj-anchor", "skills-anchor", "contact-anchor"];

    // Scrolled background
    window.addEventListener("scroll", () => {
      if (nav) {
        if (window.scrollY > 60) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      }
    }, { passive: true });

    // Active tab on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tabs.forEach((t) => t.classList.remove("active-tab"));
          const active = document.querySelector(`.nav-tab[data-section="${entry.target.id}"]`);
          if (active) active.classList.add("active-tab");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ---------- BOOT ----------
  async function boot() {
    window.scrollTo(0, 0);
    await preloadFrames();

    resizeFrameCanvas();
    renderFrame(0);
    updateCinematicExit();
    window.addEventListener("resize", resizeFrameCanvas);

    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 900);

    requestAnimationFrame(() => {
      initMotionScroll();
      initResumeReveal();
      initExperienceGallery();

      initNav();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
