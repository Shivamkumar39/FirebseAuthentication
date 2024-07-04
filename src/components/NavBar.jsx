import React, {useEffect, useState} from 'react'
import logo from '../img/iconmanage.png'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const signOutHangle = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast(`Signout successful  `, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
                });
        }).catch((error) => {
            // An error happened.
            
        });
    }

    return (
        <>
        <div>
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
        </div>
            <nav className='bg-cyan-500 w-full h-16 flex justify-between items-center sticky top-0' style={{ "zIndex": "10" }}>
                <div className='h-16 w-16 m-10 '>
                    <img src={logo} />
                </div>

                <div>
                    <ul>
                        {!user ? (
                            <li>
                                <Link to='/'>
                                    <button type='button' className='buttonhead'>Home</button>
                                </Link>
                                <Link to='/signup'>
                                    <button type='button' className='buttonhead'>Signup</button>
                                </Link>
                                <Link to='/login'>
                                    <button type='button' className='buttonhead'>Login</button>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <button onClick={signOutHangle} className='buttonhead'>SignOut</button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar