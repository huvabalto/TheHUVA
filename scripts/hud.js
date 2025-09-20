export function initHUD() {
  document.getElementById("chatButton").addEventListener("click", () => {
    const input = document.getElementById("chatInput");
    input.style.display = input.style.display === "none" ? "block" : "none";
    input.focus();
  });

  document.getElementById("openInventory").addEventListener("click", () => {
    const inv = document.getElementById("inventoryScreen");
    inv.style.display = inv.style.display === "none" ? "block" : "none";
  });

  document.querySelectorAll(".dir").forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir;
      console.log("Move:", dir);
      // Add movement logic here
    });
  });
}
