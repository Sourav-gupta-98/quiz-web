// @ts-ignore
import {Category} from '../constants/Category.js'
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {LoginData} from "../ContextData.tsx";
import {toast} from "react-toastify";
import axios from "axios";

const Dashboard = () => {
    const appUrl = import.meta.env.VITE_API_BACKEND_URL;
    const navigate = useNavigate();
    const selfData: any = useContext(LoginData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizData, setQuizData] = useState({
        category: '',
        difficulty: '',
        type: '',
    });
    useEffect(() => {
        let self = localStorage.getItem('self');
        let token = localStorage.getItem('token');
        if ((!selfData || !selfData.self || !selfData.token) && self && token) {
            return;
        } else if ((!selfData || !selfData.self || !selfData.token) && (!self || !token)) {
            navigate('/auth');
        }
        set()
    }, [selfData])

    const set = async () => {
        if (selfData.self && selfData.token) {
            setQuizData({
                category: selfData?.self?.category.toString(),
                difficulty: selfData?.self?.difficulty.toString(),
                type: selfData?.self?.type.toString(),
            })
        } else {
            navigate('/auth');
        }
    }

    useEffect(() => {
    }, [quizData]);

    const submit = async () => {
        setIsSubmitting(true);
        if (!quizData?.category.trim() || !quizData.type.trim() || !quizData.difficulty.trim()) {
            toast.error('Something Went Wrong!', {
                theme: 'dark',
                pauseOnHover: true,
                hideProgressBar: true,
                position: "top-right"
            })
            return;
        }
        try {
            const response = await axios.put(`${appUrl}profile`, quizData, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + selfData?.token,
                }
            })
            if (response.status === 200) {
                setIsSubmitting(false);
                navigate('/question')
            } else {
                setIsSubmitting(false);
                toast.error('Something went Wrong');
            }

        } catch (err:any) {
            setIsSubmitting(false);
            toast.error(err.response.data.errorDetails);
        }

    }

    return (
        <>
            <div
                className="relative w-full sm:h-full md:h-full bg-gradient-to-br from-cyan-800 via-indigo-900 to-blue-950 overflow-hidden py-10 px-4 md:px-12  shadow-2xl">
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <h6 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg animate-shimmer">
                        Quiz
                    </h6>
                    {
                        quizData && quizData.category && quizData.type && quizData.difficulty ?
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-wrap md:flex-row gap-6 justify-center py-6 px-4">
                                    {/* Objective */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setQuizData({...quizData, type: 'multiple'})}
                                            className={`w-52 flex items-center px-6 py-4 rounded-2xl shadow-md transition-all duration-300 border-2
        ${quizData.type === 'multiple'
                                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 scale-105 shadow-lg border-cyan-600'
                                                : 'bg-white hover:bg-gradient-to-r hover:from-cyan-100 hover:to-cyan-200 border-cyan-200 hover:scale-105'}`}>

                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-cyan-700 rounded-full flex items-center justify-center">
                                                    {quizData.type === 'multiple' && (
                                                        <div className="w-2.5 h-2.5 bg-black rounded-full"/>
                                                    )}
                                                </div>
                                            </div>

                                            <span
                                                className={`font-semibold ${quizData.type === 'multiple' ? 'text-white' : 'text-cyan-800'}`}>
        Objective
      </span>
                                        </button>
                                    </div>

                                    {/* True/False */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setQuizData({...quizData, type: 'boolean'})}
                                            className={`w-52 flex items-center px-6 py-4 rounded-2xl shadow-md transition-all duration-300 border-2
        ${quizData.type === 'boolean'
                                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 scale-105 shadow-lg border-cyan-600'
                                                : 'bg-white hover:bg-gradient-to-r hover:from-cyan-100 hover:to-cyan-200 border-cyan-200 hover:scale-105'}`}>

                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-cyan-700 rounded-full flex items-center justify-center">
                                                    {quizData.type === 'boolean' && (
                                                        <div className="w-2.5 h-2.5 bg-black rounded-full"/>
                                                    )}
                                                </div>
                                            </div>

                                            <span
                                                className={`font-semibold ${quizData.type === 'boolean' ? 'text-white' : 'text-cyan-800'}`}>
        True/False
      </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap md:flex-row gap-6 justify-center mb-8 px-4">
                                    {/* Easy */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setQuizData({...quizData, difficulty: 'easy'})}
                                            className={`w-40 flex items-center px-6 py-4 rounded-2xl shadow-md transition-all duration-300 border-2
        ${quizData.difficulty === 'easy'
                                                ? 'bg-gradient-to-r from-green-400 to-cyan-500 scale-105 shadow-lg border-green-600'
                                                : 'bg-white hover:bg-gradient-to-r hover:from-green-100 hover:to-cyan-100 border-green-200 hover:scale-105'}`}>

                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-green-600 rounded-full flex items-center justify-center">
                                                    {quizData.difficulty === 'easy' && (
                                                        <div className="w-2.5 h-2.5 bg-black rounded-full"/>
                                                    )}
                                                </div>
                                            </div>

                                            <span
                                                className={`font-semibold ${quizData.difficulty === 'easy' ? 'text-white' : 'text-green-800'}`}>
        Easy
      </span>
                                        </button>
                                    </div>

                                    {/* Medium */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setQuizData({...quizData, difficulty: 'medium'})}
                                            className={`w-40 flex items-center px-6 py-4 rounded-2xl shadow-md transition-all duration-300 border-2
        ${quizData.difficulty === 'medium'
                                                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 scale-105 shadow-lg border-yellow-600'
                                                : 'bg-white hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 border-yellow-200 hover:scale-105'}`}>

                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-yellow-600 rounded-full flex items-center justify-center">
                                                    {quizData.difficulty === 'medium' && (
                                                        <div className="w-2.5 h-2.5 bg-black rounded-full"/>
                                                    )}
                                                </div>
                                            </div>

                                            <span
                                                className={`font-semibold ${quizData.difficulty === 'medium' ? 'text-white' : 'text-yellow-800'}`}>
        Medium
      </span>
                                        </button>
                                    </div>

                                    {/* Hard */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setQuizData({...quizData, difficulty: 'hard'})}
                                            className={`w-40 flex items-center px-6 py-4 rounded-2xl shadow-md transition-all duration-300 border-2
        ${quizData.difficulty === 'hard'
                                                ? 'bg-gradient-to-r from-red-500 to-pink-500 scale-105 shadow-lg border-red-600'
                                                : 'bg-white hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 border-red-200 hover:scale-105'}`}>

                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-red-600 rounded-full flex items-center justify-center">
                                                    {quizData.difficulty === 'hard' && (
                                                        <div className="w-2.5 h-2.5 bg-black rounded-full"/>
                                                    )}
                                                </div>
                                            </div>

                                            <span
                                                className={`font-semibold ${quizData.difficulty === 'hard' ? 'text-white' : 'text-red-800'}`}>
        Hard
      </span>
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full max-w-screen-xl z-10 mx-auto py-8 px-4">
                                    {Category?.map((cat: any, index: number) => (
                                        <div
                                            key={index}
                                            onClick={() => setQuizData({
                                                ...quizData,
                                                category: cat.value
                                            })} // optionally pass cat
                                            className={`bg-white/80 backdrop-blur-lg text-cyan-900 font-semibold text-center px-4 py-6 rounded-2xl border-2 border-transparent
        shadow-md hover:shadow-2xl hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-100 hover:to-blue-200
        transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group ${quizData.category == cat.value ?
                                                'shadow-2xl border-cyan-500 bg-gradient-to-br from-cyan-200 to-blue-300 transition-all duration-400 transform -translate-y-1 scale-105' : ''}`}
                                            style={{
                                                animationDelay: `${index * 40}ms`,
                                                animationFillMode: 'both',
                                                animation: 'fadeInUp 0.4s ease-out forwards',
                                            }}
                                        >
                                            <div
                                                className="text-3xl mb-2 text-cyan-600 group-hover:scale-110 transition-transform duration-300">
                                                <i className={cat.icon}></i>
                                            </div>
                                            <p className="text-sm sm:text-sm">{cat.name}</p>
                                        </div>
                                    ))}
                                </div>


                                <button
                                    disabled={isSubmitting}
                                    onClick={() => submit()}
                                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg
                                    hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 w-half justify-center text-3xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.732z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {isSubmitting ?
                                        <i className="fa fa-spinner text-white animate-spin"></i> : 'Start Quiz'}
                                </button>

                            </div>
                            :
                            <i className="fa fa-spinner text-white animate-spin text-center"></i>
                    }
                </div>
            </div>

        </>

    )
}

export default Dashboard;
