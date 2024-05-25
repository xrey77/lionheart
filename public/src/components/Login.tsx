import React, { useState } from 'react'
import $ from 'jquery';
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginmessage, setLoginmessage] = useState("");

    const closeLogin = () => {
        setUsername("");
        setPassword("");
        $("#loginReset")[0].click();
    }
    const submitLogin = async (event: any) => {
        event.preventDefault();
        $("#usernameInput").attr('disabled','disabled')
        $("#passwordInput").attr('disabled','disabled')

        const data =JSON.stringify({ username: username, password: password });  
        let opt = {headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': 'inherit'}}    
        await axios.post("/api/users/signin",data, opt)
        .then((res: any) => {
             if (res.data.statusCode === 401) {
                 setLoginmessage(res.data.message);
                 window.setTimeout(() => {
                    setLoginmessage('');
                    $("#usernameInput").removeAttr('disabled')
                    $("#passwordInput").removeAttr('disabled')
            
                 }, 3000);
                 return;
             }
             //granted...
            setLoginmessage(res.data.message);
            sessionStorage.setItem('USERID',res.data.data.userid);
            sessionStorage.setItem('USERNAME',res.data.data.username);
            sessionStorage.setItem('TOKEN',res.data.data.token);
            sessionStorage.setItem('USERPIC',res.data.data.profilepic);
            window.setTimeout(() => {
                $("#xclose")[0].click();
                window.location.reload();
             }, 3000);

          }).catch((err: any) => {
            setLoginmessage(err.message);
            window.setTimeout(() => {
                setLoginmessage('');
            }, 3000);
            return;
          });
    }
    return (
        <div className="modal fade" id="staticLoginBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticLoginBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-primary text-white">
                <h1 className="modal-title fs-5" id="staticLoginBackdropLabel">Sign-In</h1>
                <button id="xclose" type="button" onClick={closeLogin} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id="loginForm" onSubmit={submitLogin} autoComplete='off'>


                <div className="mb-3">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="usernameInput" placeholder='Enter your username.' required={true}/>
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="passwordInput" placeholder='Enter your password' required={true}/>
                </div>
                <button type="submit" className="btn btn-primary">signin</button>
                <button id="loginReset" type="reset" className="btn btn-primary reset-hide">reset</button>

                </form>
            </div>
            <div className="modal-footer">
                <span className='w-100 text-danger fs-6 text-center'>{loginmessage}</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Login;