const express = require('express');
const router = new express.Router();
var reqp = require('request-promise');

// router.get('/data', async (req, res) => {
//     try {

//         res.status(200).send('tasks')
//     } catch (e) {
//         res.status(500).send()
//     }
// })


router.get('/data', (req, res) => {
    debugger;
    let number = req.query.number;
    var options = {
        uri: 'https://terriblytinytales.com/test.txt',
        json: true // Automatically parses the JSON string in the response
    };

    reqp(options)
        .then(x => {
            var arraywords = split(x);
            var modifiedwords = modifyword(arraywords);
            var responseArray = sort(modifiedwords);
            var items = responseArray.slice(0, number)
            res.send(items);
        })
        .catch(err => {
            console.log(err)
        })

    debugger

})

function split(text) {
    // split string
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}

function modifyword(wordsArray) {
    var wordsMap = {};
    wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
            wordsMap[key]++;
        } else {
            wordsMap[key] = 1;
        }
    });

    return wordsMap;

}


function sort(wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}


module.exports = router