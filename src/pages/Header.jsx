import React, { useEffect, useState } from 'react'
import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { userID, name, profilePhoto } = useGetUserInfo();
    const [activeTab, setActiveTab] = useState('Home');

    const userSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear("auth")
            navigate('/');
        } catch (err) {
            console.error(err)
        };
    };

    useEffect(() => {
        if (location.pathname === "/home-container") {
            setActiveTab('Home')
        } else if (location.pathname === "/add") {
            setActiveTab('Add')
        } else if (location.pathname === "/expense-tracker/about") {
            setActiveTab('About')
        }
    }, []);

  return (
    <>
        <div className='w-full flex justify-center items-center gap-8 p-3 bg-gray-50 text-black dark:bg-slate-900 dark:text-white transition-all duration-300'>
            <Logo />
            <div className='flex items-center justify-center gap-2'>
                <Link to='/home-container'>
                    <button 
                        onClick={() => setActiveTab('Home')}
                        className={`${activeTab === 'Home' ? "text-emerald-700 hover:text-emerald-800" : ""}`}>Home
                    </button>
                </Link>
                <Link to='/expense-tracker/about'>
                    <button 
                        onClick={() => setActiveTab('About')}
                        className={`${activeTab === 'About' ? "text-emerald-700 hover:text-emerald-800" : ""}`}>About
                    </button>
                </Link>
            </div>
        </div>
        <div className='flex justify-center items-center gap-2 my-2'>
            {profilePhoto && (
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center gap-2 dark:text-white font-bold">
                        <img className="w-10 h-10 rounded-full shadow-md" src={profilePhoto} alt="" />
                        <div>{name}</div>
                        {/* <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div> */}
                        <button className='bg-gray-200 hover:bg-blue-100 p-2 rounded' onClick={userSignOut}>
                            <MdLogout className='text-black' title='Log Out' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default Header