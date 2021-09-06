import React from 'react';

let size = 20;
let rows = new Array(size);
for (let i = 0; i < size; i++)
	rows[i] = new Array(size);
for (let i = 0; i < size; i++)
	for (let j = 0; j < size; j++)
		rows[i][j] = 0;
let direction = "down";
const getRandPos = () => [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
window.addEventListener('keydown', e => {
	switch (e.key) {
		case "ArrowDown":
			if (direction !== "up")
				direction = "down";
			break;
		case "ArrowUp":
			if (direction !== "down")
				direction = "up";
			break;
		case "ArrowLeft":
			if (direction !== "right")
				direction = "left";
			break;
		case "ArrowRight":
			if (direction !== "left")
				direction = "right";
			break;
	}
});
<<<<<<< HEAD
const snakeBitSelf = (oldSnake, newHead) =>
{
=======
const checkGameOver = snake => {
	if (snake[0][0] < 0 || snake[0][0] > 20 || snake[0][1] < 0 || snake[0][1] > 20)
		return true;
	for (let i = 1; i < snake.length; i++)
		if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1])
			return true;
	return false;
}
const snakeBitSelf = (oldSnake, newHead) => {
>>>>>>> f1010c148254d24b5a663ca45f6bb137f26e79f1
	for (let i = 1; i < oldSnake.length; i++)
		if (newHead[0] === oldSnake[i][0] && newHead[1] === oldSnake[i][1])
			return true;
	return false;
}
const gameOver = snake => alert(`Game Over. Your score is: ${snake.length}`);
const changeFruitPos = (board, snake, fruitPos) => {
	console.log("REE");
	let randPos = getRandPos();
	let randPosInSnake = false;
<<<<<<< HEAD
	snake.forEach(b =>
	{
		if (b[0] === randPos[0] && b[1] === randPos[1])
			randPosInSnake = true;
	});
	while (randPosInSnake)
	{
		randPos = getRandPos();
		randPosInSnake = false;
		snake.forEach(b => 
		{
			if (b[0] === randPos[0] && b[1] === randPos[1])
				randPosInSnake = true;
		});
	}
	fruitPos = randPos;
	board[fruitPos[0]][fruitPos[1]] = 1;
	console.log("new pos spawned");
=======
	snake.forEach(([x, y]) => { if (x === randPos[0] && y === randPos[1]) randPosInSnake = true; });
	while (randPosInSnake) {
		randPos = getRandPos();
		randPosInSnake = false;
		snake.forEach(b => { if (b === randPos) randPosInSnake = true; });
	}
	fruitPos = randPos;
	board[fruitPos[0]][fruitPos[1]] = 1;
	return fruitPos;
>>>>>>> f1010c148254d24b5a663ca45f6bb137f26e79f1
}
const moveSnake = (board, snake, fruitPos, direction) => {
	let last = snake.length - 1;
	switch (direction) {
		case "left":
			console.log("LEFT");
			if (snake[0][1] === 0 || snakeBitSelf(snake, [snake[0][0], snake[0][1] - 1]))
				gameOver(snake);
			board[snake[0][0]][snake[0][1] - 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) {
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][1]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) {
				console.log("EAT");
				snake.push([snake[last][0], snake[last][1] + 1]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "right":
			console.log("RIGHT");
			if (snake[0][1] === size - 1 || snakeBitSelf(snake, [snake[0][0], snake[0][1] + 1]))
				gameOver(snake);
			board[snake[0][0]][snake[0][1] + 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) {
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][1]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) {
				console.log("EAT");
				snake.push([snake[last][0], snake[last][1] - 1]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "up":
			console.log("UP");
			if (snake[0][0] === 0 || snakeBitSelf(snake, [snake[0][0] - 1, snake[0][1]]))
				gameOver(snake);
			board[snake[0][0] - 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) {
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][0]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) {
				console.log("EAT");
				snake.push([snake[last][0] + 1, snake[last][1]]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "down":
			console.log("DOWN");
			if (snake[0][0] === size - 1 || snakeBitSelf(snake, [snake[0][0] + 1, snake[0][1]]))
				gameOver(snake);
			board[snake[0][0] + 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) {
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][0]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) {
				console.log("EAT");
				snake.push([snake[last][0] - 1, snake[last][1]]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake);
			}
			break;
	}
	return { board, snake, fruitPos };
}
const boxType = num => {
	switch (num) {
		case 0:
			return "box";
		case 1:
			return "red-box";
		case 2:
			return "blue-box";
	}
}
let playerPos = [[10, 10], [10, 11], [10, 12], [10, 13]];
let fruitPos = [16, 10];
rows[fruitPos[0]][fruitPos[1]] = 1;
playerPos.forEach(p => rows[p[0]][p[1]] = 2);

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = { board: rows, snake: playerPos, fruitPos: fruitPos };
	}
	componentDidMount() {
		this.ticker = setInterval(() => {
			let newState = moveSnake(this.state.board, this.state.snake, this.state.fruitPos, direction);
			//if (checkGameOver(newState.snake) === true)
			//alert(`Game Over. Final Score: ${newState.snake.length}`);
			this.setState(newState);
		}, 100);
	}
	componentWillUnmount() {
		clearInterval(this.ticker);
	}
	render() {
		return (
			<div className='Board'>
				<h1>Score: {this.state.snake.length}</h1>
				{this.state.board.map((r, ri) =>
				(
					<div key={ri} className='row'>
						{r.map((b, bi) =>
						(
							<div key={bi} className={boxType(b)}></div>
						))}
					</div>
				))}
			</div>
		);
	};
};