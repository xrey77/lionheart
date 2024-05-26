import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SlowBuffer } from 'buffer';

const ForKids: React.FC = () => {  
  const params = useParams();
    const [users,setUsers] = useState([]);
    const token = sessionStorage.getItem('TOKEN')
    const [userMessage, setUserMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const getClass = async () => {
      let url = "/api/users";
      let opt = { headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}}

       await axios.get(url, opt)
        .then((res: any) => {
          setUsers(res.data);
        }).catch((error: any) => {
          setUserMessage(error.response.statusText);
          window.setTimeout(() => {
              navigate("/", {replace: true});
          }, 3000);
        })        
      }
      getClass();
    },[token])


    return (
      <>
      <div>
        <h1 className="text-center">{params.belt} BELTS</h1>
      </div>
      <div className="container">
      <table className="table table-bordered table-primary table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email Address</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
          {
            users.map((usrs) => {       
              return(                
              <tr>              
                <td>{usrs._id}</td>
                <td>{usrs.firstname}</td>
                <td>{usrs.lastname}</td>
                <td>{usrs.emailadd}</td>
              </tr>
              );
            }
          )}
          </tbody>
        </table>
        {
          token === null ?
            <div className='text-center text-white mt-3'>**** {userMessage} ****</div>
          :
            null
        }
        </div>
        </>

    );
  };
  
  export default ForKids;