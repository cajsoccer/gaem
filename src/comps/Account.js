import React, {useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import axios from "axios";

const Account = props =>
{
	function MyDropzone({userProfileId, username, password, highscore}) {
		const onDrop = useCallback(acceptedFiles => {
		  const file = acceptedFiles[0];
		  props.changeAvatar({userProfileId: userProfileId, username: username, password: password, highscore: highscore, userProfileImageLink: file.path});
		  console.log(file);
		  const formData = new FormData();
		  formData.append("file", file);
		  axios.post(
			  `http://localhost:8080/leaderboard/${userProfileId}/image/upload`,
			  formData,
			  {headers: {"Content-Type" : "multipart/form-data"}}
			  ).then(() => {console.log("File upload sucessfully")}).catch(err => {console.log(err)});
		}, [])
		const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
		return (
		  <div {...getRootProps()}>
			<input {...getInputProps()} />
			{
			  isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag 'n' drop or click to select profile image</p>
			}
		  </div>
		)
	  }
	return (
		<div>
			<h1>Account Information:</h1>
			<h1>Username: {props.user.username}</h1>
			<div>
				<h1>Avatar:</h1>
				{props.user.userProfileImageLink !== null ? <img src={`http://localhost:8080/leaderboard/${props.user.userProfileId}/image/download`}/> : <img src={'https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg'}/>}
			</div>
			<h1>High Score: {props.user.highScore}</h1>
			<MyDropzone {...props.user}/>
		</div>
	);
}

export default Account;