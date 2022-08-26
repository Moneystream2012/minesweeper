import { Board } from './Board';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const size = await new Promise(resolve => rl.question("What is a size of board? ", resolve));
  const holes = await new Promise(resolve => rl.question("What is a number of black holes on board? ", resolve));
  
  const board = new Board(Number(size), Number(holes));
  console.log(board.toString());

  let exploded: number = 0;
  while (!exploded && !board.solved()) {
    const row = await new Promise(resolve => rl.question(`Your next turn [row 1..${size}]? `, resolve));
    const position = await new Promise(resolve => rl.question(`Your next turn [position 1..${size}]? `, resolve));

    exploded = board.click(Number(row) - 1, Number(position) - 1);
    console.log(board.toString());
  }
  
  if (exploded) {
    rl.write('BOOM');
  }
  
  rl.close();
})();
