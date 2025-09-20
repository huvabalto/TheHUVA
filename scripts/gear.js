export function initGear() {
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
}

export function updatePreview() {
  const ctx2 = document.getElementById("previewCanvas").getContext("2d");
  ctx2.clearRect(0, 0, 64, 64);

  const base = new Image();
  base.src = localStorage.getItem("gender") === "female"
    ? "assets/wombatfemale_walk.png"
    : "assets/wombatmale_walk.png";

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
