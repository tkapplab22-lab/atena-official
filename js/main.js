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

  if (
    characterButtons.length &&
    characterCount &&
    characterName &&
    characterImage &&
    characterPrev &&
    characterNext
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

  }

});
