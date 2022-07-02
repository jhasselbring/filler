const fs = require("fs");
const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const disk = require('diskusage');
let initialDiskSpace: number = Number();
let path: string = 'c:';
let generateRandomCode = function (length: number = 6): string {
  let result: string = String(length);
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Build directory name
const dir: string = `C:\\${generateRandomCode(6)}\\`;

// Create directory if not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    recursive: true
  });
}

// Get initial space
disk.check(path, function (err: string, info: any) {
  if (err) {
    console.log(err);
  } else {
    initialDiskSpace = info.free;

    console.log(`Starting @ "${dir}"`);
    let content = generateRandomCode(30000000);
    while (1) {
      disk.check(path, function (err: string, info: any) {
        let currentDiskSpace: number = 0;
  
        if (err) {
          console.log(err);
        } else {
          currentDiskSpace = info.free;
        }
        let prg1: any = (currentDiskSpace / initialDiskSpace);
        let prg2 = prg1 * 100;
        let finalPrg = (100 - prg2).toFixed(0);
        console.clear();
        console.log(finalPrg + '% complete');
        let name = generateRandomCode(32);
        try {
          fs.writeFileSync(dir + name, content);
        } catch (e) {
          fs.rmdirSync(dir, { recursive: true });
        }
      });
    }
  }





});





