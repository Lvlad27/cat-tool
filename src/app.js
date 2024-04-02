#!/usr/bin/env node

import { argv } from "process";
import {
	readFromFile,
	numberLines,
	numberNonEmptyLines,
	readFromStdin,
} from "./utils.js";

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
				console.log(await readFromStdin(numberLines(option)));
				break;
			case "-b":
				console.log(await readFromStdin(numberNonEmptyLines(option)));
				break;
			default:
				console.log(readFromFile(option));
		}
	} catch (err) {
		console.error(err.message);
	}
}

myCat();
