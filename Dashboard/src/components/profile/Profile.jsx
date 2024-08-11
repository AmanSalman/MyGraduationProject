import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file
import Loader from '../Loader/Loader.jsx';
import { UserContext } from '../context/User.jsx';
import { Link } from 'react-router-dom'
import img from './profileimage.jpg'
import Error from '../shared/Error.jsx';

const Profile = () => {
  // const userData = {
  //   name:'Aman Salman',
  //   email:'AmanSalman@gmail.com',
  //   phone:'+970 594580633',
  //   status:'Active',
  // }
  const [userData, setUser] = useState([])
  const [loading, setloading] = useState(true)
  const [error, setError] = useState(null); 
 
  const {token} = useContext(UserContext);

  const fetchUser = async ()=>{
    try {
    setloading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL2}/user/profile`,
      { headers: { Authorization: `AmanGRAD__${token}` } })
      console.log(data)
      setUser(data.user)
      setloading (false)
    } catch(err){
      setloading (false)
      const {response} = err;
      setError(response.data.message || "Error fetching user");
    } finally {
      setloading (false)
    }
  }
  
  useEffect(()=>{
    fetchUser();
  },[token])

  if(loading){
    return <Loader/>
  }

  return (

    <>
    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Profile</li>
    <li className="breadcrumb-item active" aria-current="page">information</li>
  </ol>
</nav>
   <div className="container rounded bg-white mb-5">
    {error != null? <Error message={error}/>:  <div className="row">
    <div className="col-md-3 border-right">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src={img} /><span className="font-weight-bold">{userData.username}</span><span className="text-black-50">{userData.email}</span><span> </span></div>
    </div>
    <div className="col-md-5 border-right">
      <div className="p-3 py-5">
        <div className="row mt-2">
          <div className="mb-3"><label className="labels">Username :</label><input type="text" className="form-control" value={userData.username} placeholder="Username" readOnly /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12 mb-3"><label className="labels">Mobile Number :</label><input type="text" className="form-control" placeholder="User phone" readOnly value={userData.phone} /></div>
          <div className="col-md-12 mb-3"><label className="labels">Status :</label><input type="text" className="form-control" placeholder="User status" readOnly value={userData.status}/></div>
          <div className="col-md-12 mb-3"><label className="labels">Email :</label><input type="text" className="form-control" placeholder="User Email" readOnly value={userData.email} /></div>
        </div>
        <div className="text-center mt-1 w-50"><Link className="btn button" to={'/Editprofile'}>Update Profile</Link></div>
      </div>
    </div>
  </div>}
  

</div>
    </>

  );
};

export default Profile;

