import PersonButton from './PersonButton.js';

const ButtonList = props =>
{
	return (
		<div>
			{props.people.map(p => 
				{
					return (
						<div>
							<PersonButton person={p}></PersonButton>
						</div>
					);
				})}
		</div>
	);
};

export default ButtonList;