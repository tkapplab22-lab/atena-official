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

  /*
   * キャラクター画像と正式名称は後から設定する。
   * 現段階では13人分の仮表示。
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
