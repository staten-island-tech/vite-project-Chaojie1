const pets = [
    "square",
    "circle",
    "triangle"
];
pets.forEach((x) =>
  document.querySelector(".cardholder").insertAdjacentHTML(
    "afterbegin",
    `<h1 class="card">hi</h1>`
  )
);
