/* ==========================================================================
   MANISH KUMAR — PORTFOLIO SCRIPT
   Handles: nav scroll state, mobile menu, smooth scroll, scroll-reveal,
   typewriter effect, skill bar fill, project 3D tilt, particle background,
   contact form validation.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     PLACEHOLDER LINKS — EDIT THESE TO YOUR REAL DETAILS
  ------------------------------------------------------- */
  const CONFIG = {
    email: "your.email@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    projectLiveLink: "#", // e.g. "https://your-study-planner.netlify.app"
    projectGithubLink: "https://github.com/your-username/student-study-planner"
  };

  const viewProjectLink = document.getElementById("viewProjectLink");
  const githubProjectLink = document.getElementById("githubProjectLink");
  if (viewProjectLink) viewProjectLink.href = CONFIG.projectLiveLink;
  if (githubProjectLink) githubProjectLink.href = CONFIG.projectGithubLink;

  /* -------------------------------------------------------
     NAVBAR — scrolled state + active link highlight
  ------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("main .section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTopBtn = document.getElementById("scrollTop");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.toggle("active-link", link.getAttribute("href") === `#${current}`);
    });

    // scroll-to-top button
    scrollTopBtn.classList.toggle("visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* -------------------------------------------------------
     SCROLL TO TOP
  ------------------------------------------------------- */
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* -------------------------------------------------------
     TYPEWRITER — role text under name
  ------------------------------------------------------- */
  const typewriterEl = document.getElementById("typewriter");
  const roles = [
    "BCA Student & Aspiring Python Developer",
    "Web Development Learner",
    "Building Practical Digital Projects"
  ];

  if (prefersReducedMotion) {
    typewriterEl.textContent = roles[0];
  } else {
    let roleIndex = 0, charIndex = 0, deleting = false;

    const typeLoop = () => {
      const full = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typewriterEl.textContent = full.slice(0, charIndex);
        if (charIndex === full.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typewriterEl.textContent = full.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 55);
    };
    typeLoop();
  }

  /* -------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* -------------------------------------------------------
     SKILL BARS — animate width when visible
  ------------------------------------------------------- */
  const skillBars = document.querySelectorAll(".skill-bar__fill");
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.dataset.fill || 0;
        entry.target.style.width = `${fill}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* -------------------------------------------------------
     HERO PROFILE VISUAL — subtle mouse parallax for extra depth
  ------------------------------------------------------- */
  const orbitScene = document.querySelector(".orbit-scene");
  if (orbitScene && !prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const maxShift = 10;

    orbitScene.addEventListener("mousemove", (e) => {
      const rect = orbitScene.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const shiftX = (px - 0.5) * maxShift * 2;
      const shiftY = (py - 0.5) * maxShift * 2;
      orbitScene.style.transform = `rotateX(${-shiftY * 0.6}deg) rotateY(${shiftX * 0.6}deg)`;
    });

    orbitScene.addEventListener("mouseleave", () => {
      orbitScene.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  /* -------------------------------------------------------
     PROJECT CARD — subtle 3D tilt on mouse move
  ------------------------------------------------------- */
  const tiltCard = document.getElementById("tiltCard");
  if (tiltCard && !prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const maxTilt = 5;

    tiltCard.addEventListener("mousemove", (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
      tiltCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }

  /* -------------------------------------------------------
     CONTACT FORM — validation, no fake backend
     TODO: connect to your backend / form service (e.g. Formspree,
     EmailJS, or your own API) inside submitForm() below.
  ------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
  };
  const formStatus = document.getElementById("formStatus");

  const validators = {
    name: (v) => v.trim().length >= 2 ? "" : "Please enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    message: (v) => v.trim().length >= 10 ? "" : "Message should be at least 10 characters."
  };

  const validateField = (key) => {
    const { input, error } = fields[key];
    const msg = validators[key](input.value);
    input.classList.toggle("invalid", Boolean(msg));
    error.textContent = msg;
    return !msg;
  };

  Object.keys(fields).forEach(key => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].input.classList.contains("invalid")) validateField(key);
    });
  });

  const submitForm = (data) => {
    // Backend is not configured yet. Wire this up to your service of choice:
    // e.g. fetch("https://formspree.io/f/your-id", { method: "POST", body: JSON.stringify(data), headers: {...} })
    console.log("Contact form submitted (no backend configured):", data);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      formStatus.textContent = "Please fix the highlighted fields.";
      formStatus.style.color = "#ff8fa3";
      return;
    }

    submitForm({
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      message: fields.message.input.value.trim()
    });

    formStatus.textContent = "Thanks! Your message looks good — connect a backend to actually send it.";
    formStatus.style.color = "";
    form.reset();
  });

  /* -------------------------------------------------------
     LIGHTWEIGHT PARTICLE BACKGROUND (canvas)
  ------------------------------------------------------- */
  const canvas = document.getElementById("particle-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    const colors = ["79,123,255", "155,107,255", "255,110,199", "51,224,224"];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const count = Math.min(60, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: Math.random() * 0.5 + 0.15
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    };

    resize();
    initParticles();
    tick();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initParticles(); }, 200);
    });
  }

});