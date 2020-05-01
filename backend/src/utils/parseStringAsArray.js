module.exports = function parseStringAsArrar(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}