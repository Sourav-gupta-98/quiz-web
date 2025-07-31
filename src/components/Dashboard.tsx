// @ts-ignore
import {Category} from '../constants/Category.js'
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {LoginData} from "../ContextData.tsx";

const Dashboard = ({updateSelfData}) => {
    const navigate = useNavigate();
    const selfData: any = useContext(LoginData);
    const [quizData, setQuizData] = useState({
        category: '',
        difficulty: '',
        type: '',
    });
    useEffect(() => {
        if (selfData.self && selfData.token) {
            setQuizData({
                category: selfData?.self?.category,
                difficulty: selfData?.self?.difficulty,
                type: selfData?.self?.type,
            })
        } else {
            navigate('/auth');
        }
    }, [])

    useEffect(() => {
        console.log(quizData)
    }, [quizData]);

    const updateQuizData = () => {
        console.log('update quizData');
    }

    const goTo = () => {
        navigate('/question');
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-cyan-200 to-cyan-400 flex flex-col items-center justify-start p-6 relative overflow-hidden">

            {/* Background Texture or Shapes */}
            <div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"/>

            {/* Floating Blobs */}
            <div
                className="absolute w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-[-60px] left-[-40px] z-0"></div>
            <div
                className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-[300px] right-[-80px] z-0"></div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-cyan-900 mb-12 drop-shadow-lg z-10">
                🎓 Start Quiz
            </h1>
            {quizData ?
                <>
                    {quizData.type}
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="space-y-3 mt-4">
                            <button className="bg-red-500 text-white cursor-pointer" onClick={(event) => {
                                console.log('clicked', event)
                            }}>Objective
                            </button>

                            <button onClick={() => setQuizData({...selfData, type: 'multiple'})}
                                    className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer
                ${quizData.type == 'multiple' ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                    <div
                                        className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                        {quizData.type == 'multiple' &&
                                            <div className="w-2 h-2 bg-black rounded-full"/>}
                                    </div>
                                </div>
                                <span
                                    className="text-cyan-800 font-medium text-left">Objective</span>
                            </button>
                        </div>
                        <div className="space-y-3 mt-4">
                            <button onClick={() => setQuizData({...selfData, type: 'boolean'})}
                                    className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${quizData.type == 'boolean' ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                    <div
                                        className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                        {quizData.type == 'boolean' &&
                                            <div className="w-2 h-2 bg-black rounded-full"/>}
                                    </div>
                                </div>
                                <span className="text-cyan-800 font-medium text-left">True/False</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        <div className="space-y-3 mt-4">
                            <button onClick={(e) => setQuizData({...quizData, type: 'easy'})}
                                    className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${quizData.difficulty == 'easy' ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                    <div
                                        className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                        {quizData.type == 'easy' &&
                                            <div className="w-2 h-2 bg-black rounded-full"/>}
                                    </div>
                                </div>
                                <span
                                    className="text-cyan-800 font-medium text-left">Easy</span>
                            </button>
                        </div>
                        <div className="space-y-3 mt-4">
                            <button onClick={(e) => setQuizData({...quizData, difficulty: 'medium'})}
                                    className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${quizData.difficulty == 'medium' ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                    <div
                                        className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                        {quizData.difficulty == 'medium' &&
                                            <div className="w-2 h-2 bg-black rounded-full"/>}
                                    </div>
                                </div>
                                <span
                                    className="text-cyan-800 font-medium text-left">Medium</span>
                            </button>
                        </div>
                        <div className="space-y-3 mt-4">
                            <button onClick={(e) => setQuizData({...quizData, difficulty: 'hard'})}
                                    className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${quizData.difficulty == 'hard' ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                    <div
                                        className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                        {quizData.difficulty == 'hard' &&
                                            <div className="w-2 h-2 bg-black rounded-full"/>}
                                    </div>
                                </div>
                                <span
                                    className="text-cyan-800 font-medium text-left">Hard</span>
                            </button>
                        </div>
                    </div>
                </> : <h6>quiz Data not found</h6>}


            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full max-w-screen-xl z-10">
                {Category?.map((cat: any, index: any) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-lg text-cyan-800 font-semibold text-center px-4 py-6 rounded-2xl shadow-lg
                        border-2 border-transparent hover:border-cyan-400 hover:shadow-2xl
                        transform transition-all duration-300 hover:scale-105
                        animate-fadeInUp cursor-pointer hover:text-yellow-500 hover:border-yellow-500"
                        style={{animationDelay: `${index * 40}ms`, animationFillMode: 'both'}}
                        onClick={() => goTo()}
                    >
                        <i className={cat.icon}></i>
                        <p className="text-sm sm:text-sm"> {cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
