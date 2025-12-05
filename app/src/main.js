/* variable setup */
import './style.css';
const pets = ["Cards", "Length"];
let selectedMode;
const cards = JSON.parse(localStorage.getItem("cards"))||[
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

/* Functions */
function cyclelength(curnum) {
  return new Promise((resolve) => {
    /* Inital setup */
    document.querySelector(".cardholder").insertAdjacentHTML("afterbegin", `<h1 id="numtorem">${curnum}</h1>`);
    document.querySelector(".cardholder").insertAdjacentHTML("afterbegin", `<h1 id="countdown">5.00</h1>`);
    let val = 1 + Math.round(((curnum.length - 1) / 10) * 100) / 100;

    const inter = setInterval(() => {
      document.getElementById("countdown").textContent = Math.round(val * 100) / 100;
      val -= 0.01;
      if (val <= 0) {
        clearInterval(inter);

        /* player input setup */
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

        /* keybind detector */
        document.addEventListener("keydown", function (event) {
          if (event.key != "Enter") {return}

          /* check if the number is correct, return different bool values to the original promise to update loop */
          if (document.getElementById("answerinput").value.trim() === curnum) {
            document.querySelector(".cardholder").querySelector("h2").textContent = "CORRECT";
            resolve(false);
          } else {
            document.querySelector(".cardholder").querySelector("h2").textContent = `WRONG, the answer was ${curnum}`;
            resolve(true);
          }
        });
      }
    }, 10);
  });
};
async function beginCards() {
      const selection = [undefined, undefined];
      document.querySelector(".cardholder").innerHTML = "";

      /* Create a randomized list of cards to be used later */
      let cardss = [];
      for (let i = 0; i < cards.length; i++) {
        cardss.push([cards[i], i]);
        cardss.push([cards[i], i]);
      }
      let cardsss = shuffleArray(cardss);

      /* Check if the card is custom, run different code depending on the boolean */
      for (let i = 0; i < cardsss.length; i++) {
        if (cardsss[i][0].Custom === false) {
          document.querySelector(".cardholder").insertAdjacentHTML("afterbegin",
            `<div selectedalr="no" cardpair="${cardsss[i][1]}" cardid="${cardsss[i][0].Name}" class="card">
              <img src="./cardimgs/${cardsss[i][0].Name}.png" alt="${cardsss[i][0].Name}">
              <h1></h1>
            </div>`);
        } else {
          document.querySelector(".cardholder").insertAdjacentHTML("afterbegin",
            `<div selectedalr="no" cardpair="${cardsss[i][1]}" cardid="${cardsss[i][0].Name}" class="card">
              <img src="${cardsss[i][0].Link}" alt="${cardsss[i][0].Name}">
              <h1></h1>
            </div>`);
        }
      }

      document.querySelector(".cardholder").insertAdjacentHTML(
        "beforeend",
        `<h2>tries: 0</h2>
        <h3>time wasted: 0</h3>`);

      document.querySelectorAll(".card").forEach(
        (x) => (x.querySelector("img").style.opacity = 0)
      );

      let selecting = false;
      let firstselected = undefined;
      let tries = 0;
      let timespent = 0;
      let correct = 0;
      document.querySelectorAll(".card").forEach((x) =>
    
        x.addEventListener("click", function () {
          /* Reveal selected card */
          if (x.getAttribute("selectedalr") === "no" && selecting === false) {
            x.setAttribute("selectedalr", "yes");
            x.querySelector("h1").textContent = x.getAttribute("cardid");
            x.querySelector("img").style.opacity = 1;
          } else {return}

          /* Check if the player has selected two cards */
          if (!selection[0]) {
              selection[0] = x.getAttribute("cardpair");
              firstselected = x;
              return
          } else if (!selection[1]) {
              selection[1] = x.getAttribute("cardpair");
              selecting = true;
              tries += 1;
              document.querySelector(".cardholder").querySelector("h2").textContent = `tries: ${tries}`;
          } else {return}

          /* if the player is correct, +1 to correct, else hide both cards */
          if (selection[0] === selection[1]) {
              correct += 1;
              selecting = false;
              selection[0] = undefined;
              selection[1] = undefined;
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

              selection[0] = undefined;
              selection[1] = undefined;
              return
          }

          /* if the amount of corrects is matching the required amount of corrects to win. End the game */
          if (correct === cards.length) {
              document.querySelector(".cardholder").innerHTML = "";
              document.querySelector(".cardholder").insertAdjacentHTML("afterbegin",`<h1>you got it in ${tries} tries and spent ${timespent} seconds on this</h1>`);
          }
        })
      );

      /* Separate loop to see time lapsed */
      while (correct != cards.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        timespent += 1;
        if (document.querySelector(".cardholder").querySelector("h3")) {
          document.querySelector(".cardholder").querySelector("h3").textContent = `time wasted: ${timespent}s`;
        }
      }
}
function shuffleArray(array) {
  for (let i = 0; i < array.length-1; i++) {
    let ii = Math.floor(Math.random() * (i + 1));

    [array[i], array[ii]] = [array[ii], array[i]];
  }
  return array;
}
async function beginGame(mode) {
  /* Double check if the selected mode is valid */
  if (mode) {
    document.querySelector(".cardholder").innerHTML = "";
  } else {return}

  if (mode === "Length") {
    let failed = false;
    let curnum = "";

    /* gameloop until loss */
    while (!failed) {
      curnum = curnum + Math.round(Math.random() * 9).toString();
      failed = await cyclelength(curnum);

      await function () {
        return new Promise((resolve) => setTimeout(resolve, 2500));
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } else if (mode === "Cards") {
    
    /* Custom cards creator */
    document.querySelector(".cardholder").insertAdjacentHTML("afterbegin",
      `<input type="text" id="name" placeholder="name">
      <input type="text" id="url" placeholder="url">
      <button id="adcard" class="smallbutton">insert</button>
      <button id="start" class="smallbutton">start</button>`
    );
    document.getElementById("adcard").addEventListener("click", function (event) {

      /* Create card data */
      cards.push({
        Name: `${document.getElementById("name").value}`,
        Link: `${document.getElementById("url").value}`,
        Custom: true,
      });
      localStorage.setItem("cards",JSON.stringify(cards))
      /* add a function to "remove" button */
      document.getElementById("cardlist").insertAdjacentHTML("beforeend",`<div id="${document.getElementById("name").value}"><h4>Name: ${document.getElementById("name").value} ImgUrl: ${document.getElementById("url").value}</h4><button class="smallbutton remover">remove</button></div>`)
      document.getElementById(document.getElementById("name").value).querySelector(".remover").addEventListener("click",function(event){
        cards.splice(cards.indexOf(cards.find(({Name}) => Name === event.target.closest("div").querySelector("h4").getAttribute("cardname"))),1)
        event.target.closest("div").remove()
        localStorage.setItem("cards",JSON.stringify(cards))
      })

      /* clear input boxes */
      document.getElementById("name").value = "";
      document.getElementById("url").value = "";

    });
    
    /* create displays for the list of cards */
    document.querySelector(".cardholder").insertAdjacentHTML("beforeend","<div id='cardlist'></div>")
    cards.forEach((x)=>{
      if (x.Custom === false){
        document.getElementById("cardlist").insertAdjacentHTML("beforeend",`<div><h4 cardname="${x.Name}">Name: ${x.Name} ImgUrl: ${x.Name}.png"</h4><button class="smallbutton remover">remove</button></div>`)
      } else {
        document.getElementById("cardlist").insertAdjacentHTML("beforeend",`<div><h4 cardname="${x.Name}">Name: ${x.Name} ImgUrl: ${x.Link}"</h4><button class="smallbutton remover">remove</button></div>`)
      }
    })

    /* add a function to all "remove" buttons that already existed */
    document.querySelectorAll(".remover").forEach((x)=>
      x.addEventListener("click",function(event){
        cards.splice(cards.indexOf(cards.find(({Name}) => Name === event.target.closest("div").querySelector("h4").getAttribute("cardname"))),1)
        event.target.closest("div").remove()
        localStorage.setItem("cards",JSON.stringify(cards))
      })

    )

    document.getElementById("start").addEventListener("click", beginCards)
  }
}

/* game setup
---------------------------------------------------------------------------------------------------- */
document.body.insertAdjacentHTML("afterbegin","<button class='btn'>toggle dark</button>")
document.querySelector(".btn").addEventListener("click", function () {
  if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
});

/* Starting code that displays the gamemodes */
pets.forEach((x) =>
  document.querySelector(".cardholder").insertAdjacentHTML("afterbegin",
    `<div class="card">
      <h1>${x}</h1>
      <button class="selector">Select</button>
    </div>`)
);

/* gamemode buttons event maker */
document.querySelectorAll(".selector").forEach((x) =>
  x.addEventListener("click", function (event) {
    selectedMode = event.target.closest(".card").querySelector("h1").textContent;
    beginGame(selectedMode);
  })
);

