window.onload = init;

function init() {
  addBens();
  window.addEventListener("scroll", scrollListener);
}

function scrollListener(e) {
  if (window.scrollMaxY - window.scrollY < 500) {
    addBens();
  }
}

function addBens() {
  console.log("Add ben");
  const main = document.querySelector("main");
  main.innerHTML += benTextContent();
}

function benTextContent() {
  return Array.from(
    { length: 1000 },
    (_, i) => i % 6 === 5 ?
      `<a href="/lander.html" class="rainbow-5"> Ben </a>` :
      `<span class="rainbow-${i % 6}"> Ben </span>`
  ).join("");
}
