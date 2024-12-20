 const removeSpacesAndSpecialChars = (input: string): string => {
    return input.replace(/[\s\W]+/g, '');
};

export default removeSpacesAndSpecialChars;
  