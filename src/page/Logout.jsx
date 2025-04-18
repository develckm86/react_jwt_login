import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useLoginUser} from "../provider/LoginUserProvider.jsx";
import {useMutation} from "@tanstack/react-query";

export default function Logout(){
    const navigate = useNavigate();
    const [user, setUser] = useLoginUser();
    useEffect(()=>{
        const logout=confirm("로그아웃 하시겠습니까?");
        if(logout){
            localStorage.removeItem("jwt");
            setUser(()=>null);
            navigate("/");
        }else {
            navigate(-1);
        }
    },[])
    return (<></>)
}