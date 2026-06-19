'use strict';

// ==========================================
// 1. ELEMENT TOGGLE FUNCTION
// ==========================================
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// ==========================================
// 2. SIDEBAR TOGGLE LOGIC (MOBILE)
// ==========================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if(sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    let icon = this.querySelector("ion-icon");
    if(sidebar.classList.contains("active")){
      icon.setAttribute("name", "chevron-up");
    } else {
      icon.setAttribute("name", "chevron-down");
    }
  });
}

// ==========================================
// 3. PROJECTS FILTERING LOGIC (FIXED)
// ==========================================

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    select.classList.toggle("active");
  });
}

function filterProjects(category) {

  category = category.toLowerCase().trim();

  filterItems.forEach(item => {

    const itemCategory =
      item.dataset.category.toLowerCase().trim();

    if (category === "all" || itemCategory === category) {
      item.classList.add("active");
      item.style.display = "block";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
    }

  });
}

// Desktop Filter Buttons
filterBtn.forEach(btn => {

  btn.addEventListener("click", function () {

    const category = this.value;

    filterProjects(category);

    filterBtn.forEach(b => b.classList.remove("active"));

    this.classList.add("active");

    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

  });

});

// Mobile Dropdown Filter
selectItems.forEach(item => {

  item.addEventListener("click", function () {

    const category = this.value;

    filterProjects(category);

    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

    select.classList.remove("active");

  });

});

// Show all projects initially
filterProjects("all");

// ==========================================
// 4. CONTACT FORM VALIDATION
// ==========================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if(form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ==========================================
// 5. PAGE NAVIGATION VARIABLES & AUTO SCROLL
// ==========================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const scrollToActivePageTop = function () {
  const isMobileNav = window.matchMedia("(max-width: 1023px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile a menu click korle sidebar auto bondho hobe
  if (isMobileNav && sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    if(sidebarBtn) {
      sidebarBtn.setAttribute("aria-expanded", "false");
      let icon = sidebarBtn.querySelector("ion-icon");
      if(icon) icon.setAttribute("name", "chevron-down");
    }
  }

  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: isMobileNav && !reduceMotion ? "smooth" : "auto"
  });
}

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedTab = this.innerHTML.toLowerCase().trim(); 

    for (let j = 0; j < pages.length; j++) { 
      if (clickedTab === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        scrollToActivePageTop();
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

