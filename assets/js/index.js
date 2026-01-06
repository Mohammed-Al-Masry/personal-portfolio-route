let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");
const form = document.querySelector("#contact form");
const fields = form.querySelectorAll("input, textarea");
const userName = form.querySelector('input[type="text"]');
const email = form.querySelector('input[type="email"]');
const phone = form.querySelector('input[type="tel"]');
const message = form.querySelector("textarea");
const projectType = form.querySelector('.custom-select[data-name="project-type"] .selected-text');
const selects = document.querySelectorAll(".custom-select");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const carousel = document.getElementById("testimonials-carousel");
const slides = document.querySelectorAll(".testimonial-card");
const indicators = document.querySelectorAll(".carousel-indicator");
const scrollBtn = document.getElementById("scroll-to-top");
const tabs = document.querySelectorAll(".portfolio-filter");
const contents = document.querySelectorAll(".portfolio-item");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");
const fontOptions = document.querySelectorAll(".font-option");
const themeColorsGrid = document.getElementById("theme-colors-grid");
const resetBtn = document.getElementById("reset-settings");
const toggleBtn = document.getElementById("theme-toggle-button");
const html = document.documentElement;

// activate the nav tabs transition while scrolling 
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document.querySelector(`nav a[href*="${id}"]`).classList.add("active");
      });
    }
  });
};

// setting thw dark/white mode
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

// toggle between the dar/white mode
toggleBtn.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// opening setting sidebar by clicking the gear icon
settingsToggle.addEventListener("click", () => {
  settingsSidebar.classList.remove("translate-x-full");
  settingsToggle.style.right = "20rem";
});

// closing setting sidebar by close button
closeSettings.addEventListener("click", () => {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0";
});

// closing setting sidebar by clicking out the bar
document.addEventListener("click", (e) => {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsToggle.contains(e.target)
  ) {
    settingsSidebar.classList.add("translate-x-full");
    settingsToggle.style.right = "0";
  }
});

// change the active font button
fontOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedFont = btn.dataset.font;
    fontOptions.forEach((font) => {
      if (font.dataset.font === selectedFont) {
        font.classList.add(
          "active",
          "border-primary",
          "bg-slate-50",
          "dark:bg-slate-800"
        );
        font.classList.remove("border-slate-200", "dark:border-slate-700");
      } else {
        font.classList.remove(
          "active",
          "border-primary",
          "bg-slate-50",
          "dark:bg-slate-800"
        );
        font.classList.add("border-slate-200", "dark:border-slate-700");
      }
    });

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo"
    );

    document.body.classList.add(`font-${selectedFont}`);

    localStorage.setItem("selectedFont", selectedFont);
  });
});

const savedFont = localStorage.getItem("selectedFont");
if (savedFont) {
  const btn = document.querySelector(`.font-option[data-font="${savedFont}"]`);
  if (btn) btn.click();
}

// setting the colour options
const gradients = [
  {
    title: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    bg: " linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246))",
  },
  {
    title: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    bg: " linear-gradient(135deg, rgb(236, 72, 153), rgb(249, 115, 22))",
  },
  {
    title: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    bg: "linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))",
  },
  {
    title: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    bg: " linear-gradient(135deg, rgb(59, 130, 246), rgb(6, 182, 212))",
  },
  {
    title: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    bg: " linear-gradient(135deg, rgb(239, 68, 68), rgb(244, 63, 94))",
  },
  {
    title: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    bg: " linear-gradient(135deg, rgb(245, 158, 11), rgb(234, 88, 12))",
  },
];

gradients.forEach(({ title, primary, secondary, bg }) => {
  themeColorsGrid.innerHTML += `
    <button class="color-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
      title="${title}" 
      data-primary="${primary}" 
      data-secondary="${secondary}" 
      style="background: ${bg}">
      </button>
    `;
});
const colorBtns = document.querySelectorAll(".color-btn");


