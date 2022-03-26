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
  const name = document.createElement("h2");
  const id = document.createElement("h3");
  const status = document.createElement("p");
  const species = document.createElement("p");
  const type = document.createElement("p");
  const gender = document.createElement("p");
  const originLocation = document.createElement("p");
  const endpointLocation = document.createElement("p");
  const listOfEpisode = document.createElement("p");
  const createdInDatabase = document.createElement("p");
  frame.classList.add("card");
  //Profile picture
  img.setAttribute("src", character.image);
  img.setAttribute("alt", "Profile picture");
  //Char Name
  name.textContent = character.name;
  //Char ID
  id.textContent = character.id;
  //Char status
  status.textContent = character.status;
  //Char species
  species.textContent = character.species;
  //Char type
  type.textContent = character.type;
  //Char gender
  gender.textContent = character.gender;
  // originLocation
  originLocation.textContent = character.origin.name;
  //endpointLocation
  endpointLocation.textContent = character.location.name;
  // listOfEpisode
//Later!!!
  //createdInDatabase
  createdInDatabase.textContent = character.created;
  frame.append(img);
  frame.append(id);
  frame.append(name);
  frame.append(status);
  frame.append(species);
  frame.append(type);
  frame.append(gender);
  frame.append(originLocation);
  frame.append(endpointLocation);
  frame.append(listOfEpisode);
  frame.append(createdInDatabase);
  document.querySelector("#container").append(frame);
}
