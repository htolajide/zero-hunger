export default {
    capitalizeWord: (word) => {
        let wordArray = word.split(' ')
        if (wordArray.length === 1) return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
        let capArray = wordArray.map( text => text.replace(text[0], text[0].toUpperCase()));
        return capArray.join(' ');
    }
}