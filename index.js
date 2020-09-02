const fs = require('fs')
const youtubedl = require('youtube-dl')

const video = youtubedl('https://youtu.be/7R-CfL21zIY', 

	['--format=18'],
	{ cwd: __dirname }

)

let len = 0
let cur = 0
let total = 0;

video.on('info', function(info) {
	console.log('Download started')
	console.log('Filename ; ', info.__filename)
	console.log('Size : ', info.size)
	len = info.size
	total = len / 1048576
})

video.on('data', function(chunk) {
	cur += chunk.length
	console.log("Downloading " + (100.0 * cur / len).toFixed(0) + "% " + (cur / 1048576).toFixed(1) + " mb" + " Total size: " + total.toFixed(2) + " mb")
	// console.log(chunk)
})

video.pipe(fs.createWriteStream('myvideo.mp4'))