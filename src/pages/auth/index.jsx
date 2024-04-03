import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { BsCashCoin } from "react-icons/bs";
import { orderBy } from 'firebase/firestore';
import toast from "react-hot-toast";

export const Auth = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            // navigate('/expense-tracker/home');
            navigate('/home-container');
            // navigate('/dashboard');
        } catch (err) {
            toast.error('An error has occurred!')
            console.log(err)
        }
    };

    const signInWithEmailAndPassword =  async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            toast.error('An error has occurred!')
            console.log(err)
        }
    };

    return <>
        <div className="flex flex-1 items-center justify-center p-5 py-10 dark:bg-gray-800">
            <section className="bg-gray-50 dark:bg-gray-900 border-2">
                <div className="flex flex-col justify-center items-center gap-8 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <span className="flex justify-center items-center gap-2">
                        <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Expense Tracker</h1>
                        <BsCashCoin className="text-4xl" />
                    </span>
                    <div className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                        Free cloud based React JS Firebase Application.
                    </div>
                    <button
                        onClick={signInWithGoogle}
                        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                    >
                        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                        <span>Login with Google</span>
                    </button>

                    {/* <div>  
                    -- OR --
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                    <input style={{ marginTop: '12px' }} type="submit" value="Login" />

                    </div> */}

                    {/* <img className=" w-2/3 lg:w-1/3 h-auto rounded" src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />     */}
                </div>
            </section>

        </div>
    </>
}