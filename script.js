// Language State Management
let currentLang = "ko";
let isCreditOpen = false;

const switchers = document.querySelectorAll(".lang-btn");
switchers.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    switchers.forEach((b) => b.classList.remove("active"));
    const target = event.currentTarget;
    target.classList.add("active");
    currentLang = target.getAttribute("data-lang");
    renderContent();
  });
});

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node) node.textContent = value ?? "";
};

const renderList = (elementId, items, renderer) => {
  const root = document.getElementById(elementId);
  if (!root) return;
  root.innerHTML = "";
  const safeItems = Array.isArray(items) ? items : [];
  safeItems.forEach((item) => {
    root.appendChild(renderer(item));
  });
};

function updateCreditToggle(content) {
  const toggleButton = document.getElementById("ui-credit-toggle");
  const collapsible = document.getElementById("credit-collapsible");
  if (!toggleButton || !collapsible) return;

  const openLabel = content.ui.creditToggleOpen || "Show Credits";
  const closeLabel = content.ui.creditToggleClose || "Hide Credits";

  toggleButton.textContent = isCreditOpen ? closeLabel : openLabel;
  toggleButton.setAttribute("aria-expanded", isCreditOpen ? "true" : "false");
  collapsible.hidden = !isCreditOpen;
}

function renderFooterLinks(links) {
  const footerNav = document.getElementById("footer-nav");
  if (!footerNav) return;

  footerNav.innerHTML = "";

  const safeLinks = Array.isArray(links) ? links : [];
  safeLinks.forEach((item) => {
    if (!item || !item.label) return;

    const link = document.createElement("a");
    link.textContent = item.label;
    link.href = item.url || "#";

    if (item.url && /^https?:\/\//.test(item.url)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    footerNav.appendChild(link);
  });
}

function toggleCreditSection() {
  isCreditOpen = !isCreditOpen;
  const content = window.siteContent[currentLang] || window.siteContent.ko;
  updateCreditToggle(content);
  refreshTilt();
}

const tiltOptions = {
  max: 2,
  speed: 400,
  glare: true,
  "max-glare": 0.12,
  scale: 1.01,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

let tiltRefreshTimer = null;

function refreshTilt() {
  if (typeof VanillaTilt === "undefined") return;

  if (tiltRefreshTimer) {
    clearTimeout(tiltRefreshTimer);
  }

  const tiltElements = document.querySelectorAll(".tilt-element");

  tiltElements.forEach((el) => {
    if (el.vanillaTilt) {
      el.vanillaTilt.destroy();
    }

    const staleGlares = el.querySelectorAll(".js-tilt-glare");
    staleGlares.forEach((glareEl) => glareEl.remove());
  });

  tiltRefreshTimer = window.setTimeout(() => {
    VanillaTilt.init(tiltElements, tiltOptions);
    tiltRefreshTimer = null;
  }, 0);
}

window.refreshTilt = refreshTilt;

function renderContent() {
  const content = window.siteContent[currentLang] || window.siteContent.ko;
  const contact = content.contact || {};
  const ui = content.ui || {};
  const hero = content.hero || {};
  const profile = content.profile || {};
  const credit = content.credit || {};
  const footer = content.footer || {};

  document.documentElement.lang = currentLang;
  document.body.classList.remove("lang-ko", "lang-en", "lang-ja");
  document.body.classList.add(`lang-${currentLang}`);

  // Hero Section
  setText("hero-label", hero.label);
  setText("hero-name", hero.name);
  setText("hero-tagline", hero.tagline);
  setText("btn-profile", hero.buttonProfile);
  setText("hero-download-link", hero.buttonDownload);
  setText("profile-download-link", hero.buttonDownload);

  // Status & UI
  setText("ui-status-label", contact.sectionLabel || ui.statusLabel);
  setText("ui-profile-eyebrow", ui.profileSection);
  setText("ui-profile-heading", ui.profileSection);
  setText("ui-dossier-title", ui.dossierLabel);
  setText("ui-dossier-note", ui.dossierLabel);
  setText("ui-download-eyebrow", ui.downloadSection);
  setText("ui-notes-title", ui.notesLabel);
  setText("ui-drive-label", ui.driveLabel);
  setText("ui-notes-label", ui.notesLabel);
  updateCreditToggle(content);

  // Profile Section
  setText("profile-name", profile.name);
  setText("profile-type", profile.type);
  setText("profile-summary", profile.summary);
  
  // Download/Credit Section
  setText("credit-title", credit.title);
  setText("credit-description", credit.description);
  setText("dl-title", credit.primaryAction?.title);
  setText("footer-meta", footer.metaText);
  renderFooterLinks(footer.links);

  const profileStatus = document.getElementById("profile-status");
  if (profileStatus) {
    profileStatus.innerHTML = "";
    if (contact.primaryUrl) {
      const primaryLink = document.createElement("a");
      primaryLink.className = "status-primary-link";
      primaryLink.href = contact.primaryUrl;
      primaryLink.target = "_blank";
      primaryLink.rel = "noreferrer";
      primaryLink.textContent = contact.primaryText || profile.status;
      profileStatus.appendChild(primaryLink);
    } else {
      profileStatus.textContent = contact.primaryText || profile.status;
    }
  }

  renderList("hero-facts", contact.channels || hero.facts, (fact) => {
    const item = document.createElement("li");
    if (typeof fact === "string") {
      item.textContent = fact;
      return item;
    }

    const label = fact.label ? `${fact.label}: ` : "";
    const value = fact.value || fact.text || "";

    if (fact.url) {
      const link = document.createElement("a");
      link.className = "status-link";
      link.href = fact.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `${label}${value}`;
      item.appendChild(link);
      return item;
    }

    item.textContent = `${label}${value}`;
    return item;
  });

  const tags = profile.tags || [];
  const tagRow = document.getElementById("tag-row");
  if (tags.length > 0) {
    if (tagRow) tagRow.style.display = 'flex';
    renderList("tag-row", tags, (tag) => {
      const item = document.createElement("span");
      item.className = "tag";
      item.textContent = tag;
      return item;
    });
  } else {
    if (tagRow) tagRow.style.display = 'none';
  }

  renderList("profile-grid", profile.stats, (stat) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const desc = document.createElement("dd");
    term.textContent = stat.label;
    desc.textContent = stat.value;
    wrapper.appendChild(term);
    wrapper.appendChild(desc);
    return wrapper;
  });

  renderList("dossier-list", profile.dossier, (entry) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    const desc = document.createElement("dd");
    item.className = "dossier-item";
    term.textContent = entry.label;
    desc.textContent = entry.value;
    item.appendChild(term);
    item.appendChild(desc);
    return item;
  });

  renderList("credit-grid", credit.contributors, (contributor) => {
    const isLink = !!contributor.link;
    const card = document.createElement(isLink ? "a" : "article");
    card.className = "contributor-card tilt-element";
    
    if (isLink) {
      card.href = contributor.link;
      card.target = "_blank";
      card.rel = "noreferrer";
      card.classList.add("is-link");
    }
    
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "contributor-content";
    
    const role = document.createElement("p");
    role.className = "contributor-role";
    role.textContent = contributor.role;
    
    const name = document.createElement("p");
    name.className = "contributor-name";
    name.textContent = contributor.name;
    
    contentWrapper.appendChild(role);
    contentWrapper.appendChild(name);
    
    if (contributor.image) {
      const avatar = document.createElement("div");
      avatar.className = "contributor-avatar";
      const img = document.createElement("img");
      img.src = contributor.image;
      img.alt = `${contributor.name} profile`;
      avatar.appendChild(img);
      card.appendChild(avatar);
    }
    
    card.appendChild(contentWrapper);
    return card;
  });

  const creditNotesList = document.getElementById("credit-notes");
  if (creditNotesList) creditNotesList.innerHTML = "";
  renderList("credit-notes", credit.notes, (note) => {
    const item = document.createElement("li");
    item.textContent = note;
    return item;
  });

  const portraitImage = document.getElementById("portrait-image");
  const portraitFallback = document.getElementById("portrait-fallback");
  if (profile.portraitImage) {
    portraitImage.src = profile.portraitImage;
    portraitImage.hidden = false;
    portraitFallback.hidden = true;
  } else {
    portraitImage.hidden = true;
    portraitFallback.hidden = false;
    portraitFallback.textContent = profile.portraitFallback;
  }

  const creditLink = document.getElementById("credit-link");
  if (credit.primaryAction && credit.primaryAction.url) {
    creditLink.style.display = "inline-flex";
    creditLink.href = credit.primaryAction.url;
    creditLink.textContent = credit.primaryAction.label;
  } else {
    creditLink.style.display = "none";
  }

  const creditLinkAlt = document.getElementById("credit-link-alt");
  if (credit.secondaryAction && credit.secondaryAction.url) {
    creditLinkAlt.style.display = "inline-flex";
    creditLinkAlt.href = credit.secondaryAction.url;
    creditLinkAlt.textContent = credit.secondaryAction.label;
  } else {
    creditLinkAlt.style.display = "none";
  }

  refreshTilt();
}

