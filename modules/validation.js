"use strict";
export function isUndefined(value) {
    const undefinedValues = ["unknown", "undefined", "n/a", "none", "", "nothing", "-", "no data", "null"];
    return undefinedValues.includes(String(value).toLowerCase());
}
export function validate(mode) {
    //mode is create or update//
    const charName = document.querySelector(`#name-${mode}`).value;
    const charImage = document.querySelector(`#image-${mode}`).value;
    const charEpisodes = document.querySelector(`#episodes-${mode}`).value;
    const charAppearances = document.querySelector(`#appearances-${mode}`).value;
    const charFirstAppearance = document.querySelector(`#firstAppearance-${mode}`).value;

    const nameValueError = document.querySelector(`#form-${mode} .nameValueError`);
    const imageValueError = document.querySelector(`#form-${mode} .imageValueError`);
    const episodesValueError = document.querySelector(`#form-${mode} .episodesValueError`);
    const appearancesValueError = document.querySelector(`#form-${mode} .appearancesValueError`);
    const firstAppearanceValueError = document.querySelector(`#form-${mode} .firstAppearanceValueError`);

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
    if (!charImage || !urlRegEx.test(charImage)) {
        isValid = false;
        imageValueError.classList.remove("hidden");
    } else {
        if (!imageValueError.classList.contains("hidden")) {   
            imageValueError.classList.add("hidden");
        }
    }
    if (!charEpisodes) {
        isValid = false;
        episodesValueError.classList.remove("hidden");
    } else {
        if (!episodesValueError.classList.contains("hidden")) {
            episodesValueError.classList.add("hidden");
        }
    }
    if (!charFirstAppearance) {
        isValid = false;
        firstAppearanceValueError.classList.remove("hidden");
    } else {
        if (!firstAppearanceValueError.classList.contains("hidden")) {   
            firstAppearanceValueError.classList.add("hidden");
        }
    }
    if (!charAppearances || isNaN(charAppearances) || Number(charAppearances) <= 0) {
        isValid = false;
        appearancesValueError.classList.remove("hidden");
    } else {
        if (!appearancesValueError.classList.contains("hidden")) {   
            appearancesValueError.classList.add("hidden");
        }
    }
    return isValid;
}