import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OtpAuth: React.FC = () => {
    const [otpMessage, setOtpMessage] = useState("")
    const [otpAuthinput, setOtpAuthinput] = useState("")
    const id = sessionStorage.getItem('USERID')
    const navigate = useNavigate()
    const token = sessionStorage.getItem("TOKEN");

    const closeOtpAuth = () => {
        setOtpAuthinput("")
        sessionStorage.removeItem("USEID");
        sessionStorage.removeItem("USENAME");
        sessionStorage.removeItem("TOKEN");
        sessionStorage.removeItem("USERPIC");
        navigate("/", {replace: true})
        window.location.reload();
    }

    const submitOtp = (event: any) => {
        event.preventDefault()
        let opt = {headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}} 
        axios.get(`/api/users/${id}`, opt)
        .then((res:any) =>{
            setOtpMessage(res.data.message)
        })
        .catch((error: any) => {
            setOtpMessage(error.message)
        })

    }
    return (
        <div className="modal fade" id="staticLoginBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticLoginBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-info text-white">
                <h1 className="modal-title fs-5" id="staticLoginBackdropLabel">2F-Authentication</h1>
                <button id="xclose" type="button" onClick={closeOtpAuth} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form id="otpForm" onSubmit={submitOtp} autoComplete='off'>

                <div className="mb-3">
                    <input type="text" value={otpAuthinput} onChange={e => setOtpAuthinput(e.target.value)} className="form-control" id="otpInput" placeholder='Enter OTP code' required={true}/>
                </div>
                <button type="submit" className="btn btn-info">submit</button>
                </form>
            </div>
            <div className="modal-footer">
                <span className='w-100 text-danger fs-6 text-center'>{otpMessage}</span>
            </div>
            </div>
        </div>
        </div>
    );
}

export default OtpAuth;