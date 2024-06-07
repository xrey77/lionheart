import React, { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'

const Profile: React.FC = () => {
    const [changePwd, setChangePwd] = useState(false)
    const [otpAuthentication, setOtpAuthentication] = useState(false)
    const [profileMessage, setProfileMessage] =useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [emailadd,setEmailadd] = useState("")
    const [mobileno, setMobileno] = useState("")

    const id = sessionStorage.getItem('USERID')
    const token = sessionStorage.getItem('TOKEN')
    const userpic = sessionStorage.getItem('USERPIC')

    useEffect(() => {
        const getProfiledata = () => {
            let opt = { headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }}
            axios.get(`/api/users/${id}`, opt)
            .then((res: any) => {
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setEmailadd(res.data.emailadd);
                setMobileno(res.data.mobileno)
            })
            .catch((error: any) => {
                setProfileMessage(error.message)
            })

        }
        getProfiledata();
    },[id,token])

    const saveProfiledata = (event: any) => {
        event.preventDefault();
        alert("save..")
    }

    const enable = () => {
        alert("enabled")
    }

    const disable = () => {
        alert("disabled")
    }

    const changeProfilepic = (event: any) => {
        $("#userpic").attr('src',URL.createObjectURL(event.target.files[0]));
    }

    const changePassword = (event: any) => {
        event.preventDefault();
        if(newPassword === null) {
            setProfileMessage("Please enter you new password...");
            return;
        }
        if (confirmPassword === null) {
            setProfileMessage("Please enter new password confirmation...")
            return;
        }

        setProfileMessage("Password has been changed...")
    }
    return (
        <div className="card mt-3 profilecard bg-secondary text-light">
        <div className="card-body">
            <h2 className="card-title">PROFILE</h2>

            <form onSubmit={saveProfiledata} autoComplete='off'>
             <div className='row'>
                <div className='col'>
                    <div className="mb-3">
                        <label htmlFor="firstnameControlInput" className="form-label">First Name</label>
                        <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} className="form-control form-control-sm" id="firstnameInput" required/>
                    </div>                
                    <div className="mb-3">
                        <label htmlFor="lastnameControlInput" className="form-label">Last Name</label>
                        <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} className="form-control form-control-sm" id="lastnameInput" required/>
                    </div>                
                </div>
                <div className='col'>
                    <div className='col'>
                        <div className='row'>
                            <img className='profilepic' id="userpic" src={`${userpic}`} alt=''/>
                        </div>
                        <div className='row'>
                        <div className="mb-3">
                            <input onChange={changeProfilepic} className="form-control form-control-sm" id="formUserpicture" type="file"/>
                        </div>
                        </div>
                    </div>
                </div>
             </div>

             <div className='row'>
                <div className='col'>
                    <div className="mb-3">
                        <label htmlFor="emailaddInput" className="form-label">Email Address</label>
                        <input type="email" value={emailadd} onChange={e => setEmailadd(e.target.value)} className="form-control form-control-sm" id="emailaddInput" readOnly/>
                    </div>                

                </div>
                <div className='col'>

                    <div className="mb-3">
                        <label htmlFor="mobilenoInput" className="form-label">Mobile No</label>
                        <input type="text" value={mobileno} onChange={e => setMobileno(e.target.value)} className="form-control form-control-sm" id="mobilenoInput" required/>
                    </div>                

                </div>
             </div>
             {
                changePwd === false && otpAuthentication === false ?
                    <button type="submit" className='btn btn-success text-white mb-3'>Save</button>
                :
                null
             }
             </form>

            <div className='row'>
                <div className='col'>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" defaultChecked={false} onChange={e => setChangePwd(e.target.checked)} role="switch" id="changePasswordChecked"/>
                        <label className="form-check-label" htmlFor="changePasswordChecked">Change Password</label>
                    </div>
                    {
                        changePwd === true ?
                        <>
                        <div className="mb-3">
                            <label htmlFor="newPasswordInput" className="form-label mt-3">New Password</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control form-control-sm" id="newPasswordInput"/>
                        </div>                
                        <div className="mb-3">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control form-control-sm" id="confirmPasswordInput"/>
                        </div>
                        <button onClick={changePassword} type="button" className='btn btn-info'>change</button>
                        </>                
                        :
                        null
                        
                    }
                </div>
                <div className='col'>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" defaultChecked={false} onChange={e => setOtpAuthentication(e.target.checked)} role="switch" id="otpAuthChecked"/>
                        <label className="form-check-label" htmlFor="otpAuthChecked">2F-Authentication</label>
                    </div>
                    {
                        otpAuthentication === true ?
                        <>
                          <p className='mt-2'>You need to install Google or Microsoft Authenticator in your Mobile Phone, once installed, click Enable Button below, and SCAN QR CODE, next time you login, another windows will appear, enter the OTP CODE from your Mobile Phone to login.</p>
                          <div className='row'>
                            <div className='col'>
                                <img src='qrcode.jpg' alt='' />
                            </div>
                            <div className='col'>
                                <div className='col'>
                                    <div className='row'>
                                    <button onClick={enable} type="button" className='btn btn-success profile-btn'>enable 2Factor</button>
                                        
                                    </div>
                                    <div className='row'>
                                    <button onClick={disable} type="button" className='btn btn-info mt-3 profile-btn'>disable 2Factor</button>

                                    </div>
                                </div>
                            </div>
                          </div>

                        </>
                        :
                        null
                    }
                </div>
            </div>

        </div>
        <div className='card-footer'>
            <p className='text-warning msg-size'>{profileMessage}</p>
        </div>
        </div>
    );
  };
  
  export default Profile;