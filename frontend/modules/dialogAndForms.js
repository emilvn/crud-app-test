"use strict";
import { isUndefined, validate } from "./validation.js";
import { createCharacter, getCharacter, updateCharacter } from "../script.js";

/* ========== show detailed dialog on character box click ========== */
export async function showDetailDialog(character) {
    const dialog = document.querySelector("#detail-dialog");   
    const updatedCharacter = await getCharacter(character._id);
    console.log(updatedCharacter);
    /* ===== character information ===== */
    for (let key in updatedCharacter) {
        if ((!updatedCharacter[key] || isUndefined(updatedCharacter[key])) && key[0] !== "_") {
            dialog.querySelector(`#dialog-${key.toLowerCase()}`).parentNode.style.display = "none";
        }
        switch (key.toLowerCase()) {
            case "_id":
            case "__v":
                break;
            case "image":
                dialog.querySelector("figure").innerHTML = /*html*/`<img id="dialog-image" src="${updatedCharacter[key]}">`;
                break;
            case "catchphrase":
                dialog.querySelector("#dialog-catchphrase").textContent = `"${updatedCharacter[key]}"`;
                break;
        
            case "voicedby":
                dialog.querySelector("#dialog-voicedby").textContent = `${updatedCharacter.name} is voiced by ${updatedCharacter[key]}`;
                break;
            case "episodes":
                dialog.querySelector("#dialog-episodes").textContent = (updatedCharacter[key].length > 40)?updatedCharacter[key].substring(0, 40)+"...":updatedCharacter[key];
                break;
            default:
                dialog.querySelector(`#dialog-${key.toLowerCase()}`).textContent = updatedCharacter[key];
                break;
        }
    }
    /* ===== Show dialog ===== */
    document.querySelector("#detail-dialog").showModal();

    /* ===== reset hidden elements on dialog close ===== */
    dialog.querySelector("#cancel-btn").addEventListener("click", resetInfoDisplayMode);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            resetInfoDisplayMode();
        }
    }); 
}
/* ========== resets all elements with display none in detail dialog ========== */
function resetInfoDisplayMode() {
    const characterInfoElements = document.querySelectorAll(".character-info");
    for (let i = 0; i < characterInfoElements.length; i++){
        characterInfoElements[i].style.display = "block";
    }
}
/* ========== show form dialog for adding character ========== */
export function showCreateDialog() {
    const form = document.querySelector("#form-create");
    form.querySelector("#create-button").addEventListener("click", () => submitForm("create"));
    form.parentElement.showModal();
}
/* ========== show form dialog for updating character ========== */
export function showUpdateDialog(character){
    const form = document.querySelector("#form-update");
    form.name.value = character.name;
    form.nickname.value = character.nickname;
    form.image.value = character.image;
    form.occupation.value = character.occupation;
    form.age.value = character.age;
    form.voicedBy.value = character.voicedBy;
    form.gender.value = character.gender;
    form.religion.value = character.religion;
    form.catchPhrase.value = character.catchPhrase;
    form.hairColor.value = character.hairColor;
    form.schoolGrade.value = character.schoolGrade;
    form.episodes.value = character.episodes;
    form.appearances.value = character.appearances;
    form.firstAppearance.value = character.firstAppearance;
    form.querySelector("#update-button").addEventListener("click", ()=> submitForm("update", character._id));
    form.parentElement.showModal();
}
/* ========== submit character data to create/update ========== */
async function submitForm(mode, characterID=null) {
    //mode is create or update//
    const form = document.querySelector(`#form-${mode}`);
    if (validate(mode)) {
        const newChar = {};
        if (characterID) newChar.id = characterID;
        newChar.name = form.name.value;
        newChar.nickname = form.nickname.value;
        newChar.image = form.image.value;
        newChar.occupation = form.occupation.value;
        newChar.age = Number(form.age.value);
        newChar.voicedBy = form.voicedBy.value;
        newChar.gender = form.gender.value;
        newChar.religion = form.religion.value;
        newChar.catchPhrase = form.catchPhrase.value;
        newChar.hairColor = form.hairColor.value;
        newChar.schoolGrade = form.schoolGrade.value;
        newChar.episodes = form.episodes.value;
        newChar.appearances = Number(form.appearances.value);
        newChar.firstAppearance = form.firstAppearance.value;
        if (mode === "create") await createCharacter(newChar);
        if (mode === "update") await updateCharacter(newChar);
        form.parentElement.close();
        form.reset();
    }
}