"use strict";
window.addEventListener("load", main);

const DataURL = "/api/character";

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
/* ========== Funcs to display characters ========== */
async function updateCharacterGrid() {
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
        <h2>${character.name}</h2>
        <p>a.k.a "${character.nickname}"</p>
        <p>${character.occupation}</p>
        <p>${character.age} years old</p>
        <div>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    </article>
    `;
    document.querySelector("#characters").insertAdjacentHTML("beforeend", myHTML);
    document.querySelector("#characters article:last-child div button:first-child").addEventListener("click", () => deleteCharacter(character._id));
    document.querySelector("#characters article:last-child div button:last-child").addEventListener("click", () => showUpdateDialog(character));
}

function showCreateDialog() {
    const form = document.querySelector("#form-create");
    form.parentElement.showModal();
    form.querySelector("#create-button").addEventListener("click", () => createFormSubmit("create"));
}

function showUpdateDialog(character){
    const form = document.querySelector("#form-update");
    form.name.value = character.name;
    form.nickname.value = character.nickname;
    form.occupation.value = character.occupation;
    form.image.value = character.image;
    form.age.value = character.age;
    form.querySelector("#update-button").addEventListener("click", ()=> {
        if(validate("update")){
            const newChar = {
                id: character._id,
                name: form.name.value,
                nickname: form.nickname.value,
                occupation: form.occupation.value,
                image: form.image.value,
                age: form.age.value,};
            updateCharacter(newChar)
        }
    });
    form.parentElement.showModal();
}


async function createFormSubmit() {
    if (validate("create")) {
        const newChar = {};
        newChar.name = document.querySelector("#name-create").value;
        newChar.nickname = document.querySelector("#nickname-create").value;
        newChar.occupation = document.querySelector("#occupation-create").value;
        newChar.image = document.querySelector("#image-create").value;
        newChar.age = Number(document.querySelector("#age-create").value);
        if(mode === "create") await createCharacter(newChar);
        document.querySelector("#form-create").reset();
    }
}
function validate(mode) {
    //mode is create or update//
    const charName = document.querySelector(`#name-${mode}`).value;
    const charNickname = document.querySelector(`#nickname-${mode}`).value;
    const charOccupation = document.querySelector(`#occupation-${mode}`).value;
    const charImage = document.querySelector(`#image-${mode}`).value;
    const charAge = document.querySelector(`#age-${mode}`).value;

    const nameValueError = document.querySelector(`#form-${mode} .nameValueError`);
    const nicknameValueError = document.querySelector(`#form-${mode} .nicknameValueError`);
    const occupationValueError = document.querySelector(`#form-${mode} .occupationValueError`);
    const imageValueError = document.querySelector(`#form-${mode} .imageValueError`);
    const ageValueError = document.querySelector(`#form-${mode} .ageValueError`);

    const urlRegEx = /^https?:\/\/.+\..+\/.+\.(png|jpg|gif)$/;
    let isValid = true;
    
    if (!charName) {
        isValid = false;
        nameValueError.classList.remove("hidden");
    } else {
        if (!nameValueError.classList.contains("hidden")) {
            nameValueError.classList.add("hidden");
        }
    }

    if (!charNickname) {
        isValid = false;
        nicknameValueError.classList.remove("hidden");
    } else {
        if (!nicknameValueError.classList.contains("hidden")) {
            nicknameValueError.classList.add("hidden");
        }
    }

    if (!charOccupation) {
        isValid = false;
        occupationValueError.classList.remove("hidden");
    } else {
        if (!occupationValueError.classList.contains("hidden")) {   
            occupationValueError.classList.add("hidden");
        }
    }

    if (!charImage || !urlRegEx.test(charImage)) {
        isValid = false;
        imageValueError.classList.remove("hidden");
    } else {
        if (!imageValueError.classList.contains("hidden")) {   
            imageValueError.classList.add("hidden");
        }
    }

    if (!charAge || isNaN(charAge) || Number(charAge) <= 0) {
        isValid = false;
        ageValueError.classList.remove("hidden");
    } else {
        if (!ageValueError.classList.contains("hidden")) {   
            ageValueError.classList.add("hidden");
        }
    }

    return isValid;
}
/* ========== CREATE ========== */
async function createCharacter(character) {
    try {
        const res = await fetch(DataURL + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: character.name,
                nickname: character.nickname,
                occupation: character.occupation,
                image: character.image,
                age: character.age
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
async function getData() {
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
/* ========== READ ALL ========== */
async function getSpecificData(charID) {
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
async function updateCharacter(character) {
    try {
        const res = await fetch(DataURL + "/update/" + character._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                characterID: character.id,
                name: character.name,
                nickname: character.nickname,
                occupation: character.occupation,
                image: character.image,
                age: character.age
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
async function deleteCharacter(charID) {
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