export const handleOver = (word, length) => {
    return word && word.length > length ? `${word.substr(0, length)}...` : word;
};
