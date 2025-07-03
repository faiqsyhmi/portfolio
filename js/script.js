// Welcome Overlay Fullscreen Logic
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("welcome-overlay");
  const enterBtn = document.getElementById("enter-btn");

  if (overlay && enterBtn) {
    enterBtn.addEventListener("click", function () {
      // Try to enter fullscreen (must be user gesture)
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Safari
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE11
        document.documentElement.msRequestFullscreen();
      }
      // Hide overlay regardless of fullscreen success
      overlay.style.display = "none";
    });
  }

  // Initialize other functions
  initializeTheme();
  animateOnScroll();
  setCurrentYear();
});

// Mobile Menu Toggle with Animation
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const nav = document.querySelector("nav ul");
    const icon = this.querySelector("i");

    if (nav) {
      // Toggle menu display with animation
      nav.classList.toggle("show");

      // Animate menu toggle icon
      if (nav.classList.contains("show")) {
        icon.classList.replace("fa-bars", "fa-times");
        nav.style.maxHeight = nav.scrollHeight + "px";
      } else {
        icon.classList.replace("fa-times", "fa-bars");
        nav.style.maxHeight = "0";
      }
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      const nav = document.querySelector("nav ul");
      const menuToggle = document.querySelector(".menu-toggle");

      if (nav && menuToggle) {
        const icon = menuToggle.querySelector("i");
        nav.classList.remove("show");
        nav.style.maxHeight = "0";
        if (icon) {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    }
  });
});

// Enhanced Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#" || targetId === "#home") {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Account for sidebar width (70px) and add some padding
    const sidebarWidth = 70;
    const extraPadding = 20;
    const targetPosition = targetElement.offsetTop - extraPadding;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Form Submission with Validation
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[name="name"]');
    const email = this.querySelector('input[name="email"]');
    const subject = this.querySelector('input[name="subject"]');
    const message = this.querySelector('textarea[name="message"]');

    if (!name || !email || !subject || !message) {
      alert("Form elements not found");
      return;
    }

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    // Simple validation
    if (!nameValue || !emailValue || !subjectValue || !messageValue) {
      alert("Please fill in all fields");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      alert("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.textContent = "Sent!";

      // Show success message
      const existingMessage = this.querySelector(".success-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Message sent successfully!";
      successMessage.style.color = "var(--primary-color)";
      successMessage.style.marginTop = "20px";
      successMessage.style.textAlign = "center";
      successMessage.style.fontWeight = "bold";

      this.appendChild(successMessage);

      // Reset form after delay
      setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        successMessage.remove();
      }, 3000);
    }, 1500);
  });
}

// Add intersection observer for scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".project-card, .skill-item, .about-content"
  );

  if (elements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }
};

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Fullscreen Toggle
const fullscreenBtn = document.querySelector(".fullscreen-toggle");
if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  // Update fullscreen button icon
  document.addEventListener("fullscreenchange", updateFullscreenIcon);
  document.addEventListener("webkitfullscreenchange", updateFullscreenIcon);
  document.addEventListener("msfullscreenchange", updateFullscreenIcon);

  function updateFullscreenIcon() {
    const icon = fullscreenBtn.querySelector("i");
    if (icon) {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        icon.classList.replace(
          "fa-expand-arrows-alt",
          "fa-compress-arrows-alt"
        );
      } else {
        icon.classList.replace(
          "fa-compress-arrows-alt",
          "fa-expand-arrows-alt"
        );
      }
    }
  }
}

// Theme Toggle
const initializeTheme = () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  if (!themeToggle) return;

  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  body.className = currentTheme;
  const icon = themeToggle.querySelector("i");
  if (icon) {
    if (currentTheme === "dark") {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  }

  themeToggle.addEventListener("click", () => {
    const icon = themeToggle.querySelector("i");
    if (!icon) return;

    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark");
      document.documentElement.classList.add("dark");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
      document.documentElement.classList.add("light");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
};

// Set current year in footer
const setCurrentYear = () => {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
};

// Handle window resize for mobile menu
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const nav = document.querySelector("nav ul");
    const menuToggle = document.querySelector(".menu-toggle");

    if (nav && menuToggle) {
      const icon = menuToggle.querySelector("i");
      nav.classList.remove("show");
      nav.style.maxHeight = "";
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  }
});

// Improved Navigation Active State Logic
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

  function updateActiveNavigation() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    // Check each section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    // Special case for very top of page
    if (window.scrollY < 100) {
      currentSection = "home";
    }

    // Update navigation links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      
      if (href === `#${currentSection}` || 
          (currentSection === "home" && (href === "#home" || href === "#"))) {
        link.classList.add("active");
      }
    });
  }

  // Initial call
  updateActiveNavigation();

  // Listen for scroll events with throttling
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavigation();
        ticking = false;
      });
      ticking = true;
    }
  });
});

// Navigation tooltip functionality for collapsed sidebar
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('nav ul li a[data-tooltip]');
  
  navLinks.forEach(link => {
    // Ensure tooltip shows only when sidebar is collapsed
    link.addEventListener('mouseenter', () => {
      const nav = document.querySelector('nav');
      if (nav && !nav.matches(':hover')) {
        // Sidebar is collapsed, show tooltip
        link.style.setProperty('--tooltip-visible', '1');
      }
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.setProperty('--tooltip-visible', '0');
    });
  });
});

