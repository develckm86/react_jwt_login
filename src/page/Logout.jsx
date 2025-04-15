import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useLoginUser} from "../provider/LoginUserProvider.jsx";
import {useMutation} from "@tanstack/react-query";

async function loadLogout(){
    const jwt=localStorage.getItem("jwt");
    const response=await fetch("http://localhost:5000/api/logout",{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${jwt}`
        }
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }else {
        localStorage.removeItem("jwt");
    }
}
export default function Logout(){
    const navigate = useNavigate();
    const [user, setUser] = useLoginUser();
    const logoutMutate=useMutation({
        mutationFn : loadLogout,
        onSuccess : ()=>{
            alert(user.username+" 안녕히가세요~");
            setUser(null);
            navigate("/");
        },
        onError : (err)=>{
            console.log(err)
            alert("로그아웃 실패 다시 시도하세요.")
            navigate(-1);
        }
    })
    useEffect(()=>{
        const logout=confirm("로그아웃 하시겠습니까?");
        if(logout){
            logoutMutate.mutate();
        }else {
            navigate(-1);
        }
    },[])
    return (<></>)
}