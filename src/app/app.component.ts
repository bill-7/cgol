import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  grid: any[][] = Array.from(Array(80), () => new Array(80).fill('white'));
  grid2: any[][] = Array.from(Array(80), () => new Array(80).fill('white'));

  ngOnInit() {
    setInterval(() => this.update(), 1000);
  }

  click(i: number, j: number) {
    console.log(i, j);
    this.grid2[i][j] = (this.grid[i][j] == 'white' ? 'black' : 'white');
    this.grid[i][j] = (this.grid[i][j] == 'white' ? 'black' : 'white');

  }

  update() {
    const liveNeighbours = (x: number, y: number, l: boolean) => {
      let n = (l ? -1 : 0)
      for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
          if (this.grid[i] && this.grid[i][j] && this.grid[i][j] == 'black')
            n++
        }
      }
      return n
    }

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        const alive = this.grid[i][j] == 'black'
        const ns = liveNeighbours(i, j, alive)

        let r = false
        if (alive) {
          if (ns == 2 || ns == 3) r = true
        } else {
          if (ns == 3) r = true
        }
        // if ((alive && ns == 2) || ns == 3) r = true

        this.grid2[i][j] = r ? 'black' : 'white'
      }
    }

    this.grid = this.grid2
    this.grid2 = Array.from(Array(80), () => new Array(80).fill('white'));
  }
}
