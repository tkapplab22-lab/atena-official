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
      description: "相手の秘密コードから任意の位置を1つ指定し、その数字が偶数か奇数かを知ることができる。",
      symbol: "P"
    },
    {
      name: "SUM",
      type: "ATTACK PERK",
      description: "相手の秘密コードから任意の2つの位置を指定し、その数字の合計を知ることができる。",
      symbol: "S"
    },
    {
      name: "ORDER",
      type: "ATTACK PERK",
      description: "相手の秘密コードから任意の2つの位置を指定し、どちらの数字が大きいかを知ることができる。",
      symbol: "O"
    },
    {
      name: "MASK",
      type: "DEFENSE / SPECIAL PERK",
      description: "相手の次のCALL結果を、LOCK・LINKの内訳ではなく「N MATCH」として表示する。",
      symbol: "M"
    },
    {
      name: "SHUFFLE",
      type: "DEFENSE / SPECIAL PERK",
      description: "自分の秘密コードに含まれる3つの数字の位置を入れ替える。",
      symbol: "S"
    },
    {
      name: "REVEAL",
      type: "DEFENSE / SPECIAL PERK",
      description: "自分の秘密コードから数字を1つ選んで相手に公開する代わりに、相手の秘密コードに含まれる数字をランダムで1つ知ることができる。",
      symbol: "R"
    }
  ];

  const perkTabs = Array.from(document.querySelectorAll(".perk-tab"));
  const perkPanel = document.getElementById("perk-panel");

  const perkType = document.getElementById("perk-type");
  const perkName = document.getElementById("perk-name");
  const perkDescription = document.getElementById("perk-description");
  const perkEmblem = document.querySelector(".perk-emblem");

  if (
    perkTabs.length &&
    perkPanel &&
    perkType &&
    perkName &&
    perkDescription &&
    perkEmblem
  ) {

    const selectPerk = (index, moveFocus = false) => {
      const perk = perks[index];

      if (!perk) return;

      perkTabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;

        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      perkType.textContent = perk.type;
      perkName.textContent = perk.name;
      perkDescription.textContent = perk.description;
      perkEmblem.textContent = perk.symbol;

      perkPanel.setAttribute(
        "aria-labelledby",
        perkTabs[index].id
      );

      if (moveFocus) {
        perkTabs[index].focus();
      }
    };

    perkTabs.forEach((tab, index) => {

      tab.addEventListener("click", () => {
        selectPerk(index);
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;

        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % perkTabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + perkTabs.length) % perkTabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = perkTabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        selectPerk(nextIndex, true);
      });

    });

    selectPerk(0);

  }


  /* =======================================================
     03. CHARACTER SYSTEM
     ======================================================= */

  /*
   * キャラクター画像と正式名称は後から設定する。
   * 現段階では13人分の仮表示。
   *
   * 例：
   * { name: "正式名称", image: "images/characters/xxx.png" }
   */

  const characters = Array.from({ length: 13 }, (_, index) => ({
    name: `キャラクター ${String(index + 1).padStart(2, "0")}`,
    image: null
  }));

  const characterCount = document.getElementById("character-count");
  const characterName = document.getElementById("character-name");

  const characterArt = document.querySelector(".character-art");

  const characterPrev = document.getElementById("character-prev");
  const characterNext = document.getElementById("character-next");

  let currentCharacter = 0;

  if (
    characterCount &&
    characterName &&
    characterArt &&
    characterPrev &&
    characterNext
  ) {

    const renderCharacter = () => {
      const character = characters[currentCharacter];

      characterCount.textContent =
        `${String(currentCharacter + 1).padStart(2, "0")} / ` +
        `${String(characters.length).padStart(2, "0")}`;

      characterName.textContent = character.name;

      characterArt.replaceChildren();

      if (character.image) {

        const image = document.createElement("img");

        image.src = character.image;
        image.alt = character.name;
        image.loading = "lazy";

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "contain";

        characterArt.appendChild(image);

        characterArt.removeAttribute("aria-hidden");

      } else {

        const placeholder = document.createElement("span");

        placeholder.innerHTML = "CHARACTER<br>VISUAL";

        characterArt.appendChild(placeholder);

        characterArt.setAttribute("aria-hidden", "true");

      }
    };

    characterPrev.addEventListener("click", () => {
      currentCharacter =
        (currentCharacter - 1 + characters.length) % characters.length;

      renderCharacter();
    });

    characterNext.addEventListener("click", () => {
      currentCharacter =
        (currentCharacter + 1) % characters.length;

      renderCharacter();
    });

    renderCharacter();

  }

});
