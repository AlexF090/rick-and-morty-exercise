const button = document.querySelector("#fetch-data");

const dropdown = document.querySelector("#header__filter");
const baseUrl = "https://rickandmortyapi.com/api/character?page=";
const numPages = 5;

// Fetch data

const urls = Array(numPages)
  .fill() // [undefined, undefined, ...]
  .map((_, index) => baseUrl + (index + 1));

button.addEventListener("click", () => {
  document.querySelector('#container').innerHTML='';

  const promises = urls.map((url) => fetch(url).then((res) => res.json()));
  console.log(promises);

  Promise.all(promises).then((pages) => {
    const characters = pages.flatMap((page) => page.results);
    console.log(characters);
    characters.forEach(filterCharacter);
  });
});

// Render Cards
function renderCharacter(character) {
  const frame = document.createElement("li");
  const img = document.createElement("img");
  const name = document.createElement("h2");
  
  const status = document.createElement("p");
 
  const gender = document.createElement("p");
 

  
 
  frame.classList.add("card");
  //Profile picture
  img.setAttribute("src", character.image);
  img.setAttribute("alt", "Profile picture");
  //Char Name
  name.textContent = character.name;
  //Char status
  status.textContent = `Status: ${character.status}`;
  //Char gender
  gender.textContent = `Gender: ${character.gender}`;
  frame.append(img);
  frame.append(name);
  frame.append(status);
  frame.append(gender);
  document.querySelector("#container").append(frame);
}
// }

// Filter Cards

function filterCharacter(character) {
  const characterSearch = character.name.includes(document.querySelector('#name').value);
    if (dropdown.value === 'All' && characterSearch){
      renderCharacter(character)
    }
else if(dropdown.value === character.status && characterSearch){
        renderCharacter(character)
      }
}

//Top Button

window.addEventListener("scroll", () => {
  var scroll = document.querySelector(".scrollTop");
  scroll.classList.toggle("active", window.scrollY > 500);
});

const topButton = document.querySelector('[data-btn="topButton"]');
topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});