// Initial render
renderContent();

const creditToggleButton = document.getElementById("ui-credit-toggle");
if (creditToggleButton) {
  creditToggleButton.addEventListener("click", toggleCreditSection);
}

// Crab Background Animation
const canvas = document.getElementById('crab-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let crabs = [];
  const crabImage = new Image();
  crabImage.src = 'assets/crab.svg';

  let mouseX = -1000;
  let mouseY = -1000;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 화면 밖으로 마우스가 나가면 영향권 없앰
  document.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Crab {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.size = Math.random() * 20 + 15; // 15px ~ 35px
      this.x = Math.random() * width;
      // 초기에는 화면 전역에 뿌리고, 리셋될 때는 위에서 떨어지게
      this.y = initial ? Math.random() * height : -this.size;
      this.speedY = Math.random() * 1.5 + 0.5; // 떨어지는 속도
      this.speedX = (Math.random() - 0.5) * 0.5; // 좌우 살짝 흔들림
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02; // 천천히 회전
      this.baseOpacity = Math.random() * 0.4 + 0.2; // 기본 투명도 0.2 ~ 0.6
      this.currentOpacity = this.baseOpacity;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + this.size) {
        this.reset();
      }

      // 마우스 위치와의 거리 계산
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const interactionRadius = 150; // 마우스 영향 반경

      if (distance < interactionRadius) {
        // 마우스와 가까울수록 투명하게 (0에 수렴)
        const factor = distance / interactionRadius;
        // targetOpacity는 factor가 작을수록(가까울수록) 낮아짐
        const targetOpacity = this.baseOpacity * Math.pow(factor, 2); 
        // 부드럽게 변환
        this.currentOpacity += (targetOpacity - this.currentOpacity) * 0.1;
      } else {
        // 멀어지면 다시 원래 투명도로 복귀
        this.currentOpacity += (this.baseOpacity - this.currentOpacity) * 0.05;
      }
    }

    draw() {
      if (!crabImage.complete) return;
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, this.currentOpacity); // 음수 방지
      ctx.drawImage(crabImage, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  // 화면 크기에 비례해서 게 갯수 조절 (모바일 고려)
  const crabCount = Math.floor((width * height) / 40000); 
  for (let i = 0; i < crabCount; i++) {
    crabs.push(new Crab());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    crabs.forEach(crab => {
      crab.update();
      crab.draw();
    });
    requestAnimationFrame(animate);
  }

  crabImage.onload = () => {
    animate();
  };
}
