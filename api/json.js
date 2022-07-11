const fs = require('fs')

module.exports = {
    readJson, writeJson
}

/**
 * Reads json from a file and calls a callback
 *
 * @param path {string} File path
 * @param callback {(object) => void} Callback
 */
function readJson(path, callback) {
    const pathSplit = path.replace('\\', '/').split('/')

    if (pathSplit.length >= 2) {
        createDirectoryIfNotExist(pathSplit[pathSplit.length - 2])
    }

    fs.readFile(path, {flag: 'a+', encoding: 'utf-8'}, (error, data) => {
        if (error) {
            console.log(error)
            callback(null)

            writeJson(path, {})

            return
        }

        if (data === '') {
            callback(null)

            return
        }

        data = data.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")
            .replace(/[\u0000-\u0019]+/g, "");

        try {
            callback(JSON.parse(data))
        } catch (ex) {
            writeJson(path, {})
        }
    })
}

/**
 * Writes json to file
 *
 * @param path {string} File path
 * @param json {object} Json object
 */
function writeJson(path, json) {
    const pathSplit = path.replace('\\', '/').split('/')

    if (pathSplit.length >= 2) {
        createDirectoryIfNotExist(pathSplit[pathSplit.length - 2])
    }

    fs.writeFile(path, JSON.stringify(json), error => {
        if (error) {
            console.log(error)
        }
    })
}

/**
 * @param path {string} Directory path
 */
function createDirectoryIfNotExist(path) {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}