import fs from "fs";
import { stdin } from "process";
import assert from "assert";

const ENCODING = "utf8";

export function readFromFile(filePath) {
	return fs.readFileSync(filePath, ENCODING, (err, data) => {
		if (err) {
			console.error(err.message);
		}
		return data;
	});
}

export function readFromStdin() {
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

export function numberLines(str) {
	const lines = str.split(/\n/);
	let numberedLines = [];
	const numberOfLines = lines.length - 1;
	for (let i = 0; i < numberOfLines; i++) {
		numberedLines.push(`${i + 1} ${lines[i]}`);
	}
	return numberedLines.join("\n");
}

export function numberNonEmptyLines(str) {
	const lines = str.split(/\n/);
	let numberedLines = [];
	const numberOfLines = lines.length - 1;
	let counter = 1;
	for (let line of lines) {
		if (line.trim() === "") {
			numberedLines.push(line);
		} else {
			numberedLines.push(`${counter++} ${line}`);
		}
	}
	return numberedLines.join("\n");
}
