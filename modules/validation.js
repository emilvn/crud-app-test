"use strict";
export function isUndefined(value) {
    const undefinedValues = ["unknown", "undefined", "n/a", "none", "", "nothing", "-", "no data", "null"];
    return undefinedValues.includes(String(value).toLowerCase());
}