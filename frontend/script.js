"use strict";
window.addEventListener("load", main);

const DataURL = "/api/character";

function main() {
    document.querySelector("#submit-button").addEventListener("click", formSubmit);
    updateCharacterGrid();
}
/* ========== Funcs to display characters ========== */
async function updateCharacterGrid() {
    const characters = await getData(DataURL);
    document.querySelector("#characters").innerHTML = "";
    showAllCharacters(characters);
}
function showAllCharacters(arr) {
    for (const obj of arr) {
        showCharacter(obj);
    }
}
function showCharacter(obj) {
    const myHTML = /*html*/`
    <article>
        <img src="${obj.image}">
        <h2>${obj.name}</h2>
        <p>a.k.a "${obj.nickname}"</p>
        <p>${obj.occupation}</p>
        <p>${obj.age} years old</p>
        <div>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    </article>
    `;
    document.querySelector("#characters").insertAdjacentHTML("beforeend", myHTML);
    document.querySelector("#characters article:last-child div button:first-child").addEventListener("click", () => deleteCharacter(obj._id));
    document.querySelector("#characters article:last-child div button:last-child").addEventListener("click", () => updateCharacter(obj._id));
}

/* ========== user input related funcs ========== */
async function formSubmit() {
    if (validate()) {
        const newChar = {};
        newChar.name = document.querySelector("#name").value;
        newChar.nickname = document.querySelector("#nickname").value;
        newChar.occupation = document.querySelector("#occupation").value;
        newChar.image = document.querySelector("#image").value;
        newChar.age = Number(document.querySelector("#age").value);
        await createCharacter(newChar);
        updateCharacterGrid();
        document.querySelector("form").reset();
    }
}
function validate() {
    const charName = document.querySelector("#name").value;
    const charNickname = document.querySelector("#nickname").value;
    const charOccupation = document.querySelector("#occupation").value;
    const charImage = document.querySelector("#image").value;
    const charAge = document.querySelector("#age").value;

    const nameValueError = document.querySelector("#nameValueError");
    const nicknameValueError = document.querySelector("#nicknameValueError");
    const occupationValueError = document.querySelector("#occupationValueError");
    const imageValueError = document.querySelector("#imageValueError");
    const ageValueError = document.querySelector("#ageValueError");

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
async function createCharacter(obj) {
    try {
        const res = await fetch(DataURL + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: obj.name,
                nickname: obj.nickname,
                occupation: obj.occupation,
                image: obj.image,
                age: obj.age
            })
        });
        if (!res.ok) {
            throw new Error("Response not ok");
        }
        console.log("Character added.")
    }
    catch (err) {
        throw err;
    }
}
/* ========== READ ========== */
async function getData() {
    try {
        const res = await fetch(DataURL);
        if (!res.ok) {
            throw new Error("Response not ok");
        }
        const data = (await res.json()).response;
        console.log(data);
        return data;
    }
    catch (err) {
        throw err;
    }
}
/* ========== UPDATE ========== */
async function updateCharacter(charID) {
    console.log(charID);
    // To-do: Take user input for changes to character info
    // To-do: make post request to api/character/update with charID and the updated character info
    // To-do: update character grid with the new info
}
/* ========== DELETE ========== */
async function deleteCharacter(charID) {
    try {
        const res = await fetch(DataURL + "/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                characterID: charID
            })
        });
        if (!res.ok) {
            throw new Error("Response not ok");
        }
        console.log("Character deleted");
        updateCharacterGrid();
    }
    catch (err) {
        throw err;
    }
}