// change the active colour
function setActiveColor(btn) {
  colorBtns.forEach((b) => {
    b.style.boxShadow = "none";
    b.style.transform = "scale(1)";
    b.style.transition = "none";
  });
  btn.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
  btn.style.boxShadow = `0 0 0 2px ${btn.dataset.primary}`;
  btn.style.transform = "scale(1.1)";

  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 200);

  const primary = btn.dataset.primary;
  const secondary = btn.dataset.secondary;
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);

  localStorage.setItem("selectedColorBtn", primary);
  localStorage.setItem("primaryColor", primary);
  localStorage.setItem("secondaryColor", secondary);
};

// change colour button
colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => setActiveColor(btn));
});

const savedPrimary = localStorage.getItem("selectedColorBtn");
if (savedPrimary) {
  const btn = document.querySelector(
    `.color-btn[data-primary="${savedPrimary}"]`
  );
  if (btn) setActiveColor(btn);
}

// back to default colour and font "reset button"
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("selectedFont");
  localStorage.removeItem("primaryColor");
  localStorage.removeItem("secondaryColor");
  localStorage.removeItem("selectedColorBtn");

  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo"
  );

  document.documentElement.style.removeProperty("--color-primary");
  document.documentElement.style.removeProperty("--color-secondary");

  
  fontOptions.forEach((b) => {
    b.classList.remove("active");
  });
  const defaultFontBtn = document.querySelector(
    `.font-option[data-font="tajawal"]`
  );
  if (defaultFontBtn) defaultFontBtn.click();

  const defaultColorBtn = document.querySelector(
    '.color-btn[data-primary="#6366f1"]'
  );
  if (defaultColorBtn) defaultColorBtn.click();
});

// navigate with the tabs
contents.forEach((content) => {
  content.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const filter = tab.getAttribute("data-filter");

    tabs.forEach((tab) => {
      tab.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "shadow-lg",
        "shadow-primary/50"
      );
      tab.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700"
      );
    });

    tab.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
    tab.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50"
    );

    contents.forEach((content) => {
      content.style.opacity = "0";
      content.style.transform = "scale(0.8)";
    });

    setTimeout(() => {
      contents.forEach((content) => {
        const category = content.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });

      setTimeout(() => {
        contents.forEach((content) => {
          const category = content.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            content.style.opacity = "1";
            content.style.transform = "scale(1)";
          }
        });
      }, 50);
    }, 300);
  });
});


// activate the "scroll the top" button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
  });
});

// translate carousel slides with the indicators
let currentTranslateX = 0;

let lastActiveIndicator = indicators[0];
IndicatorActiveTestimonial(lastActiveIndicator);
const maxTranslate = (slides.length - 3) * 33.33;

function IndicatorActiveTestimonial(indicator) {
  lastActiveIndicator.classList.remove("active", "bg-accent", "scale-125");
  lastActiveIndicator.classList.add("bg-slate-400", "dark:bg-slate-600");

  lastActiveIndicator = indicator;

  let index = indicator.getAttribute("data-index");

  if (index >= indicators.length) index = 0;

  indicators[index].classList.add("active", "bg-accent", "scale-125");
  indicators[index].classList.remove("bg-slate-400", "dark:bg-slate-600");

  carousel.style.setProperty("transform", `translateX(${index * 33.33}%)`);

  currentTranslateX = index * 33.33;
}

nextBtn.addEventListener("click", () => {
  currentTranslateX += 33.33;

  if (currentTranslateX > maxTranslate) {
    currentTranslateX = 0;
  }

  carousel.style.setProperty("transform", `translateX(-${currentTranslateX}%)`);

  IndicatorActiveTestimonial(indicators[Math.round(currentTranslateX / 33.33)]);
});
prevBtn.addEventListener("click", () => {
  currentTranslateX -= 33.33;

  if (currentTranslateX < 0) {
    currentTranslateX = maxTranslate;
  }

  carousel.style.setProperty("transform", `translateX(${currentTranslateX}%)`);

  IndicatorActiveTestimonial(indicators[Math.round(currentTranslateX / 33.33)]);
});

indicators.forEach((ind) =>
  ind.addEventListener("click", () => IndicatorActiveTestimonial(ind))
);

