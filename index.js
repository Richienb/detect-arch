"use strict"

const fs = require("fs")
const deepEqual = require("deep-equal")

function streamChunk(stream, size) {
	return new Promise((resolve) => {
		function getChunk() {
			var data = stream.read(size);
			if (data != null) {
				resolve(data);
				setImmediate(getChunk);
			}
		}

		stream.on('readable', getChunk);
	})
}

async function bytesAt(stream, start, end) {
	const chunk = await streamChunk(stream, end)
	return chunk.slice(start)
}

module.exports = (filename) => module.exports.stream(fs.createReadStream(filename))

module.exports.stream = async (stream) => {
	const buffer = await bytesAt(stream, 132, 134)
	const bytes = [...buffer]

	if (deepEqual(bytes, [100, 134])) return "64"
	if (deepEqual(bytes, [76, 1])) return "32"

	throw new Error("Unable to detect architecture.")
}
