import { useState } from 'react';
import axios from "axios";

const Login = props =>
{
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = async e =>
	{
		e.preventDefault();
		if (!username)
		{
			alert('Please enter a username.');
			return;
		}
		if (!password)
		{
			alert('Please enter a password');
			return;
		}
		//props.onSave({username: username, password: password});
		//API call to insert into database
		let res = await axios.get(`http://localhost:8080/leaderboard/login?username=${username}&password=${password}`);
		console.log(res);
		if (res.data === "")
			alert('Username and/or password incorrect');
		else
			props.logIn(res.data);
		setUsername('');
		setPassword('');
	}
	return (
		<div>
			<h1>Log in:</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>Username</label>
					<input type='text' placeholder='Enter Username Here' value={username} onChange={e => setUsername(e.target.value)}/>
				</div>
				<div>
					<label>Password</label>
					<input type='text' placeholder='Enter Password Here' value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<input type='submit' value='Sign In'/>
			</form>
		</div>
	);
}

export default Login;