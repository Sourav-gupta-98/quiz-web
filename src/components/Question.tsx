import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import axios from "axios";


interface SelfData {
    self: any;
    token: any;
}

const Question = () => {
    const appUrl = import.meta.env.VITE_API_BACKEND_URL;
    const navigate = useNavigate();
    const [selfData, setSelfData] = useState<SelfData | undefined>(undefined);
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
        CheckLogin()
    }, []);
    useEffect(() => {
        get()
    }, [selfData]);

    const CheckLogin = () => {
        let self = localStorage.getItem('self');
        let token = localStorage.getItem('token');
        if (self && token) {
            setSelfData({self: JSON.parse(self), token: token});
        } else {
            toast.warning('Please Login!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                theme: 'colored'
            })
            navigate('/auth');
        }
    }

    const get = async () => {
        try {
            console.log('selfData get', selfData);
            let response = await axios.get(`${appUrl}question`, {
                headers: {
                    Authorization: `Bearer ${selfData?.token}`
                }
            })
            console.log(response);
            if (response.status == 200) {
                console.log(response.data.questions)
                setQuestion(response.data.questions);
            } else {
                // toast.error(response.data.errorDetails);
            }
        } catch (err: any) {
            console.log(err, err.data, err.error)
            if (err.status == 401) {
                toast.error(err.response.data.errorDetails);
                localStorage.removeItem('self');
                localStorage.removeItem('token');
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
                        className="relative min-h-screen bg-gradient-to-br from-cyan-200 to-cyan-400 p-4 flex items-center justify-center overflow-hidden">
                        {/* Background Blobs */}
                        <div
                            className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div
                            className="absolute top-[200px] right-[-50px] w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                        {/* Question Card */}
                        <div className="z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                            {/* Icon and Question */}
                            <div className="flex items-center mb-4">
                                <div className="text-cyan-600 text-3xl mr-2"></div>
                                <h1 className="text-2xl font-bold text-cyan-700">{question?.question}</h1>
                            </div>

                            {/* Options */}
                            {question.option_1 && <div className="space-y-3 mt-4">
                                <button onClick={() => setSelectOption(question.option_1)}
                                        className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${selectOption === question?.option_1 ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                    <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                        <div
                                            className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                            {selectOption === question?.option_1 &&
                                                <div className="w-2 h-2 bg-black rounded-full"/>}
                                        </div>
                                    </div>
                                    <span className="text-cyan-800 font-medium text-left">{question?.option_1}</span>
                                </button>
                            </div>}

                            {question.option_2 && <div className="space-y-3 mt-4">
                                <button onClick={() => setSelectOption(question.option_2)}
                                        className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${selectOption === question?.option_2 ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                    <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                        <div
                                            className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                            {selectOption === question?.option_2 &&
                                                <div className="w-2 h-2 bg-black rounded-full"/>}
                                        </div>
                                    </div>
                                    <span className="text-cyan-800 font-medium text-left">{question?.option_2}</span>
                                </button>
                            </div>}

                            {question.option_3 && <div className="space-y-3 mt-4">
                                <button onClick={() => setSelectOption(question.option_3)}
                                        className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${selectOption === question?.option_3 ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                    <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                        <div
                                            className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                            {selectOption === question?.option_3 &&
                                                <div className="w-2 h-2 bg-black rounded-full"/>}
                                        </div>
                                    </div>
                                    <span className="text-cyan-800 font-medium text-left">{question?.option_3}</span>
                                </button>
                            </div>}

                            {question.option_4 && <div className="space-y-3 mt-4">
                                <button onClick={() => setSelectOption(question.option_4)}
                                        className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${selectOption === question?.option_4 ? "bg-cyan-200 scale-[1.01] shadow-md" : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"}`}>
                                    <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                        <div
                                            className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                            {selectOption === question?.option_4 &&
                                                <div className="w-2 h-2 bg-black rounded-full"/>}
                                        </div>
                                    </div>
                                    <span className="text-cyan-800 font-medium text-left">{question?.option_4}</span>
                                </button>
                            </div>}


                            {/* Confirm Button */}
                            <div className="mt-6 flex justify-between">
                                <button
                                    disabled={selectOption === null}
                                    className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
                                        selectOption === null
                                            ? "bg-red-300 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                    }`}
                                >
                                    Skip
                                </button>
                                <button
                                    disabled={selectOption === null}
                                    className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
                                        selectOption === null
                                            ? "bg-cyan-300 cursor-not-allowed"
                                            : "bg-cyan-600 hover:bg-cyan-700"
                                    }`}
                                    onClick={submit}>
                                    Confirm
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 text-sm text-gray-500 flex justify-between">
                                <span>Category: {question.category}</span>
                                <span>Difficulty: {question.difficulty}</span>
                            </div>

                            <div className="flex justify-center mt-5">
                                <button
                                    disabled={selectOption === null}
                                    className="px-6 py-2 text-white font-semibold rounded-lg transition bg-green-500 hover:bg-green-600"
                                    onClick={get}>
                                    Next Question
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
