const pets = [
    "square",
    "circle",
    "triangle"
];
pets.forEach((x) =>
  document.querySelector(".cardholder").insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
    <img class="petpic" src="pets/${x}.png" alt="${x}">
      <h1>${x}</h1>
      <button class="selector">hi</button>
    </div>
    `
  )
);
