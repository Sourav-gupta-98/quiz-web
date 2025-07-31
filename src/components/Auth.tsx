import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import axios from "axios";
import {useNavigate} from "react-router";

const Auth = ({updateSelfData}) => {
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
        console.log('auth')
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
                updateSelfData({self: response.data.user, token: response.data.token});
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
                updateSelfData({self: response.data.user, token: response.data.token});
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-cyan-500 to-violet-600 p-4 relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-[-80px] left-[-60px] animate-blob"></div>
                <div className="absolute w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-[200px] right-[-50px] animate-blob animation-delay-2000"></div>
                <div className="absolute w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-[80px] left-[100px] animate-blob animation-delay-4000"></div>

                {/* Card */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden border border-white/30 transition-all duration-500 animate-fade-in-up">
                    {/* Gradient Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-violet-500 rounded-t-3xl" />

                    {/* Tabs */}
                    <div className="flex justify-center mt-2 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-6 py-2 text-sm font-semibold rounded-t-md transition-colors duration-300 ${
                                isLogin
                                    ? 'bg-violet-500 text-white shadow-md'
                                    : 'bg-gray-100 text-violet-600 hover:bg-gray-200'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-6 py-2 text-sm font-semibold rounded-t-md ml-2 transition-colors duration-300 ${
                                !isLogin
                                    ? 'bg-violet-500 text-white shadow-md'
                                    : 'bg-gray-100 text-violet-600 hover:bg-gray-200'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-2xl font-extrabold text-violet-600 mb-6">
                        {isLogin ? 'Welcome Back 🎉' : 'Join the Adventure 🚀'}
                    </h2>

                    {/* Login Form */}
                    {isLogin ? (
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={(e) => login(e)}
                                disabled={isLoginSubmitted}
                                className="w-full bg-violet-500 hover:bg-violet-600 transition-all duration-300 text-white py-2 px-4 rounded-xl font-semibold shadow-md"
                            >
                                {isLoginSubmitted && (
                                    <i className="fa fa-spinner text-white animate-spin mr-2" />
                                )}
                                Login
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Don’t have an account?{' '}
                                <span
                                    className="text-violet-600 cursor-pointer hover:underline"
                                    onClick={() => setIsLogin(false)}
                                >
            Register
          </span>
                            </p>
                        </form>
                    ) : (
                        // Register Form
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={(e) => register(e)}
                                disabled={isRegisterSubmitted}
                                className="w-full bg-violet-500 hover:bg-violet-600 transition-all duration-300 text-white py-2 px-4 rounded-xl font-semibold shadow-md"
                            >
                                {isRegisterSubmitted && (
                                    <i className="fa fa-spinner text-white animate-spin mr-2" />
                                )}
                                Register
                            </button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?{' '}
                                <span
                                    className="text-violet-600 cursor-pointer hover:underline"
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
