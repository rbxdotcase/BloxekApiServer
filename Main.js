//lets fucking goooooooooo
let roblox = require("noblox.js");
let express = require('express');
let BodyParser = require('body-parser');
let utility = require("./util.js");
let config = require("./config.json");

let app = express();

app.set('env', "production");
app.use(express.json());
app.use(utility.Auth);

const { checkRank } = require('./checks.js');

app.get("/", (req, res) => res.status(200).send({ Message: "Server is running" }));

app.post("/roblox/setrank", function (req, res, next) {
    let groupid = req.body.groupid
    let userid = req.body.userid

    utility.convertStringRole(req).then(rankid => {
        console.log(rankid)
        checkRank(req)

        console.log(`Requested to give ${userid} the rank ${rankid} in group ${groupid}`)

        utility.SetRank(res, groupid, userid, rankid)
    }).catch(reason => {
        console.log(`Tried to set ${userid}'s rank in ${groupid} as "${req.body.rankid}" (invalid rankid)`)
        res.status(404).send({ error: ` ${req.body.rankid} is not a valid rank.` })
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: `Server error: ${err}` });
})

async function login(cookie) {
    await roblox.setCookie(config.cookie)

    return await roblox.getCurrentUser();
}

login()
    .then(currentUser => {
    console.log(currentUser)

    app.listen()
})