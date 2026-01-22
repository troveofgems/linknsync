export const camelToTwoWords = (str: string) => {
    if (!str) { return ''; }

    const index = str.search(/[A-Z]/);
    // If no uppercase letter found, return original string
    if (index === -1) {
        return str;
    }

    // Split into two words at the first uppercase letter
    return str.slice(0, index) + ' ' + str.slice(index);
};

export const addEllipsis = (str: string, maxLength = 10) => {
    if (str.length > maxLength) {
        // Subtract 3 from maxLength to account for the "..."
        return str.substring(0, maxLength - 3) + '...';
    }
    return str;
}