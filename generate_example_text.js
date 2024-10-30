'use strict'

// import path from 'path'
import {createWriteStream} from 'fs'
import {finished} from 'stream/promises'


const __dirname = process.cwd()
const {INPUT_FILE} = process.env


const words = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`.split(/[^a-z\d]/i)

const genWord = () => {
	const  j = Math.floor( Math.random() * words.length ) 
	return words[j]
}

const genLine = ( length = 20 ) => Array.from({length}, _ => genWord() ).join(' ') + '\n'

const init = async () => {

	const writeStream = createWriteStream(INPUT_FILE, {
		autoClose: true,
		flags: 'w',
	})



	let max = 1000000 
	let i = 0
	while ( i < max ){
		writeStream.write( genLine() )
		i++

	}

	if ( i >= max ){
		writeStream.close()
	}

	await finished(writeStream)

}


init()