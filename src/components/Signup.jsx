import React, { useState } from 'react'
import googleimg from '../img/google.png'
import facebook from '../img/faceBook.png'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Values = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [value, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errormsg, seterrormsg] = useState('')
    const [submitsignupDisable, setsubmitsignupDisable ] = useState(false)
    const handlValues = (e) =>{
        
        if(!value.name || !value.email || !value.password  ){
            seterrormsg('fill all fields Please !!!!')
            return
        }
        seterrormsg('')
            setsubmitsignupDisable(true)
            createUserWithEmailAndPassword(auth, value.email, value.password)
            .then(async (userCredential) => {
              // Signed up 
             // const user = userCredential.user;
              setsubmitsignupDisable(false)
              const user = userCredential.user;
              
             await updateProfile(user,{
                displayName: value.name
              })
              navigate('/login')

              toast(`Succesfully create your account cheak email and login`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
            })
            .catch((err) => {
              setsubmitsignupDisable(false)
              // ..
              seterrormsg(err.message)
              toast(`🔺Error: Email allready used please cheak Password if all is correct then Login `, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            });

            
           
        
    }

  return (
    <div className='customcontainer'>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <div className='inputbox'>
        <h1 className='text-2xl font-bold '>Values</h1>
            <div>
            <label htmlFor="text" className=" font-bold text-sm text-left flex">Name </label>
                <input className='inputcontainer'  type='text' placeholder='Name' name='name' onChange={(event) => setValues((usersdata) =>({ ...usersdata, name: event.target.value}))}/>
            </div>
            <div>
            <label htmlFor="email" className=" font-bold text-sm text-left flex">Email address </label>
                <input aria-describedby="emailHelp" className='inputcontainer' type='text' placeholder='Email' required name='email' onChange={(event) => setValues((usersdata) =>({ ...usersdata, email: event.target.value}))}/>
            </div>
            <div>
            <label htmlFor="password" className=" font-bold text-sm text-left flex">Password </label>
                <input className='inputcontainer' type='password' placeholder='Password' required name='password' onChange={(event) => setValues((usersdata) =>({ ...usersdata, password: event.target.value}))}/>
            </div>

            <div>
            <p >{errormsg}</p>
            <button disabled={submitsignupDisable} className='btns' onClick={handlValues}>Submit</button>
         
            <p className='m-2'>If Already Account please! <Link to='/login'><span className='underline font-bold'>Login</span></Link></p>
            <div className='flex border border-cyan-500 m-2 mt-4 justify-center items-center'>
                <img src={googleimg} className='w-8 h-8 m-3' />
                <h4 className='font-bold text-sm m-3'>SignIn With Google</h4>
            </div>
            <div className='flex border border-cyan-500 m-2 mt-4 justify-center items-center rounded-xl'>
                <img src={facebook} className='w-8 h-8 m-3' />
                <h4 className='font-bold text-sm m-3'>SignIn With FaceBook</h4>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Values