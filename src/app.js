#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import { argv, stdin } from "process";
import assert from "assert";

const myCat = () => {
	console.log(argv);
	const filepath = argv[2];
	const input = [undefined, "-"];

	// read from stdin
	if (input.includes(argv[2])) {
		stdin.setEncoding("utf-8");
		stdin.on("data", (chunk) => {
			assert.equal(typeof chunk, "string");
			console.log(chunk);
		});
	} else {
		// read from file
		fs.readFile(argv[2], "utf8", (err, data) => {
			if (err) {
				console.error(err.message);
				return;
			}
			console.log(data);
		});
	}
};

// argv is an array
// I need to concatanate one or more files. Use reduce to
if (argv.length > 2) {
}

myCat();
