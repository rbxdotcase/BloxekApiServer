//lets fucking goooooooooo
const express = require("express")
const app = express()

let roblox = require("noblox.js");
let config = require("./config.json")

function sendRes(res, json, status) {
    res.status(status).send(json)
}

function Auth(req,res,next_func) {
    if (req.body.auth_key === config.auth_key) {
        next_func();
    } else {
        console.log('Incorrect key:' + req.body.auth_key)
        sendRes(res, { error: 'Incorrect key, not authorized.'}, 401)
    }
}

/*function CheckRank(res,groupId,userId,Rank){
	const grabUser = async() => {
		username = await roblox.getUsernameFromId(userid);
	}
	return new Promise(function(resolve,reject){
		roblox.getRankInGroup(groupId,userId)
			.then(rank => {
				if (rank === 0){ //rank = 0 which means that user rank is "Guest"
					let message = `User ${username} is not part of group ${groupId}`
					res.status(401).send({
						error:null,
						message:  message
					})
					resolve(message)
					console.log("User not in group")
				} else if (rank > 0){
					let message = `User ${username} is in group ${groupId}`
				}
			})
	})
}*/
function convertStringRole(req) {
	return prom = new Promise((resolve, reject) => {
		if (typeof req.body.rankid === "string") {
			const grabRoles = async() => {
				roles_Promise = await roblox.getRoles(req.body.groupid).then(roles =>{
					var rankid = req.body.rankid
					roles.forEach(role_obj => {
						if (role_obj.name.toLowerCase() === rankid.toLowerCase()) {
							resolve(role_obj.rank);
						}
					})

					reject(404)
				}).catch(err => {
					console.log(`Error while fetching roles ${err}`)
				})
			}
			console.log(grabRoles())
		} else { resolve(req.body.rankid); }
	})
}
function SetRank(res, groupid, userid, Rank) {
	const grabUser = async() => {
		username = await roblox.getUsernameFromId(userid);
	}
	return new Promise(function (resolve, reject) {
		console.log("User status: " + grabUser())

		roblox.setRank(groupid,userid,Rank)
			.then(roleset => {
				res.status(200).send({
					error: null,
					data: {
						NewRoleSetId: roleset.id, NewRankName: roleset.name, NewRank: roleset.rank
					},
					message: `Successfully changed rank of user ${username} to rank ${roleset.name} in group ${groupid}`
				});

				resolve(roleset)
				console.log(`Successfully changed rank of user ${username} to rank ${roleset.name} in group ${groupid}`)
			})
			.catch(err => {
				reject(err)
				res.status(500).send({ error: `Failed to Set the rank of user ${username}`})
			})
	})
}

module.exports = {
    Auth: Auth,
    SetRank: SetRank,
	convertStringRole: convertStringRole,
}
