const { authorizeWithGithub } = require('../lib')

let photos = [
	{
		"id": "1",
		"name": "Dropping the Heart Chute",
		"description": "The heart chute is one of my favorite chutes",
		"category": "ACTION",
		"githubUser": "gPlake",
		"created": "3-28-1977"
	},
	{
		"id": "2",
		"name": "Enjoying the sunshine",
		"category": "SELFIE",
		"githubUser": "sSchmidt",
		"created": "1-2-1985"
	},
	{
		"id": "3",
		"name": "Gunbarrel 25",
		"description": "25 laps on gunbarrel today",
		"category": "LANDSCAPE",
		"githubUser": "sSchmidt",
		"created": "2018-04-15T19:09:57.308Z"
	}
]
let _id = 0

module.exports = {
	postPhoto(parent, args) {
		let newPhoto = {
			id: _id++,
			...args.input,
			created: new Date()
		}
		photos.push(newPhoto)

		return newPhoto
	},

	async githubAuth(parent, { code }, { db }) {

		let {
		  message,
		  access_token,
		  avatar_url,
		  login,
		  name
		} = await authorizeWithGithub({
		  client_id: process.env.CLIENT_ID,
		  client_secret: process.env.CLIENT_SECRET,
		  code
		})
	
		if (message) {
		  throw new Error(message)
		}
	
		let latestUserInfo = {
		  name,
		  githubLogin: login,
		  githubToken: access_token,
		  avatar: avatar_url
		}
	
		const { ops:[user] } = await db
		  .collection('users')
		  .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })
	
		return { user, token: access_token }
	},
}
