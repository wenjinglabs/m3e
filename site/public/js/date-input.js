const __init = () => {
  const blackoutDates = document.querySelector("#blackout-dates");
  const blackoutTimes = document.querySelector("#blackout-times");
  if (!blackoutDates || !blackoutTimes) return;
  blackoutDates.blackoutDates = (date) => isWeekend(date);
  blackoutTimes.blackoutTimes = (t) => t.hour < 8 || t.hour > 18;
};

function isWeekend(date) {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
}

function isHoliday(date) {
  const iso = date.toISOString().slice(0, 10);

  // --- Fixed-date holidays ---
  const fixed = new Set([
    "2026-01-01", // New Year's Day
    "2026-07-04", // Independence Day
    "2026-11-11", // Veterans Day
    "2026-12-25", // Christmas Day
  ]);

  if (fixed.has(iso)) return true;

  // --- Computed holidays for 2026 ---

  // Easter Sunday 2026
  if (iso === "2026-04-05") return true;

  // Thanksgiving (4th Thursday of November)
  if (iso === "2026-11-26") return true;

  // Memorial Day (last Monday of May)
  if (iso === "2026-05-25") return true;

  // Labor Day (first Monday of September)
  if (iso === "2026-09-07") return true;

  return false;
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
