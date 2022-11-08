window.onload = init;

function init() {
  addBens();
  window.addEventListener("scroll", scrollListener);
}

function scrollListener() {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.querySelector("#main");
  if (scrollHeight - scrollY - innerHeight < 500) {
    addBens();
  }
}

function addBens() {
  const main = document.querySelector("main");
  main.innerHTML += benTextContent();
}

function benTextContent() {
  return Array.from(
    { length: 1000 },
    (_, i) => i % 6 === 5 ?
      "<a href=\"/lander\" class=\"rainbow-5\"> Ben</a>" :
      `<span class="rainbow-${i % 6}"> Ben</span>`
  ).join("");
}
