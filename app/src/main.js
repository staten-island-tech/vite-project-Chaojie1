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
        .insertAdjacentHTML("afterbegin", `<h1 id="numtorem">${curnum}</h1>`);
      document
        .querySelector(".cardholder")
        .insertAdjacentHTML("afterbegin", `<h1 id="countdown">5.00</h1>`);
      let val = 5;
      const inter = setInterval(() => {
        document.getElementById("countdown").textContent =
          Math.round(val * 100) / 100;
        val -= 0.01;
        if (val <= 0) {
          clearInterval(inter);
          document.getElementById("numtorem").remove();
          document
            .querySelector(".cardholder")
            .insertAdjacentHTML("afterbegin", "<h2>What was the number?</h2>");
          document.getElementById("countdown").remove();
          document
            .querySelector(".cardholder")
            .insertAdjacentHTML(
              "afterbegin",
              '<input type="text" id="answerinput" placeholder="Enter the number">'
            );
          document
            .querySelector(".cardholder")
            .insertAdjacentHTML(
              "afterbegin",
              '<button id="submit">Submit</button>'
            );
          document
            .getElementById("submit")
            .addEventListener("click", function () {
              if (
                document.getElementById("answerinput").value.trim() === curnum
              ) {
                document
                  .querySelector(".cardholder")
                  .querySelector("h2").textContent = "CORRECT";
              } else {
                document
                  .querySelector(".cardholder")
                  .querySelector("h2").textContent = "WRONG";
              }
            });
        }
      }, 10);
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
