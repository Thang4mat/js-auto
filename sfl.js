// ==UserScript==
// @name         SFL
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  SFL auto.
// @author       You
// @match        https://sunflower-land.com/play/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sunflower-land.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Thang4mat/js-auto/refs/heads/main/sfl.js
// @downloadURL  https://raw.githubusercontent.com/Thang4mat/js-auto/refs/heads/main/sfl.js
// ==/UserScript==

(function () {
  // ===== Guard: chỉ chạy trên đúng trang =====
  const ALLOWED_HOST = "sunflower-land.com";
  const ALLOWED_PATH = "/play/";

  if (location.hostname !== ALLOWED_HOST || location.pathname !== ALLOWED_PATH) {
    console.log("SFL script bỏ qua: không đúng trang (" + location.href + ")");
    return;
  }

  // ===== Dữ liệu =====
  const SEEDS = [
    "https://sunflower-land.com/game-assets/crops/sunflower/plant.png",
    "https://sunflower-land.com/game-assets/crops/potato/plant.png",
    "https://sunflower-land.com/game-assets/crops/zucchini/plant.png",
    "https://sunflower-land.com/game-assets/crops/beetroot/plant.png",
    "https://sunflower-land.com/game-assets/crops/pepper/plant.png",
    "https://sunflower-land.com/game-assets/crops/cauliflower/plant.png",
    "https://sunflower-land.com/game-assets/crops/rhubarb/plant.png",
    "https://sunflower-land.com/game-assets/crops/pumpkin/plant.png",
    "https://sunflower-land.com/game-assets/crops/carrot/plant.png",
    "https://sunflower-land.com/game-assets/crops/yam/plant.png",
    "https://sunflower-land.com/game-assets/crops/cabbage/plant.png",
    "https://sunflower-land.com/game-assets/crops/brocolli/plant.png",
    "https://sunflower-land.com/game-assets/crops/soybean/plant.png",
    "https://sunflower-land.com/game-assets/crops/parsnip/plant.png",
    "https://sunflower-land.com/game-assets/crops/eggplant/plant.png",
    "https://sunflower-land.com/game-assets/crops/radish/plant.png",
    "https://sunflower-land.com/game-assets/crops/wheat/plant.png",
    "https://sunflower-land.com/game-assets/crops/corn/plant.png",
    "https://sunflower-land.com/game-assets/crops/onion/plant.png",
    "https://sunflower-land.com/game-assets/crops/turnip/plant.png",
    "https://sunflower-land.com/game-assets/crops/kale/plant.png",
    "https://sunflower-land.com/game-assets/crops/artichoke/plant.png",
    "https://sunflower-land.com/game-assets/crops/barley/plant.png",
    "https://sunflower-land.com/game-assets/crops/soil2.png",
  ];
    const FERTILIZE = [
    "https://sunflower-land.com/game-assets/crops/sunflower/seedling.png",
    "https://sunflower-land.com/game-assets/crops/potato/seedling.png",
    "https://sunflower-land.com/game-assets/crops/zucchini/seedling.png",
    "https://sunflower-land.com/game-assets/crops/beetroot/seedling.png",
    "https://sunflower-land.com/game-assets/crops/pepper/seedling.png",
    "https://sunflower-land.com/game-assets/crops/cauliflower/seedling.png",
    "https://sunflower-land.com/game-assets/crops/rhubarb/seedling.png",
    "https://sunflower-land.com/game-assets/crops/pumpkin/seedling.png",
    "https://sunflower-land.com/game-assets/crops/carrot/seedling.png",
    "https://sunflower-land.com/game-assets/crops/yam/seedling.png",
    "https://sunflower-land.com/game-assets/crops/cabbage/seedling.png",
    "https://sunflower-land.com/game-assets/crops/brocolli/seedling.png",
    "https://sunflower-land.com/game-assets/crops/soybean/seedling.png",
    "https://sunflower-land.com/game-assets/crops/parsnip/seedling.png",
    "https://sunflower-land.com/game-assets/crops/eggplant/seedling.png",
    "https://sunflower-land.com/game-assets/crops/radish/seedling.png",
    "https://sunflower-land.com/game-assets/crops/wheat/seedling.png",
    "https://sunflower-land.com/game-assets/crops/corn/seedling.png",
    "https://sunflower-land.com/game-assets/crops/onion/seedling.png",
    "https://sunflower-land.com/game-assets/crops/turnip/seedling.png",
    "https://sunflower-land.com/game-assets/crops/kale/seedling.png",
    "https://sunflower-land.com/game-assets/crops/artichoke/seedling.png",
    "https://sunflower-land.com/game-assets/crops/barley/seedling.png",
  ];
    const FERTILIZED = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAMAAACn6Q83AAAABGdBTUEAALGOfPtRkwAAACFQTFRFAAAAwMvcWmmIGBQl////JlxCY8dNJitEeMVop/+Ukv96pgoFnAAAAAt0Uk5TAP////////////99dn3VAAAAOElEQVQImVXMMQ4AMAgCQBck8f8PLqIdZLoEQoRCxoaZ/Koat8Yjm7URgQZwqFPXvGc9cX2ptZcPwv4Cs0IVRlAAAAAASUVORK5CYII=",
    ];
  // ===== Danh sách chỉ click khi bấm nút thủ công =====
  // Thêm nhóm mới: thêm 1 dòng vào mảng này, mọi logic/nút bên dưới tự chạy theo.
  const MANUAL_GROUPS = [
    {
      key: "GOLD",
      color: "#ffbf00",
      srcs: ["https://sunflower-land.com/game-assets/resources/gold_small.png"],
    },
    {
      key: "IRON",
      color: "#a9a9a9",
      srcs: ["https://sunflower-land.com/game-assets/resources/iron_small.png"],
    },
    {
      key: "FRUIT",
      color: "#ee4b2b",
      srcs: ["https://sunflower-land.com/game-assets/fruit/bush_shrub.png",
            "https://sunflower-land.com/game-assets/fruit/dead_tree.webp",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAjCAYAAABsFtHvAAAAAXNSR0IArs4c6QAAA2dJREFUWIWtlkFLG1EQx/8r0aWQQlpIFSFqpHoytPWSFpoUhFbxVHr20K/QS3vxC1gPXj1LPoM0HgImhSQ9BMJ6CElxg7mkXVpDFUpUmh7WeTv79u1uog4Esu/tzO8/82ZeosHHsltrA/5c/PRF83v3phbxgy5kxwEAaSzbG1sYBImQxZIFiXZtZLfWBgTtmedifTWZBQBUUUOreOkJuLixMkitDxBLRoXYKmoAgFbx0leEJgewOjriiT5iySgAO/O8WcRqMou8WQQAWB1dBFvcWBlMpSaEDxcNQKxxHxfcD8yNApB1jQsAwFRqAgAQT/RhdXQsZMdd2ZMf7XMBY6Tc2NcQT/Q9JVc9cygZAQhKVYslo2I9nui7eiPCg1kdiJdkoCpruQJWR4fVsc+4hSrz1kVcbqLsQVmRo9XRBeysfSX27s9FXH4EkY9PblblGNBRbGTTYi1vFgWcg7kAajwCU/X8pmVMBU6tD8Sc582iAMuZqp75e7Fk1DUlVBU6d995VammNWPfWzCetd+4ymPnmXNypszJmQug8nMgz5aPFz/3VvHSJdBzvZJTz3QcedaA3eG2UAfMIfZ3uhccv3jCPZIRytruVHcWqnHjYyZDe+a5c0zJGhNAcCd+17hwNxy/aGQogevTbdSn2+LcSWAay57mIogsngR5up1A/ENBGtuz0J8/BAA03v1xCaiihipqiCWjgQK4ueDy5dI1LsSnsT0LlA30K7+hf3gFAMoKUAL8uZkraPwm7BoXaOYK2pi8yaHNXEFr5gpafboNAA6YRFxXgarTM8+VvwOcQXEBdrc3cwUN19csbbqsbHgjvkihXjnEE2MOgO7pF1uUk5Qc1zVqSiiAe5+Ptb8fMVBl7YXRGeuefdk8DTeK9XcOsVmZxOnBSUbVVLzEKhvqT2H80eOXAHDy/l+Jr/96+hYAsLNbxl7Dyjx4M1Oipg0DA4o/kCoo2WZlEq+fTToL1WPX+6cHJxlgpnTV6+Ps249MSE7+cBk8rNkCnBjWz+9f/d5VnnkQeCk9P5KYoFiezMMyPqoeewQspeeB3XJpr2GFljoQPowdSWcdZn7lv9Wo3dZGggeVddSSA4o5v2mXh5mq7MpL4K4F+I2b7w10VwKC5jzw+rutgCBwKPymIsKgI8GHFTEslOw/cNcyyfgTT8gAAAAASUVORK5CYII=",
            "data:image/webp;base64,UklGRi4BAABXRUJQVlA4TCIBAAAvEUAHEF9gJAASXkAk2bzgawe4gEneMBTZxv+4uhoFtBVAFsJRG0lqgy+CIaVBuiY1ikWQbVOx0R/sAYD/f0ZW5rOLTjOlNCP63IZc2y6Ao+1/2ub3+ME1W8p+/uVOeACD5MJEkuID2LpAmcl2aMuoW5TpeHXvENH/CQDAbDSGRfqP1HZoI2QQve08hdCsbA2VjbBQ7G3IbaCnNBdvQ9y3hkIV6tlvPw9Lobn0v3477UhybZ+fdSaecyHT+7P691eUGYeoPq/4UXczVOy8K/SVn3NdZrw49cNcsXJbciDn9cQDs4EwryaeMxtAyD6vtgFg1Zx38XfPDPyGUJoVC0BATM6TBRAZJogQEBmzS2QFRCOz0kQjIrJAzUDQYAEIiMgCAA==",
            "data:image/webp;base64,UklGRi4BAABXRUJQVlA4TCIBAAAvEUAHEF9gJJKUV5/g5zUKh0NTi86UoIaaSLaan9pExgAVHtBKhSIEKW0kBTpehcOhUfRfFiWcEAgkgW2/WADAbUuZQ13NNCtsvNv0l/Ra/8JzAMfZ/vTNZwXH/y9JO/Nu6efAWMn+FVbDRYJlhgMwTOgrRL2fDxHRfwFBEWsAcA1FOvUBQLOOrqYZNrFbDIPUbJTJ55EYaBZ+PDA1rC04GTt5wOH/0EqUk/bh+x7bZFx7bSGToTOpdulleRSs6x++u9cjezPaPHznwwczfti8XLhba9NRG0E2g8RZWycTxnvOAJZlebRdA3Qwr0c1ANCbhw8AgLV83y7s5NwsaJdXFYCK2K2SAogy94hQEeXcJVIV0VdeLdEXESlQGVAVFMoVAA==",
            "https://sunflower-land.com/game-assets/fruit/orange/orange_tree.png",
            "https://sunflower-land.com/game-assets/fruit/apple/apple_tree.png",]
    },
    {
      key: "TREES",
      color: "#a52a2a",
      srcs: ["https://sunflower-land.com/game-assets/resources/tree/Desert/summer_desert_tree.webp",
            "https://sunflower-land.com/game-assets/resources/tree/Desert/autumn_desert_tree.webp",
            "https://sunflower-land.com/game-assets/resources/tree/Desert/winter_desert_tree.webp",],
    },
    {
      key: "FERTILIZE",
      color: "#FFBF00",
      srcs: FERTILIZE,
      filter: (img) => isFertilizeEligible(img),
    },
    {
      key: "CROPS",
      color: "#16a34a",
      srcs: SEEDS,
    },

    // Thêm nhóm mới tại đây, ví dụ:
    // {
    //   key: "FRUIT",
    //   color: "#db2777",
    //   srcs: ["https://sunflower-land.com/game-assets/..."],
    // },
  ];

  const CLOSE_DIV_CLASS = "mb-1 w-full flex justify-center";
  const CLOSE_DIV_TEXT = "Close";
  const CONTAINER_SELECTOR = "div.w-full.h-full.relative";
  // Mỗi ô đất (plot) được bọc trong 1 div cùng class với CONTAINER_SELECTOR
  // (dùng chung vì trùng class thật trên trang), bên trong có thể chứa 1 div
  // chỉ báo trạng thái (ví dụ: đã bón phân) theo FERTILIZE_INDICATOR_SELECTOR.
  const FERTILIZE_INDICATOR_SELECTOR = "div.absolute.z-20.pointer-events-none.flex";
  const TARGET_FERTILIZED = new Set(FERTILIZED);

  // Khoảng delay giữa mỗi click. Đã xác nhận thực tế trên trang này: 50-100ms
  // không gây bỏ sót phần tử (nhờ findAllMatches() quét lại toàn bộ DOM mỗi lần,
  // không khóa theo dataset). Nếu sau này đổi sang cơ chế khác hoặc thấy bỏ sót
  // trở lại, cân nhắc tăng lên 1000-2000ms như đã kiểm chứng ở lần test trước.
  const CLICK_DELAY_MIN_MS = 50;
  const CLICK_DELAY_MAX_MS = 100;

  MANUAL_GROUPS.forEach((g) => {
    g.targetSet = new Set(g.srcs);
    console.log(`${g.key}: ${g.srcs.length} -> unique ${g.targetSet.size}`);
  });

  function isMatchCloseDiv(el) {
    return (
      el.tagName === "DIV" &&
      el.className === CLOSE_DIV_CLASS &&
      el.textContent.trim() === CLOSE_DIV_TEXT
    );
  }

  function isMatch(el) {
    return isMatchCloseDiv(el);
  }

  // Điều kiện riêng cho nhóm FERTILIZE: chỉ click ô đất (seedling) khi ô đó
  // CHƯA có chỉ báo "đã bón phân". Tương đương:
  //   - plot không chứa div chỉ báo -> được click
  //   - plot có chứa div chỉ báo, nhưng div đó không chứa img thuộc FERTILIZED -> được click
  //   - plot có chứa div chỉ báo VÀ div đó chứa img thuộc FERTILIZED -> bỏ qua (đã bón phân rồi)
  function isFertilizeEligible(img) {
    const plot = img.closest(CONTAINER_SELECTOR);
    if (!plot) return true; // không xác định được plot -> không chặn, vẫn cho click

    const indicator = plot.querySelector(FERTILIZE_INDICATOR_SELECTOR);
    if (!indicator) return true; // plot không chứa div chỉ báo -> được click

    const alreadyFertilized = [...indicator.querySelectorAll("img")].some((el) =>
      TARGET_FERTILIZED.has(el.getAttribute("src"))
    );
    return !alreadyFertilized;
  }

  function getContainer() {
    return document.querySelector(CONTAINER_SELECTOR) || document;
  }

  function randomDelay(minMs = CLICK_DELAY_MIN_MS, maxMs = CLICK_DELAY_MAX_MS) {
    return minMs + Math.random() * (maxMs - minMs);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function logClick(prefix, el) {
    console.log(prefix, el.tagName === "IMG" ? el.getAttribute("src")?.slice(0, 40) : el.textContent.trim());
  }

  // Quét live DOM, trả về TOÀN BỘ phần tử đang khớp tại thời điểm gọi.
  // Không đánh dấu, không khóa node nào (tránh bỏ sót do trạng thái trung gian).
  function findAllMatches() {
    return [...getContainer().querySelectorAll("div")].filter(isMatch);
  }

  // ===== Vòng auto-click liên tục (Close div) =====
  let autoBusy = false;
  let autoPendingRerun = false;

  async function runAutoCycle() {
    if (autoBusy) {
      // Có mutation xảy ra trong lúc đang chạy -> không bỏ qua,
      // mà đánh dấu để chạy thêm 1 vòng quét nữa ngay sau khi vòng hiện tại xong.
      autoPendingRerun = true;
      return;
    }
    autoBusy = true;
    do {
      autoPendingRerun = false;
      for (const el of findAllMatches()) {
        if (!el.isConnected) continue;
        el.click();
        logClick("Đã click (auto):", el);
        await sleep(randomDelay());
      }
    } while (autoPendingRerun); // có mutation mới xảy ra trong lúc xử lý -> quét lại ngay
    autoBusy = false;
  }

  runAutoCycle();

  const observer = new MutationObserver(() => runAutoCycle());
  observer.observe(getContainer(), {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "src"],
    characterData: true,
  });

  // ===== Click thủ công dùng chung cho mọi nhóm trong MANUAL_GROUPS =====
  function setButtonState(btn, running, label) {
    if (!btn) return;
    btn.textContent = running ? "Đang click..." : label;
    btn.disabled = running;
    btn.style.opacity = running ? "0.6" : "1";
  }

  async function runManualClick(group) {
    if (group.busy) {
      console.log(`${group.key}: đang chạy, bỏ qua lần bấm này.`);
      return;
    }
    group.busy = true;
    setButtonState(group.button, true, group.key);

    let targets = [...getContainer().querySelectorAll("img")].filter(
      (el) => group.targetSet.has(el.getAttribute("src"))
    );
    if (typeof group.filter === "function") {
      targets = targets.filter(group.filter);
    }
    console.log(`${group.key}: tìm thấy ${targets.length} ảnh khớp.`);

    for (const el of targets) {
      if (!el.isConnected) continue;
      el.click();
      logClick(`Đã click (${group.key}):`, el);
      await sleep(randomDelay());
    }

    group.busy = false;
    setButtonState(group.button, false, group.key);
  }

  // ===== Panel chứa các nút thủ công, mặc định ẩn =====
  const panel = document.createElement("div");
  Object.assign(panel.style, {
    position: "fixed",
    bottom: "270px",
    left: "20px",
    zIndex: "2147483647",
    display: "none", // ẩn mặc định, nút tổng sẽ bật/tắt
    flexDirection: "column",
    gap: "8px",
  });
  document.body.appendChild(panel);

  function makeChildButton(label, color) {
    const btn = document.createElement("button");
    btn.textContent = label;
    Object.assign(btn.style, {
      padding: "10px 16px",
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontFamily: "sans-serif",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    });
    panel.appendChild(btn);
    return btn;
  }

  // Tự tạo 1 nút cho mỗi nhóm trong MANUAL_GROUPS, gắn vào panel
  MANUAL_GROUPS.forEach((group) => {
    group.busy = false;
    group.button = makeChildButton(group.key, group.color);
    group.button.addEventListener("click", () => runManualClick(group));
  });

  // ===== Nút tổng: chỉ bật/tắt panel =====
  const masterButton = document.createElement("button");
  masterButton.textContent = "Menu";
  Object.assign(masterButton.style, {
    position: "fixed",
    bottom: "220px",
    left: "20px",
    zIndex: "2147483647",
    padding: "10px 16px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  });
  masterButton.addEventListener("click", () => {
    const isHidden = panel.style.display === "none";
    panel.style.display = isHidden ? "flex" : "none";
  });
  document.body.appendChild(masterButton);
})();