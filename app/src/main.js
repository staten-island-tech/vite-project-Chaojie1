const pets = ["Length", "Flash", "triangle"];
pets.forEach((x) =>
  document.querySelector(".cardholder").insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
    <img src="pets/${x}.png" alt="${x}">
      <h1>${x}</h1>
      <button class="selector">Select</button>
    </div>
    `
  )
);
let selectedMode = undefined;
function beginGame(mode) {
  if (mode) {
    if (mode === "Length") {
      let failed = false;
      let curnum = Math.round(Math.random() * 10).toString();
      document
        .querySelector(".cardholder")
        .insertAdjacentHTML(
          "afterbegin",
          `<h1 class="numtorem">${curnum}</h1>`
        );
      setTimeout(function () {
        document
          .querySelector(".cardholder")
          .querySelector(".numtorem")
          .remove();
        document.querySelector(".cardholder").insertAdjacentHTML("afterbegin","<h2>What was the number?</h2>");
      }, 3500);
    }
  }
}
document.querySelectorAll(".selector").forEach((x) =>
  x.addEventListener("click", function (event) {
    selectedMode = event.target
      .closest(".card")
      .querySelector("h1").textContent;
    document.querySelector(".cardholder").innerHTML = "";
    beginGame(selectedMode);
  })
);
