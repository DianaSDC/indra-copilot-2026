const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

function createElement(attributes = {}) {
  const elementAttributes = new Map(Object.entries(attributes));
  const listeners = new Map();
  const classes = new Set();

  return {
    content: "",
    dateTime: "",
    dataset: {},
    style: {},
    textContent: "",
    setAttribute(name, value) {
      elementAttributes.set(name, value);
    },
    getAttribute(name) {
      return elementAttributes.get(name) ?? null;
    },
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    click() {
      listeners.get("click")?.();
    },
    classList: {
      add(name) {
        classes.add(name);
      },
      remove(name) {
        classes.delete(name);
      },
      contains(name) {
        return classes.has(name);
      },
      toggle(name, force) {
        const shouldAdd = force ?? !classes.has(name);
        if (shouldAdd) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
        return shouldAdd;
      },
    },
    querySelectorAll() {
      return [];
    },
  };
}

function runScript(savedTheme) {
  const menuToggle = createElement({ "aria-expanded": "false" });
  const siteNav = createElement();
  const themeToggle = createElement({ "aria-pressed": "false" });
  const themeColor = createElement();
  const year = createElement();
  const clockTime = createElement();
  const clockHands = {
    hour: createElement(),
    minute: createElement(),
    second: createElement(),
  };
  const navLink = createElement();
  siteNav.querySelectorAll = () => [navLink];

  const elements = {
    menuToggle,
    siteNav,
    themeToggle,
    themeColor,
    year,
    clockTime,
    clockHands,
    navLink,
  };
  const selectors = new Map([
    [".menu-toggle", menuToggle],
    [".site-nav", siteNav],
    [".theme-toggle", themeToggle],
    ['meta[name="theme-color"]', themeColor],
    ["#year", year],
    ["#clock-time", clockTime],
    [".clock-hand-hour", clockHands.hour],
    [".clock-hand-minute", clockHands.minute],
    [".clock-hand-second", clockHands.second],
  ]);
  const storedValues = new Map(
    savedTheme === undefined ? [] : [["bruma-theme", savedTheme]],
  );
  const intervals = [];
  const document = {
    documentElement: { dataset: {} },
    querySelector(selector) {
      const element = selectors.get(selector);
      assert.ok(element, `Selector no preparado en la prueba: ${selector}`);
      return element;
    },
  };

  vm.runInNewContext(script, {
    Date,
    Intl,
    console,
    document,
    localStorage: {
      getItem(key) {
        return storedValues.get(key) ?? null;
      },
      setItem(key, value) {
        storedValues.set(key, value);
      },
    },
    setInterval(callback, delay) {
      intervals.push({ callback, delay });
    },
  });

  return { elements, intervals, storedValues };
}

test("inicia en tema claro cuando no hay preferencia guardada", () => {
  const { elements } = runScript();

  assert.equal(elements.themeToggle.getAttribute("aria-pressed"), "false");
  assert.equal(
    elements.themeToggle.getAttribute("aria-label"),
    "Cambiar a tema oscuro",
  );
  assert.equal(elements.themeColor.content, "#f6f3ed");
});

test("restaura el tema guardado y persiste el cambio al pulsar", () => {
  const { elements, storedValues } = runScript("dark");

  assert.equal(elements.themeToggle.getAttribute("aria-pressed"), "true");
  assert.equal(elements.themeColor.content, "#20221e");

  elements.themeToggle.click();

  assert.equal(elements.themeToggle.getAttribute("aria-pressed"), "false");
  assert.equal(
    elements.themeToggle.getAttribute("aria-label"),
    "Cambiar a tema oscuro",
  );
  assert.equal(storedValues.get("bruma-theme"), "light");
});

test("abre el menú y lo cierra al seleccionar un enlace", () => {
  const { elements } = runScript();

  elements.menuToggle.click();
  assert.equal(elements.menuToggle.getAttribute("aria-expanded"), "true");
  assert.equal(elements.menuToggle.getAttribute("aria-label"), "Cerrar menú");
  assert.equal(elements.siteNav.classList.contains("is-open"), true);

  elements.navLink.click();
  assert.equal(elements.menuToggle.getAttribute("aria-expanded"), "false");
  assert.equal(elements.menuToggle.getAttribute("aria-label"), "Abrir menú");
  assert.equal(elements.siteNav.classList.contains("is-open"), false);
});

test("actualiza el año y el reloj, y programa su refresco", () => {
  const { elements, intervals } = runScript();

  assert.equal(elements.year.textContent, String(new Date().getFullYear()));
  assert.ok(Number.isFinite(Date.parse(elements.clockTime.dateTime)));
  assert.ok(elements.clockTime.textContent.length > 0);
  assert.match(elements.clockHands.hour.style.transform, /rotate\([\d.]+deg\)/);
  assert.match(elements.clockHands.minute.style.transform, /rotate\([\d.]+deg\)/);
  assert.match(elements.clockHands.second.style.transform, /rotate\([\d.]+deg\)/);
  assert.equal(intervals.length, 1);
  assert.equal(intervals[0].delay, 1000);
});