// Handle sidebar logo visibility
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector('nav');
  const logo = document.querySelector('.logo');
  
  if (nav && logo) {
    nav.addEventListener('mouseenter', () => {
      logo.style.opacity = '1';
      logo.style.width = 'auto';
    });
    
    nav.addEventListener('mouseleave', () => {
      logo.style.opacity = '0';
      logo.style.width = '0';
    });
  }
});

// 1. Parallax Scrolling Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  // Parallax for hero section
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// 2. Mouse Cursor Trail Effect
const createCursorTrail = () => {
  const trail = [];
  const trailLength = 20;

  document.addEventListener("mousemove", (e) => {
    trail.push({ x: e.clientX, y: e.clientY });

    if (trail.length > trailLength) {
      trail.shift();
    }

    // Remove existing trail
    document.querySelectorAll(".cursor-trail").forEach((dot) => dot.remove());

    // Create new trail
    trail.forEach((point, index) => {
      const dot = document.createElement("div");
      dot.className = "cursor-trail";
      dot.style.left = point.x + "px";
      dot.style.top = point.y + "px";
      dot.style.opacity = index / trailLength;
      dot.style.transform = `scale(${index / trailLength})`;
      document.body.appendChild(dot);

      setTimeout(() => dot.remove(), 500);
    });
  });
};

// 3. Glitch Animation for Hero Text

const glitchText = (element, text) => {
  element.classList.add("glitch-text");
  element.setAttribute("data-text", text);
  element.textContent = text; // Set initial text
};

document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-content h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.classList.add("glitch-text");
    heroTitle.setAttribute("data-text", originalText);
    heroTitle.textContent = originalText;
  }
});

// 4. 3D Card Hover Effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });
});

// 5. Floating Particles Background
const createParticles = () => {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
};

// 6. Text Reveal Animation
const observeTextReveal = () => {
  const textElements = document.querySelectorAll("h1, h2, h3, p");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("text-reveal");
      }
    });
  });

  textElements.forEach((el) => observer.observe(el));
};

// 7. Interactive Skill Bars
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll(".skill-item");

  skillBars.forEach((skill, index) => {
    const percentage = Math.floor(Math.random() * 40) + 60; // Random skill level 60-100%

    const progressBar = document.createElement("div");
    progressBar.className = "skill-progress";
    progressBar.innerHTML = `
            <div class="skill-bar">
                <div class="skill-fill" style="width: 0%;" data-width="${percentage}%"></div>
            </div>
            <span class="skill-percentage">${percentage}%</span>
        `;

    skill.appendChild(progressBar);

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-fill");
          const width = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = width;
          }, index * 200);
        }
      });
    });

    observer.observe(skill);
  });
};

// Initialize extraordinary features
document.addEventListener("DOMContentLoaded", () => {
  createCursorTrail();
  createParticles();
  observeTextReveal();
  animateSkillBars();

  // Typing effect for hero title
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-content h1");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      glitchText(heroTitle, originalText, 80);
    }
  }, 1000);
});

// Custom Cursor Implementation
const createCustomCursor = () => {
  // Create cursor element
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  // Cursor movement
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Cursor hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .clickable, .project-card, .skill-item"
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
  });

  // Special effects for different sections
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      cursor.classList.add("gradient");
    });

    heroSection.addEventListener("mouseleave", () => {
      cursor.classList.remove("gradient");
    });
  }
};

// Magnetic Effect for Interactive Elements
const createMagneticEffect = () => {
  const magneticElements = document.querySelectorAll(
    ".btn, .project-card, .skill-item"
  );

  magneticElements.forEach((el) => {
    el.classList.add("magnetic");

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.1;
      const moveY = y * 0.1;

      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px)";
    });
  });
};

// Initialize cursor effects
document.addEventListener("DOMContentLoaded", () => {
  // Choose one of these cursor implementations:

  // Option 1: Custom cursor with trail
  createCustomCursor();
  //   createEnhancedCursorTrail();

  // Option 2: Just enhanced trail (comment out custom cursor if using this)
  // createEnhancedCursorTrail();

  // Always include magnetic effect
  createMagneticEffect();
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    cursor.style.opacity = "0";
  }
});

document.addEventListener("mouseenter", () => {
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    cursor.style.opacity = "1";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("welcome-overlay");
  const enterBtn = document.getElementById("enter-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const body = document.body;

  // Add overlay-active when overlay is shown
  if (overlay && overlay.style.display !== "none") {
    body.classList.add("overlay-active");
  }

  function hideOverlaySmoothly() {
    if (overlay) {
      overlay.classList.add("hide");
      setTimeout(() => {
        overlay.style.display = "none";
        body.classList.remove("overlay-active");
      }, 500); // Match the CSS transition duration
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", function () {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      hideOverlaySmoothly();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", hideOverlaySmoothly);
  }
});

// Remove duplicate scroll event listeners and consolidate
// (Remove the duplicate sections at the end of your file)

// Clean up - remove these duplicate sections from the end of your file:
/*
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  // ... duplicate code
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const titles = document.querySelectorAll(".page-titles .title");
  // ... duplicate code
});
*/
