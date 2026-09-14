const __init = () => {
  const example1 = document.querySelector("#example1");
  if (!example1) return;

  example1.addEventListener("click", () => {
    M3eSnackbar.open("File deleted");
  });

  const example2 = document.querySelector("#example2");
  example2.addEventListener("click", () => {
    M3eSnackbar.open("File deleted", "Undo", {
      actionCallback: () => {
        // Undo logic here
      },
    });
  });

  const example3 = document.querySelector("#example3");
  example3.addEventListener("click", () => {
    M3eSnackbar.open("File deleted", true);
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
