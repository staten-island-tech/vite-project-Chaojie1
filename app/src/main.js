const pets = ["Cards"];
const cards = [
  { Name: "circle", Custom: false },
  { Name: "dodecahedron", Custom: false },
  { Name: "hexagon", Custom: false },
  { Name: "minecraft", Custom: false },
  { Name: "roblox", Custom: false },
  { Name: "square", Custom: false },
  { Name: "star", Custom: false },
  { Name: "tesseract", Custom: false },
  { Name: "triangle", Custom: false },
];
document
  .querySelector(".cardholder")
  .insertAdjacentHTML(
    "afterbegin",
    '<input type="text" id="name" placeholder="name"><input type="text" id="url" placeholder="url"><button id="adcard">insert card</button>'
  );

  document.getElementById("adcard").addEventListener("click",function(event){
    cards.push({
      Name: `${document.getElementById("name").value}`,
      Link: `${document.getElementById("url").value}`,
      Custom: true
    })
    document.getElementById("name").value = ""
    document.getElementById("url").value = ""
  })
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
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let ii = Math.floor(Math.random() * (i + 1));

    [array[i], array[ii]] = [array[ii], array[i]];
  }
  return array;
}
let selectedMode = undefined;
async function beginGame(mode) {
  if (mode) {
if (mode === "Cards") {
      const selection = [undefined, undefined];
      document.querySelector(".cardholder").innerHTML = "";
      let cardss = [];
      for (let i = 0; i < cards.length; i++) {
        cardss.push([cards[i], i]);
        cardss.push([cards[i], i]);
      }
      let cardsss = shuffleArray(cardss);
      for (let i = 0; i < cardsss.length; i++) {
        if (cardsss[i][0].Custom === false) {
          document.querySelector(".cardholder").insertAdjacentHTML(
            "afterbegin",
            `<div selectedalr="no" cardpair="${cardsss[i][1]}" cardid="${cardsss[i][0].Name}" class="card">
          <img src="cardimgs/${cardsss[i][0].Name}.png" alt="${cardsss[i][0].Name}">
            <h1></h1>
          </div>
           `
          );
        } else {
          document.querySelector(".cardholder").insertAdjacentHTML(
            "afterbegin",
            `<div selectedalr="no" cardpair="${cardsss[i][1]}" cardid="${cardsss[i][0].Name}" class="card">
          <img src="${cardsss[i][0].Link}" alt="${cardsss[i][0].Name}">
            <h1></h1>
          </div>
           `
          );
        }
      }
      document.querySelector(".cardholder").insertAdjacentHTML(
        "beforeend",
        `<h2>tries: 0</h2>
           `
      );
      document.querySelector(".cardholder").insertAdjacentHTML(
        "beforeend",
        `<h3>time wasted: 0</h3>
           `
      );
      document
        .querySelectorAll(".card")
        .forEach((x) => (x.querySelector("img").style.opacity = 0));
      let selecting = false;
      let firstselected = undefined;
      let tries = 0;
      let timespent = 0;
      let correct = 0;
      document.querySelectorAll(".card").forEach((x) =>
        x.addEventListener("click", function () {
          if (x.getAttribute("selectedalr") === "no" && selecting === false) {
            x.setAttribute("selectedalr", "yes");
            x.querySelector("h1").textContent = x.getAttribute("cardid");
            x.querySelector("img").style.opacity = 1;
            if (!selection[0]) {
              selection[0] = x.getAttribute("cardpair");
              firstselected = x;
            } else if (!selection[1]) {
              selection[1] = x.getAttribute("cardpair");
              selecting = true;
              tries += 1;
              document
                .querySelector(".cardholder")
                .querySelector("h2").textContent = `tries: ${tries}`;
              if (selection[0] === selection[1]) {
                correct += 1;
                selecting = false;
                if (correct === cards.length) {
                  document.querySelector(".cardholder").innerHTML = "";
                  document
                    .querySelector(".cardholder")
                    .insertAdjacentHTML(
                      "afterbegin",
                      `<h1>you got it in ${tries} tries and spent ${timespent} seconds on this</h1>`
                    );
                }
              } else {
                firstselected.setAttribute("selectedalr", "no");
                x.setAttribute("selectedalr", "no");
                setTimeout(function () {
                  x.querySelector("h1").textContent = "";
                  firstselected.querySelector("h1").textContent = "";
                  x.querySelector("img").style.opacity = 0;
                  firstselected.querySelector("img").style.opacity = 0;
                  firstselected = undefined;
                  selecting = false;
                }, 750);
              }
              selection[0] = undefined;
              selection[1] = undefined;
            }
          }
        })
      );
      while (correct != cards.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        timespent += 1;
        document
          .querySelector(".cardholder")
          .querySelector("h3").textContent = `time wasted: ${timespent}s`;
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
