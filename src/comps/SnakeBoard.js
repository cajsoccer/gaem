import React from 'react';

let size = 20;
let rows = new Array(size);
for (let i = 0; i < size; i++)
	rows[i] = new Array(size);
for (let i = 0; i < size; i++)
	for (let j = 0; j < size; j++)
		rows[i][j] = 0;
let direction = "right";
window.addEventListener('keydown', e => 
{
	console.log(e.key);
	switch (e.key) 
	{
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
		case " ":
			paused = !paused;
			break;
	}
});
const getRandPos = () => [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
const snakeBitSelf = (oldSnake, newHead) => {
	for (let i = 1; i < oldSnake.length; i++)
		if (newHead[0] === oldSnake[i][0] && newHead[1] === oldSnake[i][1])
			return true;
	return false;
}
const gameOver = snake => alert(`Game Over. Your score is: ${snake.length}`);
const changeFruitPos = (board, snake) => 
{
	let randPos = getRandPos();
	let randPosInSnake = false;
	snake.forEach(b => { if (b[0] === randPos[0] && b[1] === randPos[1]) randPosInSnake = true; });
	while (randPosInSnake) 
	{
		randPos = getRandPos();
		randPosInSnake = false;
		snake.forEach(b => { if (b[0] === randPos[0] && b[1] === randPos[1]) randPosInSnake = true; });
	}
	let fruitPos = randPos;
	board[fruitPos[0]][fruitPos[1]] = 1;
	return fruitPos;
}
const moveSnake = (board, snake, fruitPos, direction) => 
{
	let last = snake.length - 1;
	switch (direction) {
		case "left":
			if (snake[0][1] === 0 || snakeBitSelf(snake, [snake[0][0], snake[0][1] - 1]))
				gameOver(snake);
			board[snake[0][0]][snake[0][1] - 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) 
			{
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][1]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) 
			{
				snake.push([snake[last][0], snake[last][1] + 1]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "right":
			if (snake[0][1] === size - 1 || snakeBitSelf(snake, [snake[0][0], snake[0][1] + 1]))
				gameOver(snake);
			board[snake[0][0]][snake[0][1] + 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) 
			{
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][1]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) 
			{
				snake.push([snake[last][0], snake[last][1] - 1]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "up":
			if (snake[0][0] === 0 || snakeBitSelf(snake, [snake[0][0] - 1, snake[0][1]]))
				gameOver(snake);
			board[snake[0][0] - 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) 
			{
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][0]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) 
			{
				snake.push([snake[last][0] + 1, snake[last][1]]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "down":
			if (snake[0][0] === size - 1 || snakeBitSelf(snake, [snake[0][0] + 1, snake[0][1]]))
				gameOver(snake);
			board[snake[0][0] + 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--) 
			{
				snake[i][0] = snake[i - 1][0];
				snake[i][1] = snake[i - 1][1];
			}
			snake[0][0]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1]) 
			{
				snake.push([snake[last][0] - 1, snake[last][1]]);
				board[snake[last + 1][0]][snake[last + 1][1]] = 2;
				fruitPos = changeFruitPos(board, snake);
			}
			break;
	}
	return { board, snake, fruitPos };
}
const boxType = num => 
{
	switch (num) 
	{
		case 0:
			return "box";
		case 1:
			return "red-box";
		case 2:
			return "blue-box";
	}
}
let playerPos = [[10, 5]];
let fruitPos = changeFruitPos(rows, playerPos);
rows[fruitPos[0]][fruitPos[1]] = 1;
rows[playerPos[0][0]][playerPos[0][1]] = 2;
let paused = true;

export default class Board extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = { board: rows, snake: playerPos, fruitPos: fruitPos };
	}
	componentDidMount() 
	{
		this.ticker = setInterval(() => 
			{
				if (!paused)
				{
					let newState = moveSnake(this.state.board, this.state.snake, this.state.fruitPos, direction);
					this.setState(newState);
				}
			}, this.props.speed);
	}
	componentWillUnmount() 
	{
		clearInterval(this.ticker);
	}
	render() 
	{
		return (
			<div className='Board'>
				<h1>Press spacebar to start/toggle pause.</h1>
				<h1>Use arrow keys to move.</h1>
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