import {useState} from 'react';

let rows = new Array(20);
for (let i = 0; i < 20; i++)
	rows[i] = new Array(20);
for (let i = 0; i < 20; i++)
	for (let j = 0; j < 20; j++)
		rows[i][j] = 0;
const getRandPos = () => [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
const moveSnake = (board, snake, direction) =>
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
			break;
		case "up":
			board[snake[0][0] - 1][snake[0][0]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][0]--;
			break;
		case "down":
			board[snake[0][0] + 1][snake[0][0]] = 2;
			board[snake[last][0]][snake[last][1]] = 0;
			for (let i = last; i > 0; i--)
			{
				snake[i][0] = snake[i-1][0];
				snake[i][1] = snake[i-1][1];
			}
			snake[0][0]++;
			break;
	}
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
let playerPos = [[10,10], [10,11], [10,12], [10, 13]]; //[11,10], [10,10], [10,11], [10, 12];
let fruitPos = getRandPos();
//rows[fruitPos[0]][fruitPos[1]] = 1;
playerPos.forEach(p => rows[p[0]][p[1]] = 2);
console.log(playerPos);

const Board = () =>
{
	const [board, setBoard] = useState(rows);
	setInterval(() => 
	{
		moveSnake(rows, playerPos, "left");
		console.log(playerPos);
		setBoard(rows);
	}, 5000);

	return (
		<div className='Board'>
			{board.map((r, ri) => 
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
}

export default Board;