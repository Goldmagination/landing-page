const elements = document.querySelectorAll("section");
const sections = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
elements.forEach((e) => {
  const sectionsElement = `<li class='menu__link ${e.className}' data-link=${e.id}><a href="#${e.id}">${e.dataset.nav}</li>`;
  sections.insertAdjacentHTML("beforeend", sectionsElement);
});
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
sections.addEventListener("click", Navigation);

function Navigation(e) {
  e.preventDefault();
  const parent = e.target.hasAttribute("data-link")
    ? e.target
    : e.target.parentElement;
  const elementToScrollTo = document.getElementById(parent.dataset.link);
  elementToScrollTo.scrollIntoView({ block: "end", behavior: "smooth" });
}

let callback = (entries) => {
  entries.forEach((entry) => {
    const sectionsElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`
    );
    const select = document.getElementById(entry.target.id);

    if (entry && entry.isIntersecting) {
      sectionsElement.classList.add("your-active-class");
      select.classList.add("your-active-class");
    } else {
      if (sectionsElement.classList.contains("your-active-class")) {
        sectionsElement.classList.remove("your-active-class");
      }

      if (select.classList.contains("your-active-class")) {
        select.classList.remove("your-active-class");
      }
    }
  });
};

let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);
elements.forEach((e) => {
  observer.observe(document.getElementById(e.id));
});
