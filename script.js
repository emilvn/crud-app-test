"use strict";
import { showCreateDialog } from "./modules/dialogAndForms.js";
import { updateCharacterGrid } from "./modules/displayFunctions.js";

window.addEventListener("load", main);

export const DataURL = "https://forms-rest-crud-default-rtdb.europe-west1.firebasedatabase.app/characters";

async function main() {
    document.querySelector("#add-character-dialog-button").addEventListener("click", showCreateDialog);
    
    document.querySelector("#create-cancel-button").addEventListener("click", () => {
        document.querySelector("#form-create").parentElement.close();
    });
    document.querySelector("#update-cancel-button").addEventListener("click", () => {
        document.querySelector("#form-update").parentElement.close();
    });
    await updateCharacterGrid();
}
/* ========== CREATE ========== */
export async function createCharacter(character) {
    try {
        const res = await fetch(DataURL + ".json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: character.name,
                nickname: character.nickname,
                image: character.image,
                occupation: character.occupation,
                age: character.age,
                voicedBy: character.voicedBy,
                gender: character.gender,
                religion: character.religion,
                catchPhrase: character.catchPhrase,
                hairColor: character.hairColor,
                schoolGrade: character.schoolGrade,
                episodes: character.episodes,
                appearances: character.appearances,
                firstAppearance: character.firstAppearance
            })
        });
        if (res.ok) {
            console.log("Character added!");
            await updateCharacterGrid();
        }
    }
    catch (err) {
        throw new Error(`Error at createCharacter: ${err}`);
    }
}
/* ========== READ ALL ========== */
export async function getData() {
    try {
        const res = await fetch(DataURL + ".json");
        if (res.ok) {
            const data = await res.json();
            console.log("Character data retrieved successfully!")
            return prepareCharacterData(data);
        }
    }
    catch (err) {
        throw new Error(`Error at getData ${err}`);
    }
}
function prepareCharacterData(obj) {
    const dataArr = [];
    for (const key in obj) {
        const character = obj[key];
        character["id"] = key;
        dataArr.push(character);
    }
    return dataArr;
}
/* ========== READ ONE ========== */
export async function getCharacter(charID) {
    try {
        const res = await fetch(DataURL + "/" + charID + ".json");
        if (res.ok) {
            console.log(`Character with id: ${charID} retrieved successfully!`);
            return await res.json();
        }
    }
    catch (err) {
        throw new Error(`Error at getCharacter: ${err}`);
    }
}
/* ========== UPDATE ========== */
export async function updateCharacter(character) {
    try {
        const res = await fetch(DataURL + "/" + character.id + ".json", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: character.name,
                nickname: character.nickname,
                image: character.image,
                occupation: character.occupation,
                age: character.age,
                voicedBy: character.voicedBy,
                gender: character.gender,
                religion: character.religion,
                catchPhrase: character.catchPhrase,
                hairColor: character.hairColor,
                schoolGrade: character.schoolGrade,
                episodes: character.episodes,
                appearances: character.appearances,
                firstAppearance: character.firstAppearance
            })
        });
        if (res.ok) {
            console.log("Character updated!");
            document.querySelector("#form-update").parentElement.close();
            await updateCharacterGrid();
        }
    }
    catch (err) {
        throw new Error(`Error at updateCharacter: ${err}`);
    }
}
/* ========== DELETE ========== */
export async function deleteCharacter(charID) {
    try {
        const res = await fetch(DataURL + "/" + charID + ".json", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            });
        if (res.ok) {
            console.log("Character deleted!");
            await updateCharacterGrid();
        }
    }
    catch (err) {
        throw new Error(`Error at deleteCharacter: ${err}`);
    }
}