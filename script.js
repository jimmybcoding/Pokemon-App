const pokemonSearch = document.getElementById("pokemonSearch");
const pokemonImg = document.getElementById("pokemonImg");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specAttack = document.getElementById("specAttack");
const specDefense = document.getElementById("specDefense");
const speed = document.getElementById("speed");
const appContainer = document.getElementById("appContainer");
const statContainer = document.getElementById("statContainer");
const pokemonType = document.getElementById("pokemonType");
const placeholderButton = document.getElementById("placeholderButton");

//if user attempts to click toggle shiny button before first pokemon is loaded
placeholderButton.addEventListener("click", () => {
  alert("Please search a Pokemon first");
});

pokemonSearch.addEventListener("change", (e) => {
  let pokemon = e.target.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`, { mode: "cors" })
    .then(function (response) {
      //reset stats/type between searches
      statContainer.style.color = "black";
      pokemonType.innerText = "TYPE:";
      return response.json();
    })
    .then(function (response) {
      //log response and set the searched pokemon sprite
      console.log(response);
      pokemonImg.src = response.sprites.front_default;
      appContainer.lastElementChild.replaceWith(pokemonImg);

      //set dynamic styling of the type div depending on pokemon
      for (let i = 0; i <= response.types.length - 1; i++) {
        pokemonType.innerText += ` ${[i + 1]} ${response.types[
          i
        ].type.name.toUpperCase()}`;
        response.types[0].type.name == "fire"
          ? (pokemonType.style.cssText = "background-color: red; color: white")
          : response.types[0].type.name == "water"
          ? (pokemonType.style.cssText =
              "background-color: royalblue; color: white")
          : response.types[0].type.name == "grass"
          ? (pokemonType.style.cssText =
              "background-color: green; color: white")
          : response.types[0].type.name == "normal"
          ? (pokemonType.style.cssText =
              "background-color: beige; color: black")
          : response.types[0].type.name == "electric"
          ? (pokemonType.style.cssText =
              "background-color: yellow; color: black")
          : response.types[0].type.name == "flying"
          ? (pokemonType.style.cssText = "background-color: grey; color: black")
          : response.types[0].type.name == "fighting"
          ? (pokemonType.style.cssText =
              "background-color: brown; color: white")
          : response.types[0].type.name == "psychic"
          ? (pokemonType.style.cssText =
              "background-color: purple; color: white")
          : response.types[0].type.name == "bug"
          ? (pokemonType.style.cssText =
              "background-color: greenyellow; color: black")
          : response.types[0].type.name == "poison"
          ? (pokemonType.style.cssText =
              "background-color: fuchsia; color: black")
          : response.types[0].type.name == "steel"
          ? (pokemonType.style.cssText =
              "background-color: lightsteelblue; color: black")
          : response.types[0].type.name == "fairy"
          ? (pokemonType.style.cssText = "background-color: pink; color: black")
          : response.types[0].type.name == "dragon"
          ? (pokemonType.style.cssText =
              "background-color: lightseagreen; color: black")
          : response.types[0].type.name == "ground"
          ? (pokemonType.style.cssText =
              "background-color: sandybrown; color: black")
          : response.types[0].type.name == "rock"
          ? (pokemonType.style.cssText =
              "background-Color: saddlebrown; color: white")
          : response.types[0].type.name == "ice"
          ? (pokemonType.style.cssText = "background-Color: skyblue; color: ")
          : response.types[0].type.name == "ghost"
          ? (pokemonType.style.cssText =
              "background-color: darkorchid; color: white")
          : response.types[0].type.name == "dark"
          ? (pokemonType.style.cssText =
              "background-color: black; color: white;")
          : (pokemonType.style.backgroundColor = "white");
      }

      //set base stats
      hp.innerText = `Hp: ${response.stats[0].base_stat}`;
      attack.innerText = `Attack: ${response.stats[1].base_stat}`;
      defense.innerText = `Defense: ${response.stats[2].base_stat}`;
      specAttack.innerText = `Special-Attack: ${response.stats[3].base_stat}`;
      specDefense.innerText = `Special-Defense: ${response.stats[4].base_stat}`;
      speed.innerText = `Speed: ${response.stats[5].base_stat}`;

      //set shiny toggle button
      const toggleShiny = document.createElement("button");
      toggleShiny.innerText = "Toggle Shiny Sprite";
      toggleShiny.classList.add("toggle-shiny");
      appContainer.appendChild(toggleShiny);

      //change pokemon sprite source using ternary operator
      toggleShiny.addEventListener("click", () => {
        pokemonImg.src == response.sprites.front_default
          ? (pokemonImg.src = response.sprites.front_shiny)
          : (pokemonImg.src = response.sprites.front_default);
      });

      //set up the stat colours
      statCheck();
    })
    .catch(function (error) {
      console.log(error);
      alert(
        `Something went wrong... Maybe a spelling error? (${pokemon}) Please try again.`
      );
    });
});

/* function that converts the innerText of each base stat to an array to separate the text from number 
then checks the base stat against 100/50 and styles accordingly to indicate if the stat is low/med/high */

const statCheck = () => {
  stats = document.querySelectorAll(".stat");
  stats.forEach((stat) => {
    let statToArray = stat.innerText.split(" ");
    Number(statToArray[1]) >= 100
      ? (stat.style.color = "#148809")
      : Number(statToArray[1]) >= 50
      ? (stat.style.color = "black")
      : (stat.style.color = "#8f0d0d");
  });
};