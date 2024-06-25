import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { loginAdmin } from '../api/admin';
import { Navigate, useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Admin logged in successfully:', response);
            navigate('/')

        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username or password');
        }
    }

    const togglePasswordShow = () => {
        setShow(true);
    };
    const togglePasswordHide = () => {
        setShow(false);
    };
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 mt-2">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <p className="text-sm font-medium text-red-500">{error}</p>

                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        username
                                    </label>
                                    <input
                                        value={formData.username}
                                        onChange={handleChange}
                                        type="username"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username"
                                        required=""
                                    />
                                </div>

                                <div className=''>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>

                                    <div className='flex '>
                                        <input
                                            value={formData.password}
                                            onChange={handleChange}
                                            type={show ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                        />
                                        <div className='absolute ml-[16em] lg:ml-[20em] mt-2'>

                                            {show ? (
                                                <svg
                                                    onClick={togglePasswordHide}
                                                    className='absolute left-[21em] bottom-[2em] cursor-pointer'
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={25}
                                                    height={25}
                                                    viewBox="0 0 24 24"
                                                    style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msfilter: "" }}
                                                >
                                                    <path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    onClick={togglePasswordShow}
                                                    className='inline-flex cursor-pointer'
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={25}
                                                    height={25}
                                                    viewBox="0 0 24 24"
                                                    style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msfilter: "" }}
                                                >
                                                    <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z" />
                                                    <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z" />
                                                </svg>

                                            )
                                            }
                                        </div>

                                    </div>




                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign up
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div >
            </section >

        </div >
    )
}

export default Auth