import React, { useState } from 'react'
import $ from 'jquery';
import axios from 'axios'

const Register: React.FC = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [emailadd, setEmailadd] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [usrname, setUsrname] = useState("");
    const [passwd, setPasswd] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");

    const closeRegistration = () => {
        setFirstname("");
        setLastname("");
        setEmailadd("");
        setMobileno("");
        setUsrname("");
        setPasswd("");
        $("#registerReset")[0].click();
    }

    const clearForm = () => {
        setFirstname("");
        setLastname("");
        setEmailadd("");
        setMobileno("");
        setUsrname("");
        setPasswd("");
    }

    const submitRegistration = (event: any) => {
        event.preventDefault();
        const data =JSON.stringify({ 
            firstname: firstname, lastname: lastname,
            emailadd: emailadd, mobileno: mobileno,
            username: usrname, password: passwd,
            role: 'USER', profilepic: '/images/users/001.png' });  
        let opt = {headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': 'inherit'}}    
         axios.post("/api/users/signup",data, opt)
        .then((res: any) => {
             if (res.data.statusCode === 400) {
                setRegistrationMessage(res.data.message);
                 window.setTimeout(() => {
                    setRegistrationMessage('');            
                 }, 3000);
                 return;
             }
             //granted...
             setRegistrationMessage("New record has been inserted successfully.");
            window.setTimeout(() => {
                setRegistrationMessage("");
             }, 3000);

          }).catch((err: any) => {
            setRegistrationMessage(err.message);
            window.setTimeout(() => {
                setRegistrationMessage('');
            }, 3000);
            return;
          });        
    }

    return (
        <div className="modal fade" id="staticRegisterBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticRegisterBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-info text-white">
                <h1 className="modal-title fs-5" id="staticRegisterBackdropLabel">User's Registration</h1>
                <button type="button" onClick={closeRegistration} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id='registrationform' onSubmit={submitRegistration} autoComplete='off'>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="firstnameInput" className="form-label text-dark">First Name</label>
                            <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} className="form-control" id="firstnameInput" required={true}/>
                        </div>
                    </div>                        
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="lastnameInput" className="form-label text-dark">Last Name</label>
                            <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} className="form-control" id="lastnameInput" required={true}/>
                        </div>
                    </div>                        
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="emailaddInput" className="form-label text-dark">Email Address</label>
                            <input type="email" value={emailadd} onChange={e => setEmailadd(e.target.value)} className="form-control" id="emailaddInput" required={true}/>
                        </div>
                    </div>                        
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="mobilenoInput" className="form-label text-dark">Mobile No.</label>
                            <input type="text" value={mobileno} onChange={e => setMobileno(e.target.value)} className="form-control" id="mobilenoInput" required={true}/>
                        </div>
                    </div>                        
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="usrnameInput" className="form-label text-dark">Username</label>
                            <input type="text" value={usrname} onChange={e => setUsrname(e.target.value)} className="form-control" id="usrnameInput" required={true}/>
                        </div>
                    </div>                        
                    <div className='col'>
                        <div className="mb-3">
                            <label htmlFor="pworddInput" className="form-label text-dark">Password</label>
                            <input type="password" value={passwd} onChange={e => setPasswd(e.target.value)} className="form-control" id="pwordInput" required={true}/>
                        </div>
                    </div>                        
                </div>

                <button type="submit" className="btn btn-outline-info">signup</button>
                <button type="reset" className="btn btn-outline-warning ms-1" onClick={clearForm}>clear</button>

                <button id="registerReset" type="reset" className="btn btn-primary reset-hide">reset</button>

                </form>
            </div>
            <div className="modal-footer">
                <span className='w-100 text-danger fs-6 text-center'>{registrationMessage}</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Register;