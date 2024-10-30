'use strict'

// import path from 'path'
import { 
	createReadStream, 
	createWriteStream
} from 'fs'

import { finished, pipeline } from 'stream/promises'


const __dirname = process.cwd()
const {
	INPUT_FILE, 
	OUTPUT_FILE
} = process.env



const readWrite = async () => {

	const readStream = createReadStream(INPUT_FILE, {
		encoding: "utf-8"
	})

	const writeStream = createWriteStream(OUTPUT_FILE, {
		autoClose: true,
		flags: 'w',
	})

	let chunks = 0
	readStream.on('data', chunk => {
		chunks += 1
		let lines = chunk
			.split(/[\n\r]+/g) // chunk to line
			.filter( line => {
				
				// call filter func here  //

				return /or/i.test(line)

			})
			.map( line  => {

				// transform func

				return line.replaceAll(/or/g, 'AND' )

			})
			.filter ( line  => line ) // incase transform nulls something out
			.join('\n') // back to chunk

			writeStream.write( lines )

	})

	 
	const results = await pipeline(readStream, writeStream)
		.then( res => 	{ return { INPUT_FILE, OUTPUT_FILE, chunks } } )

	return results
}


const init = async () => {
	const start_time = new Date()

	const rw = await readWrite()
		.then( res => {
			const end_time = new Date()
			const elapsed = end_time.getTime() - start_time.getTime()
			console.table({
				start: start_time.toISOString(),
				end: end_time.toISOString(),
				elapsed,
				...res
			})
			return true
		})

	return rw
}


await init()