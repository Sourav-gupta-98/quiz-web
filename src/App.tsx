import {Route, Routes} from "react-router";
import Auth from "./components/Auth";
import {ToastContainer} from 'react-toastify';
import Dashboard from "./components/Dashboard.tsx";
import Profile from "./components/Profile.tsx";
import Question from "./components/Question.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/question" element={<Question/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
