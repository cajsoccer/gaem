import {useState} from 'react';

const PersonButton = props => 
{
	let [person, setPerson] = useState(props.person)
	return (
		<div>
			<button onClick={() => setPerson({name: person.name, age: --person.age})}>Lower Age</button>
			<span>{person.name}'s age is: {person.age}</span>
			<button onClick={() => setPerson({name: person.name, age: ++person.age})}>Up Age</button>
		</div>
	);
};

export default PersonButton;