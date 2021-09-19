import PropTypes from 'prop-types';

const Button = props =>
{
	return (
	<button className='btn' onClick={props.onClick}>
		{props.text}
	</button>
	);
}

Button.defaultProps = {text: 'Add'};
Button.propTypes = 
{
	text: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;