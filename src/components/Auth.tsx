import {useState} from "react";
import { toast } from 'react-toastify';
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const showSuccess = () => {
        toast.success("Success! Operation completed.",{
            theme: "dark",
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: true,
            pauseOnClick: true,
            draggable: true,
            type:'info',
            onClose: () => {
                alert('Connection closed.');
            },

        });
    };

    const showError = () => {
        toast.error("Error! Something went wrong.");
    };
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
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-2 px-4 rounded-md font-semibold shadow-md"
                            >
                                Login
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
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white py-2 px-4 rounded-md font-semibold shadow-md"
                            >
                                Register
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
            <div>
                <button onClick={showSuccess}>Show Success</button>
                <button onClick={showError}>Show Error</button>
            </div>
        </>
    )
}
export default Auth;
