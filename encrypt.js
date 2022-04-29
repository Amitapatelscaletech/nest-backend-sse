const jwt = require('jsonwebtoken')
const _ = require('lodash')

const jwtKey = 'x_KeSUg~->|&My7'
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var encrypt = (payload) => {

    console.log((jwt.sign(payload, jwtKey)))
}

/**
 * Adds minutes to given date
 * @param {Date} date 
 * @param {number} minutes
 * @returns {boolean} 
 */
const addMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

var payload = {
    userId: '',
    googleUserId: '',
    isNewUser: true,
    expiresAt: +addMinutes(new Date(), 10080)
}
var question = () => {
    readline.question('userId: ', answer => {
        payload.userId = answer

        readline.question('googleUserId: ', answer => {
            payload.googleUserId = answer
            encrypt(payload)
            question();
        })
    })
}
question();

/* var users = _.range(1000)
// console.log(users);
var userTokens = users.map(id => {
    return encrypt({
        userId: id,
        googleUserId: id
    })
}) */
// console.log("userTokens:\n", userTokens.join('\n'));
