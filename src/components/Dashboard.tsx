import {Category} from '../constants/Category.js'
import {useNavigate} from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    const goTo = (category) => {
        navigate('/question')
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
                🎓 Choose Topic
            </h1>

            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full max-w-screen-xl z-10">
                {Category?.map((cat, index) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-lg text-cyan-800 font-semibold text-center px-4 py-6 rounded-2xl shadow-lg
                        border-2 border-transparent hover:border-cyan-400 hover:shadow-2xl
                        transform transition-all duration-300 hover:scale-105
                        animate-fadeInUp cursor-pointer hover:text-yellow-500 hover:border-yellow-500"
                        style={{animationDelay: `${index * 40}ms`, animationFillMode: 'both'}}
                        onClick={(cat) => goTo(cat)}
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
