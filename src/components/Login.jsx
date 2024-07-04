import React,  { useState } from 'react'
import googleimg from '../img/google.png'
import facebook from '../img/faceBook.png'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate()
    const auth = getAuth();
    const [errormsg, seterrormsg] = useState('')
    const [submitsignupDisable, setsubmitsignupDisable ] = useState(false)
    const [value, setValues] = useState({
        email: '',
        password: ''
    })
    const handleLogin = (e) => {
        if(!value.email ==="" || !value.password ==="")  {
            seterrormsg('fill all fields Please !!!!')
            return;
        }


        seterrormsg('')
        signInWithEmailAndPassword(auth, value.email, value.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                toast(`Succesfully login`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                    });
                    navigate('/')
            })
            .catch((err) => {
                setsubmitsignupDisable(false)
                // ..
                seterrormsg(err.message)
                toast(`🔺🔺please Enter Correct password and email `, {
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
        <div className='customcontainer  '>
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
            <div className='inputbox '>
                <h1 className='text-2xl font-bold '>Login</h1>
                <div>
                    <p className=' font-bold text-sm text-left'>email:-</p>
                    <input className='inputcontainer' type='text' placeholder='Email' required name='email' onChange={(event) => setValues((usersdata) =>({ ...usersdata, email: event.target.value}))}  />
                </div>
                <div>
                    <p className=' font-bold text-sm text-left'>Password:-</p>
                    <input className='inputcontainer' type='password' placeholder='Password' required name='password' onChange={(event) => setValues((usersdata) =>({ ...usersdata, password: event.target.value}))} minLength={5}/>
                </div>

                <div>
                    <p className='underline text-red-300 font-serif'>{errormsg}</p>
                    <button className='btns' onClick={handleLogin}>Submit</button>
                    <p className='m-2'>Create New Account! <Link to='/signup'><span className='underline font-bold'>Signup</span></Link></p>
                    <div className='flex border border-cyan-500 m-2 mt-4 justify-center items-center rounded-xl'>
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

export default Login