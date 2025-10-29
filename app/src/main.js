const pets = ["square", "circle", "triangle"];
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
document.querySelectorAll(".selector").forEach((x) =>
  x.addEventListener("click", function (event) {
    document.querySelector(".cardholder").innerHTML = "";
  })
);
