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

module.exports = {
	totalPhotos: () => photos.length,
	allPhotos: () => photos
}
