import {readFile, appendFile, writeFile, unlink} from "node:fs/promises";
import * as path from "node:path";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

// const filePath = path.join(process.cwd(), "src", "files", "file.txt");
const filePath = path.resolve("src", "files", "file.txt");
const filePath2 = path.resolve("src", "files", "file2.txt");
const filePath3 = path.resolve("src", "files", "file3.txt");

const fileOperations = async ()=> {
    // const buffer = await readFile(filePath);
    // const text = buffer.toString();
    // console.log(text);
    // const {encoding} = await DetectFileEncodingAndLanguage(filePath);
    // const text = await readFile(filePath, "utf-8");
    // console.log(text);
    // await appendFile(filePath, "\nPHP forever");
    // await writeFile(filePath, "Mojo forever");
    // await appendFile(filePath2, "\nPHP forever");
    // await writeFile(filePath3, "Mojo forever");
    // await unlink(filePath3);
}

fileOperations();

// const data = await readFile(filePath);
// console.log(data);

// readFile(filePath)
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// readFile(filePath, (error, data)=> {
//     console.log(error);
//     console.log(data);
// });