"use strict";
window.addEventListener("load", main);

async function main() {
    const DataURL = "test.json";
    const characters = await fetchData(DataURL);
    showAllCharacters(characters);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response not ok");
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        throw err;
    }
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
    </article>
    `;
    document.querySelector("#characters").insertAdjacentHTML("beforeend", myHTML);
}