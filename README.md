# NodeJs_Async_Streams
This project is a quick example of how to return an Asynchronous Read/Write File Stream in Node.js. In particular, this is intended to be a template for large file parsing where reading and transforming lots of plaintext would be necessary.

At the moment this script only handles one file, but it should be easy enough to modify to process through multiple files

## Steps: 
1. Copy your Source Data file into the Input folder
	** Due to Node.js security policies, reading/writing files outside the project directory won't work.

2. Update the ".env" file to include the name of the Input File and the desired Output file name

3. Run the script
`npm start`

After a few moments an output file should be generated, which has slightly modified and potentially filtered out lines of text from the Input file.

## (Optional) Generate a large test file ##
If you don't have a file that you'd want to use the script on, you can create an example file via the included test script.

`npm test`

The test script will create a .txt file with 1000000 lines of 20 random words from the standard Lorem Ipsum text. The .txt file will automatically go into your Input folder based on the settings in the .env file.