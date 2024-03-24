#!/usr/bin/env node

import fs from "fs";
import readline from "readline";
import { argv } from "process";

const filepath = argv[2];

const myCat = (filepath) => {
	fs.readFile(filepath, "utf8", (err, data) => {
		if (err) {
			console.error(err.message);
			return;
		}
		console.log(data);
	});
};

myCat(filepath);
