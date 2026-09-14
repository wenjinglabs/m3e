const __init = () => {
  if (!document.querySelector("m3e-timepicker-toggle")) return;
  for (const toggle of document.querySelectorAll("m3e-timepicker-toggle")) {
    const picker = document.querySelector("#" + toggle.getAttribute("for"));
    const input = toggle.closest("m3e-form-field").querySelector("input");
    if (input) {
      input.value = toLocaleTimeString(picker.date, picker.showSeconds);
      picker.addEventListener("change", () => {
        input.value = toLocaleTimeString(picker.date, picker.showSeconds);
      });
    }
  }

  const blackoutTimes = document.querySelector("#blackout-times");
  if (blackoutTimes) blackoutTimes.blackoutTimes = (t) => t.hour < 8 || t.hour > 18;

  const inputEl = document.querySelector("#input");
  if (inputEl) {
    inputEl.addEventListener("change", (e) => {
      const picker = e.target;
      const out = document.querySelector("#inputValue");
      if (out) out.innerText = `hour = ${picker.hour ?? ""}, minute = ${picker.minute ?? ""}`;
    });
  }
};

function toLocaleTimeString(date, showSeconds) {
  return !date
    ? ""
    : date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: true,
      });
}

// ---- 页面初始化：首次加载与 ClientRouter 每次切页后各执行一次 ----
(() => {
  let inited = false;
  const run = () => {
    if (inited) return;
    inited = true;
    __init();
  };
  document.addEventListener("astro:before-swap", () => {
    inited = false;
  });
  document.addEventListener("astro:page-load", run);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
