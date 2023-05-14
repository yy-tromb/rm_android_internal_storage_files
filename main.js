const fs = require("fs");
const readline = require("readline");
const child_process = require("child_process");

const rs = fs.createReadStream("file_path_to_files_to_remove");
/*file_path_to_files_to_remove
file path
file path
...
*/

const adb = String.raw`path_to_adb`;
/*path_to_adb
example(windows):C:\Users\(user name)\AppData\Local\Android\Sdk\platform-tools\adb.exe
*/

const rl = readline.createInterface({
   input: rs,
});

rl.on("line", (line) => {
   child_process.execFile(
      adb,
      ["shell", "rm", `"path_to_directry_to_file_to_remove/${line}"`],//example
      child_callback
   );
});

rl.on("close", () => {
   console.log("async read is ENDED!");
});

function child_callback(error, stdout, stderr) {
   if (error) return console.error(error);
   if (stderr !== "") {
      console.log("STDOUT", stdout);
      console.log("STDERR", stderr);
   }
}
