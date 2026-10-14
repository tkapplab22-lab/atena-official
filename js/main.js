/* =========================================================
   ATENA! OFFICIAL WEBSITE
   Main JavaScript
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {

    const closeMenu = () => {
      menuToggle.classList.remove("is-open");
      siteNav.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");
    };

    const openMenu = () => {
      menuToggle.classList.add("is-open");
      siteNav.classList.add("is-open");

      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "メニューを閉じる");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !menuToggle.contains(event.target) &&
        !siteNav.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });

  }


  /* =======================================================
     02. PERK SYSTEM
     ======================================================= */

  const perks = [
    {
      name: "PARITY",
      type: "ATTACK PERK",
      tagline: "偶奇を見抜け。",
      description: "相手の秘密コードから任意の位置を1つ指定し、その数字が偶数か奇数かを知ることができる。",
      image: "images/perks/PARITY.png",
      theme: "parity"
    },
    {
      name: "SUM",
      type: "ATTACK PERK",
      tagline: "数字の和を暴け。",
      description: "相手の秘密コードから任意の2つの位置を指定し、その数字の合計を知ることができる。",
      image: "images/perks/SUM.png",
      theme: "sum"
    },
    {
      name: "ORDER",
      type: "ATTACK PERK",
      tagline: "大小を見極めろ。",
      description: "相手の秘密コードから任意の2つの位置を指定し、どちらの数字が大きいかを知ることができる。",
      image: "images/perks/ORDER.png",
      theme: "order"
    },
    {
      name: "MASK",
      type: "DEFENSE / SPECIAL PERK",
      tagline: "真実を覆い隠せ。",
      description: "相手の次のCALL結果を、LOCK・LINKの内訳ではなく「N MATCH」として表示する。",
      image: "images/perks/MASK.png",
      theme: "mask"
    },
    {
      name: "SHUFFLE",
      type: "DEFENSE / SPECIAL PERK",
      tagline: "配置を変え、推理を揺さぶれ。",
      description: "自分の秘密コードに含まれる3つの数字の位置を入れ替える。",
      image: "images/perks/SHUFFLE.png",
      theme: "shuffle"
    },
    {
      name: "REVEAL",
      type: "DEFENSE / SPECIAL PERK",
      tagline: "秘密を明かし、秘密を暴け。",
      description: "自分の秘密コードから数字を1つ選んで相手に公開する代わりに、相手の秘密コードに含まれる数字をランダムで1つ知ることができる。",
      image: "images/perks/REVEAL.png",
      theme: "reveal"
    }
  ];

  const perkTabs = Array.from(document.querySelectorAll(".perk-tab"));
  const perkPanel = document.getElementById("perk-panel");

  const perkType = document.getElementById("perk-type");
  const perkName = document.getElementById("perk-name");
  const perkTagline = document.getElementById("perk-tagline");
  const perkDescription = document.getElementById("perk-description");
  const perkImage = document.getElementById("perk-image");

  if (
    perkTabs.length &&
    perkPanel &&
    perkType &&
    perkName &&
    perkTagline &&
    perkDescription &&
    perkImage
  ) {

    const selectPerk = (index) => {
      const perk = perks[index];

      if (!perk) return;

      perkTabs.forEach((tab) => {
        const selected = Number(tab.dataset.perk) === index;

        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-pressed", String(selected));
      });

      perkType.textContent = perk.type;
      perkName.textContent = perk.name;
      perkTagline.textContent = perk.tagline;
      perkDescription.textContent = perk.description;

      perkImage.src = perk.image;
      perkImage.alt = `${perk.name}のアイコン`;

      perkPanel.dataset.theme = perk.theme;
    };

    perkTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        selectPerk(Number(tab.dataset.perk));
      });
    });

    selectPerk(0);

  }


  /* =======================================================
     03. CHARACTER SYSTEM
     ======================================================= */

  const characterButtons = Array.from(
    document.querySelectorAll(".character-select-item")
  );

  const characterCount = document.getElementById("character-count");
  const characterName = document.getElementById("character-name");
  const characterImage = document.getElementById("character-image");

  const characterPrev = document.getElementById("character-prev");
  const characterNext = document.getElementById("character-next");

  const characterList = document.querySelector(".character-list");

  if (
    characterButtons.length &&
    characterCount &&
    characterName &&
    characterImage &&
    characterPrev &&
    characterNext &&
    characterList
  ) {

    const characters = characterButtons.map((button, index) => ({
      index,
      name: button.dataset.name || `CHARACTER ${index + 1}`,
      image: button.dataset.image || ""
    }));

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let currentCharacter = 0;
    let changeTimer = null;
    let changeToken = 0;

    /* =====================================================
       CHARACTER SELECTION
       ===================================================== */

    const updateSelection = (index) => {
      characterButtons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === index;

        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    };

    const updateCharacterInfo = (index) => {
      const character = characters[index];

      characterCount.textContent =
        `${String(index + 1).padStart(2, "0")} / ` +
        `${String(characters.length).padStart(2, "0")}`;

      characterName.textContent = character.name;

      updateSelection(index);
    };

    const changeCharacter = (index, animate = true) => {

      if (index < 0 || index >= characters.length) {
        return;
      }

      const character = characters[index];

      currentCharacter = index;
      changeToken += 1;

      const token = changeToken;

      if (changeTimer !== null) {
        window.clearTimeout(changeTimer);
        changeTimer = null;
      }

      updateCharacterInfo(index);

      const applyImage = () => {
        if (token !== changeToken) return;

        characterImage.src = character.image;
        characterImage.alt = `${character.name}のキャラクター立ち絵`;

        characterImage.classList.remove("is-changing");
      };

      if (!animate || reduceMotion.matches) {
        applyImage();
        return;
      }

      characterImage.classList.add("is-changing");

      changeTimer = window.setTimeout(() => {
        changeTimer = null;
        applyImage();
      }, 250);

    };

    characterButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        changeCharacter(index);
      });
    });

    characterPrev.addEventListener("click", () => {
      const previousIndex =
        (currentCharacter - 1 + characters.length) % characters.length;

      changeCharacter(previousIndex);
    });

    characterNext.addEventListener("click", () => {
      const nextIndex =
        (currentCharacter + 1) % characters.length;

      changeCharacter(nextIndex);
    });

    changeCharacter(0, false);


    /* =====================================================
       04. AUTOMATIC CHARACTER CAROUSEL
       ===================================================== */

    /*
      元の13人を複製して横に連結する。
      2セット分を使い、途切れないループを実現する。

      複製したボタンにも元のキャラクター番号を
      紐づけることで、クリック選択に対応する。
    */

    const originalButtons = [...characterButtons];

    originalButtons.forEach((button, index) => {
      button.dataset.characterIndex = String(index);
    });

    const cloneFragment = document.createDocumentFragment();

    originalButtons.forEach((button, index) => {
      const clone = button.cloneNode(true);

      clone.dataset.characterIndex = String(index);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");

      cloneFragment.appendChild(clone);
    });

    characterList.appendChild(cloneFragment);

    /*
      連続スクロールのため、JavaScriptで位置を更新。
      requestAnimationFrameを使用する。
    */

    let animationFrame = null;
    let lastFrameTime = null;

    let pausedByHover = false;
    let pausedByTouch = false;
    let pausedByFocus = false;
    let pausedByVisibility = false;

    const SCROLL_SPEED = 32;

    const getLoopWidth = () => {
      const first = characterList.children[0];
      const duplicateFirst =
        characterList.children[originalButtons.length];

      if (!first || !duplicateFirst) return 0;

      return duplicateFirst.offsetLeft - first.offsetLeft;
    };

    const normalizeScroll = () => {
      const loopWidth = getLoopWidth();

      if (loopWidth <= 0) return;

      if (characterList.scrollLeft >= loopWidth) {
        characterList.scrollLeft -= loopWidth;
      }

      if (characterList.scrollLeft < 0) {
        characterList.scrollLeft += loopWidth;
      }
    };

    const shouldPause = () => (
      pausedByHover ||
      pausedByTouch ||
      pausedByFocus ||
      pausedByVisibility ||
      reduceMotion.matches
    );

    const animateCarousel = (timestamp) => {
      if (lastFrameTime === null) {
        lastFrameTime = timestamp;
      }

      const elapsed = Math.min(
        (timestamp - lastFrameTime) / 1000,
        0.05
      );

      lastFrameTime = timestamp;

      if (!shouldPause()) {
        characterList.scrollLeft += SCROLL_SPEED * elapsed;
        normalizeScroll();
      }

      animationFrame = window.requestAnimationFrame(
        animateCarousel
      );
    };

    /*
      ホバー時は一時停止。
    */

    characterList.addEventListener("mouseenter", () => {
      pausedByHover = true;
    });

    characterList.addEventListener("mouseleave", () => {
      pausedByHover = false;
    });

    /*
      タッチ操作中は一時停止。
    */

    characterList.addEventListener("touchstart", () => {
      pausedByTouch = true;
    }, { passive: true });

    characterList.addEventListener("touchend", () => {
      window.setTimeout(() => {
        pausedByTouch = false;
      }, 1800);
    }, { passive: true });

    characterList.addEventListener("touchcancel", () => {
      pausedByTouch = false;
    }, { passive: true });

    /*
      キーボード操作中も停止。
    */

    characterList.addEventListener("focusin", () => {
      pausedByFocus = true;
    });

    characterList.addEventListener("focusout", (event) => {
      if (!characterList.contains(event.relatedTarget)) {
        pausedByFocus = false;
      }
    });

    /*
      別タブを開いている間は停止。
    */

    document.addEventListener("visibilitychange", () => {
      pausedByVisibility = document.hidden;
      lastFrameTime = null;
    });

    /*
      複製されたキャラクターもクリック可能にする。
    */

    characterList.addEventListener("click", (event) => {
      const button = event.target.closest(
        ".character-select-item"
      );

      if (!button) return;

      const index = Number(
        button.dataset.characterIndex
      );

      if (!Number.isInteger(index)) return;

      changeCharacter(index);
    });

    /*
      スクロール位置がリセットされないようにする。
    */

    characterList.addEventListener("scroll", () => {
      normalizeScroll();
    }, { passive: true });

    /*
      CSSのスクロールスナップを無効化する。
      自動スクロール時に引っかかるのを防ぐ。
    */

    characterList.style.scrollSnapType = "none";
    characterList.style.scrollBehavior = "auto";

    /*
      自動スクロール開始。
    */

    if (!reduceMotion.matches) {
      animationFrame = window.requestAnimationFrame(
        animateCarousel
      );
    }

  }

});
