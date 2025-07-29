import {useState} from "react";

const Question = () => {
    const question = {
        user_id: 1,
        question: "What numbers are in the 5th row of Pascal's Triangle?",
        option_1: "1 6 15 20 15 6 1",
        option_2: "1 3 3 1",
        option_3: "1 4 6 4 1",
        option_4: "1 5 10 10 5 1",
        category: "Science: Mathematics",
        difficulty: "medium",
        type: "multiple",
        id: 5,
    };
    const options = [question.option_1, question.option_2, question.option_3, question.option_4].filter(Boolean);
    const [selectedIndex, setSelectedIndex] = useState(null);
    return (
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
                    <h1 className="text-2xl font-bold text-cyan-700">{question.question}</h1>
                </div>

                {/* Options */}
                <div className="space-y-3 mt-4">
                    {options.map((option: any, index: any) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`w-full flex items-center px-5 py-3 rounded-lg transition-all duration-200
                ${
                                selectedIndex === index
                                    ? "bg-cyan-200 scale-[1.01] shadow-md"
                                    : "bg-cyan-100 hover:bg-cyan-200 hover:scale-[1.02]"
                            }`}
                        >
                            <div className="w-5 h-5 mr-4 flex items-center justify-center">
                                <div
                                    className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
                                    {selectedIndex === index && <div className="w-2 h-2 bg-black rounded-full"/>}
                                </div>
                            </div>
                            <span className="text-cyan-800 font-medium text-left">{option}</span>
                        </button>
                    ))}
                </div>

                {/* Confirm Button */}
                <div className="mt-6 flex justify-between">
                    <button
                        disabled={selectedIndex === null}
                        className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
                            selectedIndex === null
                                ? "bg-red-300 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                        Skip
                    </button>
                    <button
                        disabled={selectedIndex === null}
                        className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
                            selectedIndex === null
                                ? "bg-cyan-300 cursor-not-allowed"
                                : "bg-cyan-600 hover:bg-cyan-700"
                        }`}
                    >
                        Confirm
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-500 flex justify-between">
                    <span>Category: {question.category}</span>
                    <span>Difficulty: {question.difficulty}</span>
                </div>
            </div>
        </div>
    )
}
export default Question
