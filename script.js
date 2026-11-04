const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const clockTime = document.querySelector("#clock-time");
const clockHands = {
  hour: document.querySelector(".clock-hand-hour"),
  minute: document.querySelector(".clock-hand-minute"),
  second: document.querySelector(".clock-hand-second"),
};

const updateClock = () => {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  clockHands.hour.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
  clockHands.minute.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  clockHands.second.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  clockTime.dateTime = now.toISOString();
  clockTime.textContent = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
};

updateClock();
setInterval(updateClock, 1000);



