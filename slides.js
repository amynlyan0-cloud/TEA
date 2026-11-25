(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const currentLabel = document.querySelector(".current-slide");
  const totalLabel = document.querySelector(".total-slides");
  const progress = document.querySelector(".progress-track");
  const progressFill = document.querySelector(".progress-fill");
  const previousButton = document.querySelector(".previous-button");
  const nextButton = document.querySelector(".next-button");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeLabel = document.querySelector(".theme-label");

  if (!slides.length) return;

  let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
  totalLabel.textContent = String(slides.length).padStart(2, "0");
  progress.setAttribute("aria-valuemax", String(slides.length));

  function showSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides[currentIndex].scrollTop = 0;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if (isActive) history.replaceState(null, "", `#${slide.id}`);
    });

    const displayedIndex = currentIndex + 1;
    currentLabel.textContent = String(displayedIndex).padStart(2, "0");
    progress.setAttribute("aria-valuenow", String(displayedIndex));
    progressFill.style.width = `${(displayedIndex / slides.length) * 100}%`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
  }

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof HTMLElement && event.target.closest("button, a, video, input, textarea, select")) return;

    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      showSlide(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }
  });

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme !== "dark";
    document.body.dataset.theme = isDark ? "dark" : "light";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeLabel.textContent = isDark ? "المظهر الفاتح" : "المظهر الداكن";
    themeToggle.setAttribute("aria-label", isDark ? "التبديل إلى المظهر الفاتح" : "التبديل إلى المظهر الداكن");
  });

  showSlide(currentIndex);
})();
