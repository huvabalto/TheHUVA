
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gender = localStorage.getItem("gender") || "male";
const fur = localStorage.getItem("fur") || "neon";

const baseSprite = new Image();
baseSprite.src = `assets/wombat${gender}_walk.png`;

const furOverlay = new Image();
furOverlay.src = `assets/fur_${fur}_overlay.png`;

const helmetSprite = new Image();
const outfitTop = new Image();
const outfitBottom = new Image();

function updateGameSprite() {
  helmetSprite.src = localStorage.getItem("helmet") ? `assets/helmet_${localStorage.getItem("helmet")}.png` : "";
  outfitTop.src = localStorage.getItem("top") ? `assets/outfit_top_${localStorage.getItem("top")}.png` : "";
  outfitBottom.src = localStorage.getItem("bottom") ? `assets/outfit_bottom_${localStorage.getItem("bottom")}.png` : "";
}

function drawWombat() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const wombatX = canvas.width / 2 - 32;
  const wombatY = canvas.height / 2 - 32;
  const frameX = 0;
  const frameY = 0;

  ctx.drawImage(baseSprite, frameX, frameY, 64, 64, wombatX, wombatY, 64, 64);
  ctx.drawImage(furOverlay, frameX, frameY, 64, 64, wombatX, wombatY, 64, 64);
  ctx.drawImage(outfitBottom, frameX, frameY, 64, 64, wombatX, wombatY, 64, 64);
  ctx.drawImage(outfitTop, frameX, frameY, 64, 64, wombatX, wombatY, 64, 64);
  ctx.drawImage(helmetSprite, frameX, frameY, 64, 64, wombatX, wombatY, 64, 64);
}

baseSprite.onload = () => {
  updateGameSprite();
  drawWombat();
};

document.getElementById("chatButton").addEventListener("click", () => {
  const input = document.getElementById("chatInput");
  input.style.display = input.style.display === "none" ? "block" : "none";
  input.focus();
});

document.getElementById("openInventory").addEventListener("click", () => {
  const inv = document.getElementById("inventoryScreen");
  inv.style.display = inv.style.display === "none" ? "block" : "none";
  updatePreview();
});

document.querySelectorAll(".gearItem").forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", item.dataset.type);
    e.dataTransfer.setData("name", item.dataset.name);
  });
});

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("dragover", e => e.preventDefault());
  slot.addEventListener("drop", e => {
    const type = e.dataTransfer.getData("type");
    const name = e.dataTransfer.getData("name");

    slot.innerHTML = `<img src="assets/${type}_${name}.png" width="64" height="64" />`;
    localStorage.setItem(type, name);
    updatePreview();
    updateGameSprite();
    drawWombat();
  });
});

function updatePreview() {
  const ctx2 = document.getElementById("previewCanvas").getContext("2d");
  ctx2.clearRect(0, 0, 64, 64);

  const base = new Image();
  base.src = baseSprite.src;

  const helmet = new Image();
  const top = new Image();
  const bottom = new Image();

  helmet.src = localStorage.getItem("helmet") ? `assets/helmet_${localStorage.getItem("helmet")}.png` : "";
  top.src = localStorage.getItem("top") ? `assets/outfit_top_${localStorage.getItem("top")}.png` : "";
  bottom.src = localStorage.getItem("bottom") ? `assets/outfit_bottom_${localStorage.getItem("bottom")}.png` : "";

  base.onload = () => {
    ctx2.drawImage(base, 0, 0, 64, 64);
    helmet.onload = () => ctx2.drawImage(helmet, 0, 0, 64, 64);
    top.onload = () => ctx2.drawImage(top, 0, 0, 64, 64);
    bottom.onload = () => ctx2.drawImage(bottom, 0, 0, 64, 64);
  };
}
