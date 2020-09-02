const fs = require('fs')
const youtubedl = require('youtube-dl')
const readline = require('readline')
const ranstr = require('ranstr')
const downloadDir = './Downloads'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

if (!fs.existsSync(downloadDir)) {
	fs.mkdirSync(downloadDir)
}

rl.question("Enter YouTube video url : ", function(url) {
	console.log('Searching video...')
	const video = youtubedl(url, 

		['--format=18'],
		{ cwd: __dirname }

	)

	let len = 0
	let cur = 0
	let total = 0;
	let count = 0;
	let first = 0;
	let fileName = 'node-youtube-downloader'

	video.on('error', function error(err) {
		console.log('Video not found, Please enter correct url !')
	})

	video.on('info', function(info) {
		console.log('Download started')
		fileName = info._filename
		console.log('Filename : ', fileName)
		console.log('Size : ', (info.size / 1048576).toFixed(2), ' MB')
		len = info.size
		total = len / 1048576		

		video.pipe(fs.createWriteStream(downloadDir + '/' + fileName + '-' + ranstr(5) + '.mp4'))

	})

	video.on('data', function(chunk) {
		cur += chunk.length		
		if (first < 1) {
			console.log("Downloading " + (100.0 * cur / len).toFixed(0) + "% " + (cur / 1048576).toFixed(0) + " mb" + " Total size: " + total.toFixed(0) + " mb")
			first += 1
		}
		if ((100.0 * cur / len).toFixed(0) % 10 == 0 && (100.0 * cur / len).toFixed(0) != count) {
			count = (100.0 * cur / len).toFixed(0)
			console.log("Downloading " + (100.0 * cur / len).toFixed(0) + "% " + (cur / 1048576).toFixed(0) + " mb" + " Total size: " + total.toFixed(0) + " mb")
		}		
	})	

	video.on('end', function() {
		console.log('Download successfuly !')
		console.log('File located at folder Downloads')
	})
	
	rl.close()
	
})