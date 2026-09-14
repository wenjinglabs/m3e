const __init = () => {
  const shapeNames = [
    "4-leaf-clover",
    "4-sided-cookie",
    "6-sided-cookie",
    "7-sided-cookie",
    "8-leaf-clover",
    "9-sided-cookie",
    "12-sided-cookie",
    "arch",
    "arrow",
    "boom",
    "bun",
    "burst",
    "circle",
    "diamond",
    "fan",
    "flower",
    "gem",
    "ghost-ish",
    "heart",
    "hexagon",
    "oval",
    "pentagon",
    "pill",
    "pixel-circle",
    "pixel-triangle",
    "puffy",
    "puffy-diamond",
    "semicircle",
    "slanted",
    "soft-boom",
    "soft-burst",
    "square",
    "sunny",
    "triangle",
    "very-sunny",
  ];

  const shapeEl = document.querySelector("#morph");
  if (!shapeEl) return;
  let index = 0;

  function updateShape() {
    shapeEl.setAttribute("name", shapeNames[index]);
    index = (index + 1) % shapeNames.length;
  }

  updateShape();
  // 避免切页后旧定时器叠加（每次进入本页只保留一个）
  if (window.__m3eShapeTimer) clearInterval(window.__m3eShapeTimer);
  window.__m3eShapeTimer = setInterval(updateShape, 1000);
};

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
