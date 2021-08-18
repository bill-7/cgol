import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  empty = () => Array.from(Array(80), () => new Array(80).fill('white'))

  grid: any[][] = this.empty()
  grid2: any[][] = this.empty()

  mouseDown = false

  ngOnInit() {
    setInterval(() => this.update(), 5000)
  }

  click(x: number, y: number) {
    this.mouseDown = true
    this.change(x, y)
  }

  change(i: number, j: number) {
    const next = this.grid[i][j] == 'white' ? 'black' : 'white'
    this.grid2[i][j] = next
    this.grid[i][j] = next
  }

  over(x: number, y: number) {
    if (this.mouseDown)
      this.change(x, y)
  }

  stop() {
    this.mouseDown = false
  }

  liveNeighbours(x: number, y: number, l: boolean) {
    let n = l ? -1 : 0
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (this.grid[i] && this.grid[i][j] && this.grid[i][j] == 'black')
          n++
      }
    }
    return n
  }

  update() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        const alive = this.grid[i][j] == 'black'
        const ns = this.liveNeighbours(i, j, alive)
        const live = ((alive && ns == 2) || ns == 3)
        this.grid2[i][j] = live ? 'black' : 'white'
      }
    }

    this.grid = this.grid2
    this.grid2 = this.empty()
  }
}
