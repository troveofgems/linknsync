export const optionSelected = (str: string): boolean => {
    if (!str) { return false; }
    return str === "on";
};