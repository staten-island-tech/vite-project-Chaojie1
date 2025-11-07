const pets = ["Length", "Cards", "Simon"];
const cards = ["circle", "square", "triangle"];
pets.forEach((x) =>
  document.querySelector(".cardholder").insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
    <img src="modes/${x}.png" alt="${x}">
      <h1>${x}</h1>
      <button class="selector">Select</button>
    </div>
    `
  )
);
function cyclelength(curnum) {
  return new Promise((resolve) => {
    document
      .querySelector(".cardholder")
      .insertAdjacentHTML("afterbegin", `<h1 id="numtorem">${curnum}</h1>`);
    document
      .querySelector(".cardholder")
      .insertAdjacentHTML("afterbegin", `<h1 id="countdown">5.00</h1>`);
    let val = 1 + Math.round(((curnum.length - 1) / 10) * 100) / 100;
    const inter = setInterval(() => {
      document.getElementById("countdown").textContent =
        Math.round(val * 100) / 100;
      val -= 0.01;
      if (val <= 0) {
        clearInterval(inter);
        document.querySelector(".cardholder").innerHTML = "";
        document
          .querySelector(".cardholder")
          .insertAdjacentHTML("afterbegin", "<h2>What was the number?</h2>");
        document
          .querySelector(".cardholder")
          .insertAdjacentHTML(
            "afterbegin",
            '<input type="text" id="answerinput" placeholder="Enter the number">'
          );
        document.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            if (
              document.getElementById("answerinput").value.trim() === curnum
            ) {
              document
                .querySelector(".cardholder")
                .querySelector("h2").textContent = "CORRECT";
              resolve(false);
            } else {
              document
                .querySelector(".cardholder")
                .querySelector(
                  "h2"
                ).textContent = `WRONG, the answer was ${curnum}`;
              resolve(true);
            }
          }
        });
      }
    }, 10);
  });
}
let selectedMode = undefined;
async function beginGame(mode) {
  if (mode) {
    if (mode === "Length") {
      let failed = false;
      let curnum = "";
      while (!failed) {
        document.querySelector(".cardholder").innerHTML = "";
        curnum = curnum + Math.round(Math.random() * 9).toString();
        failed = await cyclelength(curnum);
        await function () {
          return new Promise((resolve) => setTimeout(resolve, 2500));
        };
      }
    } else if (mode === "Cards") {
      let selection = [undefined, undefined];
      document.querySelector(".cardholder").innerHTML = "";
      console.log(cards.length)
      for (let i = 0; i < cards.length - 1; i++) {
        console.log(i)
        document.querySelector(".cardholder").insertAdjacentHTML(
          "afterbegin",
          `<div cardpair="${i} "class="card">
          <img src="cardimgs/${cards[i]}.png" alt="${cards[i]}">
            <h1>${cards[i]}</h1>
          </div>
           `
        );
      }
    }
  }
}
document.querySelectorAll(".selector").forEach((x) =>
  x.addEventListener("click", function (event) {
    selectedMode = event.target
      .closest(".card")
      .querySelector("h1").textContent;

    beginGame(selectedMode);
  })
);
