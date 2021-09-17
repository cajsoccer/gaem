

const Top = props => 
{
	return (
		<div>
			<a href='/'>Home </a>
			<a href='/leaderboard'>Leaderboard</a>
			{props.user !== null ?
			<> 
				<a href='/account'>
					{props.user.userProfileImageLink !== null ?
					<img src={`http://localhost:8080/leaderboard/${props.user.userProfileId}/image/download`}/> 
					: 
					<img src={'https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg'}/>}
				</a> 
				<button onClick={() => props.logOut()}>Log Out</button> 
			</> 
			: 
			<> 
				<a href='./signup'>Sign Up</a> 
				<a href='/signin'>Sign In</a> 
			</>}
		</div>
	);
}

export default Top;