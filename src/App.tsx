import {Navigate, Route, Routes} from "react-router";
import Auth from "./components/Auth";
import {ToastContainer} from 'react-toastify';
import Dashboard from "./components/Dashboard.tsx";
import Profile from "./components/Profile.tsx";
import Question from "./components/Question.tsx";
import {useEffect, useState} from "react";
import {LoginData} from "./ContextData.tsx";

function App() {

    const [selfData, setSelfData] = useState({self: '', token: ''});
    useEffect(() => {
        let self = localStorage.getItem("self");
        let token = localStorage.getItem("token");
        if (self && token) {
            setSelfData({self: JSON.parse(self), token: token});
            console.log('self get in app', selfData);
        }
    }, [])
    const updateSelfData = (data: any) => {
        setSelfData(data);
    }
    return (
        <>
            <LoginData.Provider value={selfData}>
                <Routes>
                    {/*//@ts-ignore*/}
                    <Route path="/auth" element={<Auth updateSelfData={updateSelfData}/>}/>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/question" element={<Question/>}/>
                    <Route path="*" element={<Navigate to='/auth'/>}/>
                </Routes>
                <ToastContainer/>
            </LoginData.Provider>
        </>
    )
}

export default App
