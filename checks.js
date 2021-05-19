//lets fucking goooooooooo
let roblox = require("noblox.js");

function checkRank(req) {
    if (typeof req.body.rankid === "number") { return; }
    if (typeof req.body.rankid === "string") { return; }

    else { throw new Error(`Parameter must be an integer or string, not type '${typeof (value)}'`) }
}

module.exports = {
    checkRank: checkRank,
}