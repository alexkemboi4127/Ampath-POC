import './style.css'
import { Button, TextInput } from 'carbon-components-react';
import mr from "./mrs.jpeg";
// import handleClick from './request.js';
import AppMain from './app.js'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState();
  const path=useHistory();
  const [password, setPAssword] = useState();
  const url = 'http://10.50.80.115:8090/amrs/ws/rest/v1/session';
  const handleSubmit = e =>{
    e.preventDefault();
    
    console.log(`${username} and ${password}`);
    const req=btoa(`${username}:${password}`);
    console.log(req);
    axios.get(url,{headers:{Authorization:`Basic ${req}`}})
    .then(response=>{
      console.log(response);
      if(response.data.authenticated===true){
        sessionStorage.setItem("clientname",username);
        sessionStorage.setItem("userDetails",req);
      path.push("/app");

    }
    else {alert("Wrong Username or password")}
    }

    )
    

  }


  return (

    <div className="div1">
      <div className="div2">
        <div><img src={mr} width="100%" height="100" alt=""></img></div>
        <label className="login">LOG IN </label>
        <form onSubmit={handleSubmit}> 
          <TextInput placeholder="Username" name="username" id="username" labelText="Username" 
          onChange={e => setUsername(e.target.value)}
          />
          <TextInput placeholder="Password" name="pass" id="pass" labelText="Password" type="password" 
          onChange={e => setPAssword(e.target.value)}
          />
          <Button type="submit" id="btn" className="buttonlable" >SUBMIT</Button>
        </form>
      </div>

    </div>

  );
}

export default Login;