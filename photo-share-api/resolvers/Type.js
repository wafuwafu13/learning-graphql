const { GraphQLScalarType } = require(`graphql`)

let users = [
	{ "githubLogin": "mHattrup", "name": "Mike Hattrup"},
	{ "githubLogin": "gPlake", "name": "Glen Plake"},
	{ "githubLogin": "sSchmidt", "name": "Scot Schmidt"}
]

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

let tags = [
	{ "photoID": "1", "userID": "gPlake" },
	{ "photoID": "2", "userID": "sSchmidt" },
	{ "photoID": "2", "userID": "mHattrup" },
	{ "photoID": "2", "userID": "gPlake" },
]

module.exports = {
	Photo: {
        id: parent => parent.id || parent._id,
        url: parent => `/img/photos/${parent._id}.jpg`,
		postedBy: (parent, args, { db }) =>
            db.collection('users')
                .findOne({ githubLogin: parent.userID }),
	},

	User: {
		postedPhotos: parent => {
			return photos.filter(p => p.githubUser === parent.githubLogin)
		},
		inPhotos: parent => tags
		    .filter(tag => tag.userID === parent.id)
			.map(tag => tag.photoID)
			.map(photoID => photos.find(p => p.id === photoID))
	},

	DateTime: new GraphQLScalarType({
		name: `DateTime`,
		description: `A valid date time value.`,
		parseValue: value => new Date(value),
		serialize: value => new Date(value).toISOString(),
		parseLiteral: ast => ast.value
	})
}
