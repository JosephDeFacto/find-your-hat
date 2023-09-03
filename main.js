
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
	constructor(field) {
		this.field = field;
		this.currentRow = 0;
		this.currentCol = 0;
		this.field[0][0] = pathCharacter;
	}

	isHat() {
		return this.field[this.currentRow][this.currentCol] === hat;
	}

	isHole() {
		return this.field[this.currentRow][this.currentCol] === hole;
	}

	// make sure path character is in board bounds
	isInBound(newRow, newCol) {
		return (
		    newRow >= 0 &&
		    newRow < this.field.length &&
		    newCol >= 0 &&
		    newCol < this.field[0].length
    	);
	}


	// print game board
	print() {
		return this.field.map(row => row.join('')).join('\n');
	}


	// play until user find hat or go out of bound or fall into the hole
	playGame() {
		let isPlaying = true;

		let newRow = this.currentRow;
		let newCol = this.currentCol;

		while (isPlaying) {
			console.log(this.print());

			const userInput = prompt('Which way? ').toUpperCase();

			let newRow = this.currentRow;
			let newCol = this.currentCol;

			if (userInput === 'D') {
				newRow++;
			} else if (userInput === 'R') {
				newCol++;
			} else if (userInput === 'L') {
				newCol--;
			} else if (userInput === 'U') {
				newRow--;
			}

			if (this.isInBound(newRow, newCol)) {
				this.currentRow = newRow;
				this.currentCol = newCol;

				if (this.isHat()) {
					console.log('Congrats! You found your hat. Game over!');
					isPlaying = false;
				} else if (this.isHole()) {
					console.log('You fell into the hole. Game over!');
					isPlaying = false;
				} else {
					this.field[this.currentRow][this.currentCol] = pathCharacter;
				}
			} else {
				console.log('Out of bounds. Game over.')
				isPlaying = false;
			}
		}
	}
}

const myField = new Field([
	['*', '░', 'O'],
  	['░', 'O', '░'],
  	['░', '^', '░'],
  	['░', 'O', '░'],
  	['░', '^', '░'],
]);

myField.playGame();

