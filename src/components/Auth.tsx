import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import {useNavigate} from "react-router";

const Auth = () => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_BACKEND_URL;
    const [isLogin, setIsLogin] = useState(true);
    const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
    const [isRegisterSubmitted, setIsRegisterSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        const self = localStorage.getItem('self');
        const token = localStorage.getItem('token');
        if (self && token) {
            navigate('/')
        }
    }, [])
    const register = async (e: any) => {
        e.preventDefault();
        setIsRegisterSubmitted(true);
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            toast.error("Please fill required Fields!", {
                theme: "dark",
                autoClose: 1500,
                hideProgressBar: true,
                pauseOnHover: true,
                type: "warning",
            });
            return;
        }
        let params = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }
        try {
            const response = await axios.get(`${baseUrl}register`, {
                params,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("self", JSON.stringify(response.data.user));
                setIsRegisterSubmitted(false);
                toast.success('Register Successfully.', {
                    theme: "colored",
                    autoClose: 1500,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    type: "success",
                });
                navigate('/');
            }
        } catch (error:any) {
            setIsRegisterSubmitted(false);
            toast.error(error.response.data.errorDetails, {
                theme: "colored",
                autoClose: 1500,
                hideProgressBar: true,
                pauseOnHover: true,
                type: "success",
            })
        }
    }
    const login = async (e: any) => {
        e.preventDefault();
        setIsLoginSubmitted(true);
        if (formData.email.trim() === "" || formData.password.trim() === "") {
            setIsLoginSubmitted(false);
            toast.error("Please fill required Fields!", {
                theme: "dark",
                autoClose: 1500,
                hideProgressBar: true,
                pauseOnHover: true,
                type: "warning",
            });
            return;
        }
        const params = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const response = await axios.post(`${baseUrl}login`, params);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("self", JSON.stringify(response.data.user));
                setIsLoginSubmitted(false);
                toast.success('Login Successfully.', {
                    theme: "colored",
                    autoClose: 1500,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    type: "success",
                });
                navigate('/');
            }
        } catch (err:any) {
            setIsLoginSubmitted(false);
            toast.error(err.response?.data?.errorDetails, {
                theme: "colored",
                hideProgressBar: true,
                type: "warning",
                autoClose: 1500,
                pauseOnHover: true
            });
        }
    }
    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700 p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden transition-all duration-500">
                    <div
                        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 rounded-t-2xl"/>

                    {/* Tabs */}
                    <div className="flex justify-center mt-2 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-6 py-2 text-sm font-semibold rounded-t-md transition-colors duration-300 ${
                                isLogin
                                    ? 'bg-cyan-500 text-white shadow-md'
                                    : 'bg-gray-100 text-cyan-700 hover:bg-gray-200'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-6 py-2 text-sm font-semibold rounded-t-md ml-2 transition-colors duration-300 ${
                                !isLogin
                                    ? 'bg-cyan-500 text-white shadow-md'
                                    : 'bg-gray-100 text-cyan-700 hover:bg-gray-200'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Form title */}
                    <h2 className="text-center text-2xl font-bold text-cyan-600 mb-6 transition-all duration-300">
                        {isLogin ? 'Welcome Back 👋' : 'Create an Account'}
                    </h2>

                    {/* Forms */}
                    {isLogin ? (
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-2 px-4 rounded-md font-semibold shadow-md"
                                onClick={(e) => login(e)}
                                disabled={isLoginSubmitted}>
                                {isLoginSubmitted ?
                                    <i className="fa fa-spinner text-white animate-spin"></i> : null} Login
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Don’t have an account?{' '}
                                <span
                                    className="text-cyan-600 cursor-pointer hover:underline"
                                    onClick={() => setIsLogin(false)}
                                >
            Register
          </span>
                            </p>
                        </form>
                    ) : (
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-2 px-4 rounded-md font-semibold shadow-md"
                                disabled={isRegisterSubmitted}
                                onClick={(e) => register(e)}
                            >
                                {isRegisterSubmitted ?
                                    <i className="fa fa-spinner text-white animate-spin"></i> : null} Register
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{' '}
                                <span
                                    className="text-cyan-600 cursor-pointer hover:underline"
                                    onClick={() => setIsLogin(true)}
                                >
            Login
          </span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}
export default Auth;
