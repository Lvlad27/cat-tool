#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import { argv, stdin } from "process";
import assert from "assert";

const ENCODING = "utf8";

function readFromFile(filePath) {
	return fs.readFileSync(filePath, ENCODING, (err, data) => {
		if (err) {
			console.error(err.message);
		}
		return data;
	});
}

function readFromStdin() {
	return new Promise((resolve, reject) => {
		let data = "";
		stdin.setEncoding(ENCODING);
		stdin.on("data", (chunk) => {
			assert.equal(typeof chunk, "string");
			data += chunk;
		});
		stdin.on("end", () => {
			resolve(data);
		});
		stdin.on("error", (error) => {
			reject(error);
		});
	});
}

function numberLines(str) {
	const lines = str.split(/\n/);
	let numberedLines = [];
	const numberOfLines = lines.length - 1;
	for (let i = 0; i < numberOfLines; i++) {
		numberedLines.push(`${i + 1} ${lines[i]}`);
	}
	return numberedLines.join("\n");
}

function numberNonEmptyLines(str) {
	const lines = str.split(/\n/);
	let numberedLines = [];
	const numberOfLines = lines.length - 1;
	for (let i = 0; i < numberOfLines; i++) {
		numberedLines.push(`${i + 1} ${lines[i]}`);
	}
	return numberedLines.join("\n");
}

async function myCat() {
	const option = argv[2];

	if (argv.length > 3) {
		switch (option) {
			case "-n":
				console.log(numberLines(readFromFile(argv[3])));
				break;
			case "-b":
				console.log(numberNonEmptyLines(readFromFile(argv[3])));
				break;
			default:
				const cliArgs = argv.slice(2);
				const record = {};
				let output;
				for (const cliArg of cliArgs) {
					record[cliArg] = readFromFile(cliArg);
				}
				console.log(Object.values(record).join(""));
		}
		return;
	}

	try {
		switch (option) {
			case undefined:
			case "-":
				console.log(await readFromStdin());
				break;
			case "-n":
				numberLine(option);
				break;
			case "-b":
				break;
			default:
				console.log(readFromFile(option));
		}
	} catch (err) {
		console.error(err.message);
	}
}

myCat();

/**
 * PLAN
 * Q: What constitutes the cases?
 * A: argv => command line prompts. Starting from index 2.
 * 	argv[2] = undefined or "-" for stdin
 * 	argv[2] = "-n" for numbering lines including blank lines
 * 	argv[2] = "-b" for numbering lines exluding blank lines
 * 	argv[2] default case representing file paths and cocatenation
 *
 * I need a way to show the command line prompt. Depending on that, run logic.
 * Q: How do I store the cases?
 * A: I use argv and indexes
 *
 * Q: What is the expression for the switch statement?
 * A: argv[2]
 *
 *
 * PSEUDOCODE
 *
 * MAIN
 * 	initialize INPUT with argv[2];
 *
 * IF (argv.length === 2)
 * ENDIF
 *  ELSEIF (argv.length > 2)
 *  ENDELSEIF
 *    ELSE
 *
 *      ENDELSE
 * SWITCH (expression)
 * 	CASE "undefined" or "-"
 * 	  PRINT stdin output
 *  CASE "-n"
 *    PRINT
 *  CASE "-b"
 *    PRINT
 *  CASE DEFAULT
 *    IF (argv.length bigger than 3) (which means that there is more than 1 file path as input from user)
 *      INITIALIZE array with cli arguments
 *      INITIALIZE record for storing content
 *      LOOP through array and add the content of each file to the record values. Use paths as keys (or index numbers from array).
 *      CONCAT all values to value of the first file and PRINT
 *    ENDIF
 *      ELSE
 *        PRINT input from user
 *      ENDELSE
 */

// const myCat = () => {
// 	const input = [undefined, "-"];
// 	if (input.includes(argv[2])) {
// 		stdin.setEncoding(encoding);
// 		stdin.on("data", (chunk) => {
// 			assert.equal(typeof chunk, "string");
// 			console.log(chunk);
// 		});
// 	}
// 	if (argv.length > 3) {
// 		const cliArgs = argv.slice(2);
// 		const record = {};
// 		let output;
// 		for (const cliArg of cliArgs) {
// 			record[cliArg] = readFile(cliArg);
// 		}
// 		console.log(Object.values(record).join(""));
// 	} else {
// 		console.log(readFile(argv[2]));
// 	}
// };

// myCat();
