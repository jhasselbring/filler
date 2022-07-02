var fs = require("fs");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function generateRandomCode(length) {
  length = length ? length : 6;
  let result = "";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
console.log('before loop');
let content = generateRandomCode(30000000);
while (1) {
  let name = generateRandomCode(32);
  
  console.log(name);
  fs.writeFileSync("C:\\container\\" + name, content);
}
