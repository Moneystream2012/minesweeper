import { randomInt } from 'crypto';

export type Cell = {
  isHole: boolean;
  isOpen: boolean;
  adjacent: number;
};

export type Surrounding = {
  baseRow: number;
  baseIndex: number;
  applyRow: number;
  applyIndex: number;
}

export class Board {
  private board: Cell[][];
  private readonly size: number;

  constructor(n: number, k: number) {
    this.size = n;
    this.board = Board.createBoard(n);
    
    this.populate(k);

    this.adjacent();
  }

  static createBoard = (n: number): Cell[][] => {
    return [...Array(n)].map(() => {
      let result = [];
      for (let i = 0; i < n; i++) {
        result.push( Board.createCell());
      }
      return result;
    });
  }

  static createCell(): Cell {
    return {
      isHole: false,
      isOpen: false,
      adjacent: 0,
    } as Cell;
  }

  public populate(k: number): void {
    let index: number,
        rowIndex: number;

    for (let i: number = 0; i < k; i++) {
      do {
        rowIndex = randomInt(0, this.size);
        index = randomInt(0, this.size);
      } while (this.board[rowIndex][index].isHole);

      this.board[rowIndex][index].isHole = true;
    }
  }

  private bounds = (index: number): [number, number] => {
    return [
      (index == 0) ? 0 : index - 1,
      (index == this.size - 1) ? index : index + 1,
    ]
  }

  private applySurround = (
      rowIndex: number,
      index: number,
      callback: (data: Surrounding) => number | undefined
  ): number => {
    const [startRow, endRow] = this.bounds(rowIndex);
    const [start, end] = this.bounds(index);
    let adj: number = 0;

    for (let row: number = startRow; row <= endRow; row++) {
      for (let idx: number = start; idx <= end; idx++) {
        // @ts-ignore
        adj += callback({
          baseRow: rowIndex,
          baseIndex: index,
          applyRow: row,
          applyIndex: idx,
        });
      }
    }
    return adj;
  }

  public adjacent(): void {
    for (let r: number = 0; r < this.size; r++) {
      for (let i: number = 0; i < this.size; i++) {
        if (! this.board[r][i].isHole) {
          this.board[r][i].adjacent =
            this.applySurround(r, i, ({
              baseRow: rowIndex,
              baseIndex: index,
              applyRow: row,
              applyIndex: idx,
            }) => {
              return (! (row == rowIndex && idx == index) && this.board[row][idx].isHole) ? 1 : 0;
            });
        }
      }
    }
  }

  public click(row: number, index: number): number {
    if (this.board[row][index].isHole) {
      return 1;
    }
    
    this.chainClick(null, null, row, index);
    return 0;
  }
  
  public chainClick(rowIndex: number | null, index: number | null, row: number, idx: number): any
  {
    if (!this.board[row][idx].isHole) {
      this.board[row][idx].isOpen = true;
    }

    if (this.board[row][idx].adjacent == 0) {
      this.applySurround(row, idx, ({
        baseRow: rowIndex,
        baseIndex: index,
        applyRow: row,
        applyIndex: idx,
      }) => {
        if (rowIndex != row && index != idx) {
          return this.chainClick(rowIndex, index, row, idx);
        }
      });
    }
  }
  
  public solved(): boolean {
    for (let r: number = 0; r < this.size; r++) {
      for (let i: number = 0; i < this.size; i++) {
        if (!this.board[r][i].isHole && !this.board[r][i].isOpen) {
          return false;
        }
      }
    }
    return true;
  }
  
  public toString(): string {
    let result: string[] = [];
    this.board.map((row: Cell[], rowId: number) => {
      result[rowId] = ' ';
      row.map((cell: Cell) => {
        result[rowId] += (cell.isOpen ? (cell.isHole ? 'H' : cell.adjacent.toString()) : '?') + ' ';
      });
    });
    return result.join("\n");
  }
}
