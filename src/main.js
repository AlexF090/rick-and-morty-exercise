const button = document.querySelector("#fetch-data");
const baseUrl = "https://rickandmortyapi.com/api/character?page=";
const numPages = 5;

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1));

button.addEventListener("click", () => {
  const promises = urls.map((url) => fetch(url).then((res) => res.json()));
  console.log(promises);

  Promise.all(promises).then((pages) => {
    const characters = pages.flatMap((page) => page.results);
    console.log(characters);
    characters.forEach(renderCharacter);
  });
});

function renderCharacter(character) {
  const frame = document.createElement("li");
  const img = document.createElement("img");
  const name = document.createElement("p");
  frame.classList.add("card");
  img.setAttribute("src", character.image);
  img.setAttribute("alt", "Profile picture");
  name.textContent = character.name;
  frame.append(img);
  frame.append(name);
  document.querySelector("#container").append(frame);
}
