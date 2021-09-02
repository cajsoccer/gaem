import PropTypes from 'prop-types';
import Button from './Button.js';

const Header = props =>
{
	return (
		<header className='header'>
			<h1>{props.title}</h1>
			<Button color={props.formShowing ? 'red' : 'greeny'} text={props.formShowing ? 'Hide Form' : 'Show Form'} onClick={() => props.onToggle()}></Button>
		</header>
	);
};

Header.defaultProps = {title: 'Task Tracker'};
Header.propTypes = {title: PropTypes.string.isRequired};

export default Header;