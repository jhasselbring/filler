import fs from "fs";
import { generateRandomCode } from "./generateRandomCode";
import disk from "diskusage";
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let initialDiskSpace: number = Number();
let path: string = '/';


// Generate container directory name
const dir: string = `/${generateRandomCode(6)}/`;

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
    bar1.start(initialDiskSpace, 0);
    // console.log(`Starting @ "${dir}"`);
    let content = generateRandomCode(30000000);
    while (1) {
      disk.check(path, function (err: string, info: any) {
        let currentDiskSpace: number = 0;

        if (err) {
          console.log(err);
        } else {
          currentDiskSpace = info.free;
          bar1.update(initialDiskSpace - currentDiskSpace);
        }
        // let prg1: number = (currentDiskSpace / initialDiskSpace);
        // let prg2: number = prg1 * 100;
        // let finalPrg: number = parseInt((100 - prg2).toFixed(0));

        // console.clear();
        // console.log(finalPrg + '% complete');

        let name: string = generateRandomCode(32);
        try {
          fs.writeFileSync(dir + name, content);
        } catch (e) {
          fs.rmdirSync(dir, { recursive: true });
        }
      });
    }
  }





});





