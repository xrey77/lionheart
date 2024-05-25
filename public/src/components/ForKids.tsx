import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

// const host = axios.create({
//   baseURL: "http:/localhost:4000",
//   headers: {'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'inherit'},
// })

const ForKids: React.FC = () => {  
  const params = useParams();
    const [users,setUsers] = useState([]);
    let token = "";

    useEffect(() => {
      
      console.log("USER ID : " + sessionStorage.getItem('USERID'));

      const getClass = async () => {

        let url = "/api/users";
       let opt = { headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}}

       await axios.get(url, opt)
        .then((res: any) => {
          setUsers(res.data);
        },(error: any) => {
          console.log(error);
        });
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
        </div>
        </>

    );
  };
  
  export default ForKids;