// hide and unhide the "testimonials cards"
selects.forEach((select) => {
  const selectedText = select.querySelector(".selected-text");
  const arrow = select.querySelector(".fa-chevron-down");
  const optionsMenu = select.nextElementSibling;
  const options = optionsMenu.querySelectorAll(".custom-option");

  select.addEventListener("click", function (e) {
    e.stopPropagation();

    document.querySelectorAll(".custom-options").forEach((menu) => {
      if (menu !== optionsMenu) menu.classList.add("hidden");
    });

    optionsMenu.classList.toggle("hidden");

    arrow.style.transform = optionsMenu.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });

  options.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();

      const value = option.getAttribute("data-value");
      selectedText.textContent = value;

      selectedText.classList.remove(
        "text-slate-400",
        "text-slate-500",
        "dark:text-slate-400"
      );
      selectedText.classList.add("text-slate-800", "dark:text-white");

      options.forEach((o) => o.classList.remove("bg-primary/10"));
      option.classList.add("bg-primary/10");

      optionsMenu.classList.add("hidden");
      arrow.style.transform = "rotate(0deg)";
    });
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".custom-options").forEach((menu) => {
    menu.classList.add("hidden");
  });

  document.querySelectorAll(".fa-chevron-down").forEach((icon) => {
    icon.style.transform = "rotate(0deg)";
  });
});


// contact form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // error message catch
  form.querySelectorAll(".error-message").forEach((m) => m.remove());
  form
    .querySelectorAll(".border-red-500")
    .forEach((m) => m.classList.remove("border-red-500"));

  // error message "name"
  if (!userName.value.trim()) {
    showError(userName, "يرجى إدخال الاسم الكامل");
    isValid = false;
  }
  // validation "email"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // error message "email"
  if (!email.value.trim()) {
    showError(email, "يرجى إدخال البريد الإلكتروني");
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    showError(email, "يرجى إدخال بريد إلكتروني صحيح");
    isValid = false;
  }

  // validation "phone"
  if (
    phone.value.trim() &&
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      phone.value.replace(/\s/g, "")
    )
  ) {
    // error message phone
    showError(phone, "يرجى إدخال رقم هاتف صحيح");
    isValid = false;
  }

  // error message "type of project"
  if (projectType.classList.contains("text-slate-400")) {
    const wrapper = projectType.closest(".custom-select-wrapper");
    wrapper.querySelector(".custom-select").classList.add("border-red-500");
    showError(wrapper, "يرجى اختيار نوع المشروع");
    isValid = false;
  }

  // error message "writing message"
  if (!message.value.trim()) {
    showError(message, "يرجى إدخال تفاصيل المشروع");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError(message, "يرجى إدخال المزيد من التفاصيل");
    isValid = false;
  }

  if (isValid) {
    showSuccessPopup();
    form.reset();

    form.querySelectorAll(".selected-text").forEach((m) => {
      m.classList.add("text-slate-500", "dark:text-slate-400");
      m.classList.remove("text-slate-800", "dark:text-white");
    });

    form.querySelector(
      '.custom-select[data-name="project-type"] .selected-text'
    ).textContent = "اختر نوع المشروع";

    form.querySelector(
      '.custom-select[data-name="budget"] .selected-text'
    ).textContent = "اختر الميزانية";
  }
});

fields.forEach((el) => {
  el.addEventListener("input", function () {
    this.classList.remove("border-red-500");
    const err = this.parentElement.querySelector(".error-message");
    if (err) err.remove();
  });
});

function showError(el, msg) {
  const p = document.createElement("p");
  p.className = "error-message text-red-400 text-sm mt-1";
  p.textContent = msg;

  if (el.classList.contains("custom-select-wrapper")) {
    el.appendChild(p);
  } else {
    el.classList.add("border-red-500");
    el.parentElement.appendChild(p);
  }
}

// send success message
function showSuccessPopup() {
  const box = document.createElement("div");
  box.className =
    "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";

  box.innerHTML = `
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold">
          حسناً
        </button>
      </div>
    `;

  document.body.appendChild(box);

  box.querySelector(".success-popup-close").addEventListener("click", () => {
    box.remove();
  });

  setTimeout(() => box.remove(), 5000);
}
