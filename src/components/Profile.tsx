const Profile = () => {
    const categories = Array.from({ length: 32 }, (_, i) => `Category ${i + 1}`);
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-600 p-6 sm:p-10">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-md">
                🎓 My Profile
            </h1>

            {/* Profile Card */}
            <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/30 shadow-2xl mb-12 transition duration-300 animate-fade-in-down">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 rounded-xl bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-xl bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Category (True/False)</label>
                        <select className="w-full p-3 rounded-xl bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-cyan-600">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Difficulty</label>
                        <select className="w-full p-3 rounded-xl bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-cyan-600">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Select Category</label>
                        <select className="w-full p-3 rounded-xl bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-cyan-600">
                            {categories.map((cat, i) => (
                                <option key={i}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-fade-in-up">
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        className="group bg-white/20 border border-white/30 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        <div className="text-4xl mb-2 transition-transform group-hover:scale-125">
                            {i % 3 === 0 ? "🚀" : i % 3 === 1 ? "🧠" : "🌟"}
                        </div>
                        <p className="font-bold text-white drop-shadow-sm">{cat}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Profile;
