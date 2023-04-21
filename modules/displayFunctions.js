"use strict";
import { showDetailDialog, showUpdateDialog } from "./dialogAndForms.js";
import { getData, deleteCharacter } from "../script.js";
import { DataURL } from "../script.js";

/* ========== Functions to display characters ========== */
export async function updateCharacterGrid() {
    try {    
        const characters = await getData(DataURL);
        document.querySelector("#characters").innerHTML = "";
        showAllCharacters(characters);
    }
    catch (err) {
        throw new Error(`Error at updateCharacterGrid: ${err}`)
    }
}
function showAllCharacters(characters) {
    for (const character of characters) {
        showCharacter(character);
    }
}
function showCharacter(character) {
    const myHTML = /*html*/`
    <article>
        <div>
            <figure>
                <img src="${character.image}" alt="">
            </figure>
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
    document.querySelector("#characters").insertAdjacentHTML("afterbegin", myHTML);
    document.querySelector("#characters article:first-child").addEventListener("click", () => showDetailDialog(character));
    document.querySelector("#characters article:first-child div button:first-child").addEventListener("click", (event) => { event.stopPropagation(); deleteCharacter(character.id).then().catch() });
    document.querySelector("#characters article:first-child div button:last-child").addEventListener("click", (event) => { event.stopPropagation(); showUpdateDialog(character) });
}