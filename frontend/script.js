"use strict";
import { showCreateDialog } from "./modules/dialogAndForms.js";
import { updateCharacterGrid } from "./modules/displayFunctions.js";

window.addEventListener("load", main);

export const DataURL = "/api/character";

function main() {
    document.querySelector("#add-character-dialog-button").addEventListener("click", showCreateDialog);
    
    document.querySelector("#create-cancel-button").addEventListener("click", () => {
        document.querySelector("#form-create").parentElement.close();
    });
    document.querySelector("#update-cancel-button").addEventListener("click", () => {
        document.querySelector("#form-update").parentElement.close();
    });
    updateCharacterGrid();
}
/* ========== CREATE ========== */
export async function createCharacter(character) {
    try {
        const res = await fetch(DataURL + "/add", {
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
                religon: character.religion,
                catchPhrase: character.catchPhrase,
                hairColor: character.hairColor,
                schoolGrade: character.schoolGrade,
                episodes: character.episodes,
                appearances: character.appearances,
                firstAppearance: character.firstAppearance
            })
        });
        if (res.ok) {
            console.log("Character added.");
            updateCharacterGrid();
        }
        else{
            throw new Error("Response not ok");
        }
    }
    catch (err) {
        throw err;
    }
}
/* ========== READ ALL ========== */
export async function getData() {
    try {
        const res = await fetch(DataURL);
        if (!res.ok) {
            throw new Error("Response not ok");
        }
        const data = (await res.json()).response;
        return data;
    }
    catch (err) {
        throw err;
    }
}
/* ========== READ ONE ========== */
export async function getCharacter(charID) {
    try {
        const res = await fetch(DataURL + "/show/" + charID, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                characterID: charID
            })
        });
        if (!res.ok) {
            throw new Error("Response not ok");
        }
        const data = (await res.json()).response;
        return data;
    }
    catch (err) {
        throw err;
    }
}
/* ========== UPDATE ========== */
export async function updateCharacter(character) {
    try {
        const res = await fetch(DataURL + "/update/" + character._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                characterID: character.id,
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
            console.log("Character updated.");
            console.log(character);
            document.querySelector("#form-update").parentElement.close();
            updateCharacterGrid();
        }
        else{
            throw new Error("Response not ok");
        }
    }
    catch (err) {
        throw err;
    }
}
/* ========== DELETE ========== */
export async function deleteCharacter(charID) {
    try {
        const res = await fetch(DataURL + "/delete/" + charID, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                characterID: charID
            })
        });
        if (res.ok) {
            console.log("Character deleted");
            updateCharacterGrid();
        }
        else{
            throw new Error("Response not ok");
        }
    }
    catch (err) {
        throw err;
    }
}