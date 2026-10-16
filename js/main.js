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

      if (animate && !reduceMotion.matches) {
        characterName.classList.remove("is-revealing");
        void characterName.offsetWidth;
        characterName.classList.add("is-revealing");
      }

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


/* =========================================================
   05. MOBILE HERO / PARALLAX
   ========================================================= */

(function () {
  "use strict";

  const MOBILE_BREAKPOINT = 767;

  /*
    既存のCSSは変更せず、この機能に必要なスタイルだけ
    JavaScriptから追加する。

    PC表示では適用しない。
  */

  const heroStyle = document.createElement("style");

  heroStyle.id = "atena-mobile-hero-style";

  heroStyle.textContent = `
    @media (max-width: ${MOBILE_BREAKPOINT}px) {

      body.lp-page .lp-hero {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        min-height: 0;
        padding: 70px 0 42px;

        overflow: hidden;
      }

      body.lp-page .lp-visual-wrap {
        position: relative;

        display: block;

        width: 100%;
        max-width: none;

        height: clamp(480px, 74svh, 760px);

        margin: 0;
        padding: 0;

        overflow: hidden;

        background: #d7f3ff;
      }

      body.lp-page .lp-visual-wrap .lp-visual {
        position: absolute;
        top: -9%;
        left: 0;

        display: block;

        width: 100%;
        height: 118%;
        max-height: none;

        margin: 0;

        object-fit: cover;
        object-position: 50% 50%;

        transform:
          translate3d(
            0,
            var(--atena-image-shift, 0px),
            0
          );

        will-change: transform;
      }

      body.lp-page .lp-visual-wrap .lp-logo {
        position: absolute;
        top: 6%;
        left: 50%;
        z-index: 3;

        width: clamp(155px, 48vw, 250px);
        max-width: 250px;
        max-height: 150px;

        object-fit: contain;

        transform:
          translate3d(
            -50%,
            var(--atena-logo-shift, 0px),
            0
          );

        filter:
          drop-shadow(
            0 8px 18px rgba(17, 80, 145, 0.28)
          );

        will-change: transform;
      }

      body.lp-page .hero-text {
        position: relative;
        z-index: 4;

        width: calc(100% - 36px);
        max-width: 540px;

        margin: 0 auto;
        padding: 25px 0 0;

        text-align: center;
      }

      body.lp-page .hero-text .eyebrow {
        margin-bottom: 12px;
      }

      body.lp-page .hero-text .lp-copy {
        font-size: clamp(25px, 6.7vw, 37px);
        line-height: 1.35;
      }

      body.lp-page .hero-text .hero-sub {
        margin-top: 13px;

        font-size: 13px;
        line-height: 1.8;
      }

      body.lp-page .hero-text .hero-scroll {
        margin-top: 22px;
      }

      body.lp-page .hero-text.atena-hero-reveal {
        animation:
          atena-hero-text-enter 850ms
          cubic-bezier(0.2, 0.7, 0.2, 1)
          both;
      }

      @keyframes atena-hero-text-enter {
        from {
          opacity: 0;
          transform: translate3d(0, 25px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

    }

    @media (max-width: 390px) {

      body.lp-page .lp-visual-wrap {
        height: clamp(440px, 70svh, 660px);
      }

      body.lp-page .lp-visual-wrap .lp-logo {
        width: 48vw;
      }

    }

    @media (prefers-reduced-motion: reduce) {

      body.lp-page .lp-visual-wrap .lp-visual,
      body.lp-page .lp-visual-wrap .lp-logo {
        transform: none;
        will-change: auto;
      }

      body.lp-page .lp-visual-wrap .lp-logo {
        transform: translateX(-50%);
      }

      body.lp-page .hero-text.atena-hero-reveal {
        animation: none;
      }

    }
  `;

  document.head.appendChild(heroStyle);

  function initializeMobileHero() {

    const hero = document.querySelector(".lp-hero");
    const visualWrap = document.querySelector(".lp-visual-wrap");
    const visual = document.querySelector(".lp-visual");
    const logo = document.querySelector(".lp-visual-wrap .lp-logo");
    const heroText = document.querySelector(".hero-text");

    if (
      !hero ||
      !visualWrap ||
      !visual ||
      !logo ||
      !heroText
    ) {
      return;
    }

    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    );

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let ticking = false;

    /*
      スクロール位置に応じて画像とロゴを
      異なる速度で動かす。

      transformのみを変更し、
      レイアウトの再計算を抑える。
    */

    function updateParallax() {

      ticking = false;

      if (
        !mobileQuery.matches ||
        reduceMotionQuery.matches
      ) {
        visual.style.removeProperty(
          "--atena-image-shift"
        );

        logo.style.removeProperty(
          "--atena-logo-shift"
        );

        return;
      }

      const rect = hero.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      /*
        ヒーローが画面外なら更新不要。
      */

      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {
        return;
      }

      /*
        ヒーロー上端が上へ移動した距離。
      */

      const scrollAmount = Math.max(
        0,
        -rect.top
      );

      /*
        画像の移動量を制限することで、
        スクロール時の過度な見切れを防ぐ。
      */

      const imageShift = Math.min(
        scrollAmount * 0.12,
        65
      );

      const logoShift = Math.min(
        scrollAmount * 0.055,
        30
      );

      visual.style.setProperty(
        "--atena-image-shift",
        `${imageShift.toFixed(2)}px`
      );

      logo.style.setProperty(
        "--atena-logo-shift",
        `${logoShift.toFixed(2)}px`
      );
    }

    function requestParallaxUpdate() {

      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        updateParallax
      );
    }

    /*
      スクロール中は1フレームにつき
      最大1回だけ更新する。
    */

    window.addEventListener(
      "scroll",
      requestParallaxUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestParallaxUpdate,
      { passive: true }
    );

    /*
      OSのモーション設定が変更された場合にも対応。
    */

    const handleMotionChange = () => {
      requestParallaxUpdate();
    };

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener(
        "change",
        handleMotionChange
      );
    }

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener(
        "change",
        handleMotionChange
      );
    }

    /*
      テキスト出現演出。
      スプラッシュ画面が消えた後にも
      自然に見えるよう少し待って開始する。
    */

    if (
      mobileQuery.matches &&
      !reduceMotionQuery.matches
    ) {
      window.setTimeout(() => {
        heroText.classList.add(
          "atena-hero-reveal"
        );
      }, 250);
    }

    /*
      初期表示位置を反映。
    */

    requestParallaxUpdate();

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initializeMobileHero,
      { once: true }
    );

  } else {

    initializeMobileHero();

  }

})();
