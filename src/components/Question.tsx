import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import axios from "axios";
import {LoginData} from "../ContextData.tsx";
import * as he from 'he';

const Question = () => {
    const appUrl = import.meta.env.VITE_API_BACKEND_URL;
    const selfData = useContext(LoginData)
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        id: '',
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        category: '',
        difficulty: '',
        type: ''
    });
    const [selectOption, setSelectOption] = useState("");

    useEffect(() => {
        let self = localStorage.getItem('self');
        let token = localStorage.getItem('token');
        if ((!selfData || !selfData.self || !selfData.token) && self && token) {
            return;
        } else if ((!selfData || !selfData.self || !selfData.token) && (!self || !token)) {
            navigate('/auth');
        }
        CheckLogin()
    }, [selfData]);

    const CheckLogin = () => {
        console.log(selfData);
        // return
        if (!selfData?.self || !selfData?.token) {
            navigate('/auth');
        }
        get()
    }

    const get = async () => {
        try {
            let response = await axios.get(`${appUrl}question`, {
                headers: {
                    Authorization: `Bearer ${selfData?.token}`
                }
            })
            if (response.status == 200) {
                setQuestion(response.data.questions);
            }
        } catch (err: any) {
            toast.error(err.response.data.errorDetails);
            if (err.response.status == 401) {
                navigate('/auth');
            }
        }
    }

    const submit = async () => {
        if (!question || !selectOption) {
            toast.warning('Please Select Option!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                theme: 'colored'
            });
            return;
        }
        const params = {
            question_id: question.id,
            answer: selectOption,
        }
        try {
            let response = await axios.put(`${appUrl}question`, params, {
                headers: {
                    Authorization: `Bearer ${selfData?.token}`
                }
            })
            if (response.status == 200) {
                setSelectOption("");
                toast.success(response.data.message);
                get()
            } else if (response.status == 404) {
                toast.error(response.data.errorDetails);
                get()
            }
        } catch (err: any) {
            if (err.response.data.message) {
                toast.error(err.response.data.message + ', ' + 'Correct option is ' + err.response.data.data);
            } else {
                toast.error(err.response.data.errorDetails);
            }

        }
    }

    return (
        <>
            {
                question && question.id ?
                    <div
                        className="relative min-h-screen bg-gradient-to-br from-cyan-300 via-cyan-400 to-violet-500 p-4 flex items-center justify-center overflow-hidden"
                    >
                        {/* Background Blobs */}
                        <div
                            className="absolute top-[-60px] left-[-60px] w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
                        ></div>
                        <div
                            className="absolute top-[220px] right-[-70px] w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
                        ></div>
                        <div
                            className="absolute bottom-[100px] left-[100px] w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
                        ></div>
                        {/* Quiz Card */}
                        <div
                            className="z-10 w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2rem] border-4 border-pink-200 shadow-xl shadow-pink-200/40 p-8 animate-fade-in-down hover:scale-[1.01] transition-all duration-300 ease-out">

                            {/* Question Header */}
                            <div className="flex items-center mb-6 gap-3 animate-bounce-slow">
                                <div className="text-4xl animate-wiggle"><i className="fa fa-question text-indigo-500 text-4xl"></i></div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-600 leading-snug drop-shadow-sm">{he.decode(question?.question)}</h1>
                            </div>

                            {/* Options List */}
                            {[question.option_1, question.option_2, question.option_3, question.option_4].map((opt, i) => (
                                opt && (
                                    <div className="mt-4" key={i}>
                                        <button
                                            onClick={() => setSelectOption(opt)}
                                            className={`w-full flex items-center px-5 py-4 rounded-xl text-left transition-all duration-200 border-2
              ${
                                                selectOption === opt
                                                    ? "bg-yellow-100 border-pink-400 scale-[1.02] shadow-lg shadow-pink-200"
                                                    : "bg-white hover:bg-yellow-50 hover:border-yellow-300 hover:scale-[1.01]"
                                            }`}>
                                            <div className="w-6 h-6 mr-4 flex items-center justify-center">
                                                <div
                                                    className="w-5 h-5 border-2 border-pink-600 rounded-full flex items-center justify-center">
                                                    {selectOption === opt && <div
                                                        className="w-3 h-3 bg-pink-600 rounded-full animate-ping"/>}
                                                </div>
                                            </div>
                                            <span
                                                className="text-lg text-pink-800 font-semibold">{he.decode(opt)}</span>
                                        </button>
                                    </div>
                                )
                            ))}

                            {/* Confirm Answer */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    disabled={selectOption === null}
                                    className={`px-6 py-3 rounded-xl shadow-lg font-bold text-white transition-all text-lg 
          ${selectOption === null
                                        ? "bg-pink-300 cursor-not-allowed"
                                        : "bg-pink-500 hover:bg-pink-600 hover:scale-105"}`}
                                    onClick={submit}>
                                    🎯 Confirm Answer
                                </button>
                            </div>

                            {/* Info Footer */}
                            <div className="mt-6 text-sm text-gray-600 flex justify-between px-2 italic">
                                <span>📚 Category: {question.category}</span>
                                <span>⭐ Difficulty: {question.difficulty}</span>
                            </div>

                            {/* Next Question */}
                            <div className="flex justify-center mt-6">
                                <button
                                    disabled={selectOption === null}
                                    className="px-6 py-3 text-white font-bold rounded-xl transition bg-green-500 hover:bg-green-600 hover:scale-105 shadow-lg"
                                    onClick={get}>
                                    🚀 Next Question
                                </button>
                            </div>
                        </div>
                    </div>


                    :
                    <div
                        className="relative min-h-screen bg-gradient-to-br from-cyan-200 to-cyan-400 p-4 flex items-center justify-center overflow-hidden">
                        <i className="fa fa-spinner text-black animate-spin text-xl text-center"></i>
                    </div>
            }
        </>

    )
}
export default Question
