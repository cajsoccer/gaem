import Button from "../components/Button";

const SpeedPrompt = props =>
{
	return (
		<div>
			<h2>Select a difficulty: </h2>
			<Button onClick={() => props.setSpeed(150)} text="Easy"></Button>
			<Button onClick={() => props.setSpeed(100)} text="Normal"></Button>
			<Button onClick={() => props.setSpeed(50)} text="Hard"></Button>
		</div>
	);
}

export default SpeedPrompt;