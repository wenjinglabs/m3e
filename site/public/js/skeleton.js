const __init = () => {
  const toggle1 = document.querySelector("#toggle1");
  if (!toggle1) return;
  toggle1.addEventListener("change", (e) => {
    document.querySelector("#skeleton1").loaded = e.target.checked;
  });
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
