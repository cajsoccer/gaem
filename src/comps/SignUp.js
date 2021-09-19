import axios from 'axios';
import { useState } from 'react';

const SignUp = props =>
{
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		  return v.toString(16);
		});
	}
	const getPlayers = async () => 
	{
		let res = await axios.get("http://localhost:8080/leaderboard");
		return res.data;
	};
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
		let players = await getPlayers();
		let usernameAlreadyExists = false;
		players.forEach(p => 
		{
			if (p.username === username)
			{
				alert('Username already taken, please enter another one')
				usernameAlreadyExists = true;
			}
		});
		if (usernameAlreadyExists) 
			return;
		//props.onSave({username: username, password: password});
		//API call to insert into database
		let randId = uuidv4();
		let pushObj = {userProfileId: randId, username: username, password: password, highScore: 0};
		console.log(pushObj);
		let res = await axios.post(`http://localhost:8080/leaderboard/create`, pushObj);
		props.logIn(pushObj);
		setUsername('');
		setPassword('');
	}
	return (
		<div>
			<h1>Create an Account:</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label>Username</label>
					<input type='text' placeholder='Enter Username Here' value={username} onChange={e => setUsername(e.target.value)}/>
				</div>
				<div>
					<label>Password</label>
					<input type='text' placeholder='Enter Password Here' value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<input type='submit' value='Create Account'/>
			</form>
		</div>
	);
}

export default SignUp;