import * as path from 'path';
import * as fs from 'fs-extra';

console.log(`Hello, PawBox`);

async function writeHello() {
    const txt = `${path.join(__dirname, 'hello.txt')}`;
    await fs.writeFile(txt, 'hello, world');
}
writeHello();