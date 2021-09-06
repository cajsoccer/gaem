import React from 'react';

let rows = new Array(20);
for (let i = 0; i < 20; i++)
	rows[i] = new Array(20);
for (let i = 0; i < 20; i++)
	for (let j = 0; j < 20; j++)
		rows[i][j] = 0;
let direction = "down";
const getRandPos = () => [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
window.addEventListener('keydown', e => 
{
	switch(e.key)
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
	}
});
const checkGameOver = snake =>
{
	if (snake[0][0] < 0 || snake[0][1] << 0)
		return true;
	for (let i = 1; i < snake.length; i++)
		if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1])
			return true;
	return false;
}
const changeFruitPos = (board, snake, fruitPos) => 
{
	let randPos = getRandPos();
	let randPosInSnake = false;
	snake.forEach(b => {if (b === randPos) randPosInSnake = true;});
	while (randPosInSnake)
	{
		randPos = getRandPos();
		randPosInSnake = false;
		snake.forEach(b => {if (b === randPos) randPosInSnake = true;});
	}
	fruitPos = randPos;
	board[fruitPos[0]][fruitPos[1]] = 1;
}
const moveSnake = (board, snake, fruitPos, direction) =>
{
	let last = snake.length - 1;
	switch (direction)
	{
		case "left":
			board[snake[0][0]][snake[0][1] - 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][1]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1])
			{
				snake.push([snake[last][0], snake[last][1] + 1]);
				board[snake[last+1][0]][snake[last+1][1]] = 2;
				changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "right":
			board[snake[0][0]][snake[0][1] + 1] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][1]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1])
			{
				snake.push([snake[last][0], snake[last][1] - 1]);
				board[snake[last+1][0]][snake[last+1][1]] = 2;
				changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "up":
			board[snake[0][0] - 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][0]--;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1])
			{
				snake.push([snake[last][0] + 1, snake[last][1]]);
				board[snake[last+1][0]][snake[last+1][1]] = 2;
				changeFruitPos(board, snake, fruitPos);
			}
			break;
		case "down":
			board[snake[0][0] + 1][snake[0][1]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][0]++;
			if (snake[0][0] === fruitPos[0] && snake[0][1] === fruitPos[1])
			{
				snake.push([snake[last][0] - 1, snake[last][1]]);
				board[snake[last+1][0]][snake[last+1][1]] = 2;
				changeFruitPos(board, snake, fruitPos);
			}
			break;
	}
	return {board, snake, fruitPos};
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
let playerPos = [[10,10], [10,11], [10,12], [10, 13]];
let fruitPos = [16, 10];
rows[fruitPos[0]][fruitPos[1]] = 1;
playerPos.forEach(p => rows[p[0]][p[1]] = 2);

export default class Board extends React.Component 
{
    constructor(props) 
	{
        super(props);
        this.state = { board: rows, snake: playerPos, fruit: fruitPos };
    }
    componentDidMount() 
	{
        this.ticker = setInterval(() => 
		{
            let newState = moveSnake(this.state.board, this.state.snake, this.state.fruit, direction);
			this.setState(newState);
        }, 100);
    }
	componentWillUnmount() 
	{
		clearInterval(this.ticker);
	}
	render() 
	{
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