"use strict";
import { showDetailDialog, showUpdateDialog } from "./dialogAndForms.js";
import { getData, deleteCharacter } from "../frontend/script.js";
import { DataURL } from "../frontend/script.js";

/* ========== Funcs to display characters ========== */
export async function updateCharacterGrid() {
    const characters = await getData(DataURL);
    document.querySelector("#characters").innerHTML = "";
    showAllCharacters(characters);
}
function showAllCharacters(characters) {
    for (const character of characters) {
        showCharacter(character);
    }
}
function showCharacter(character) {
    const myHTML = /*html*/`
    <article>
        <figure>
            <img src="${character.image}">
        </figure>
        <div>
            <h2>${character.name}</h2>
            <p>${(character.nickname)?"a.k.a \"" + character.nickname + "\"": ""}</p>
            <p>${character.occupation}</p>
            <p>${(character.age)?character.age + " years old": ""}</p>
        </div>
        <div>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    </article>
    `;
    document.querySelector("#characters").insertAdjacentHTML("beforeend", myHTML);
    document.querySelector("#characters article:last-child").addEventListener("click", () => showDetailDialog(character));
    document.querySelector("#characters article:last-child div button:first-child").addEventListener("click", () => { event.stopPropagation(); deleteCharacter(character.id) });
    document.querySelector("#characters article:last-child div button:last-child").addEventListener("click", () => { event.stopPropagation(); showUpdateDialog(character) });
}