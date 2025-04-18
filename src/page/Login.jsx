import {Button, FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {useLoginUser} from "../provider/LoginUserProvider.jsx";
import {Link, useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {jwtDecode} from "jwt-decode";
import {GoogleLogin} from "@react-oauth/google";

async function loadLogin(loginUser) {
    const response=await fetch("http://localhost:9999/user/api/login.do", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
    })
    if (!response.ok){
        throw new Error(response.statusText);
    }
    const {jwt,user}= await response.json();
    console.log(jwt,user);
    localStorage.setItem("jwt",jwt);
    return user;
}
async function googleLogin(credentials) {
    const idToken=jwtDecode(credentials.credential)
    console.log(idToken);
    const response=await fetch("http://localhost:9999/user/api/oauth/google/login.do", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(idToken)
    })
    if (!(response.ok || response.status === 409)) {
        throw new Error(response.statusText);
    }
    const data= await response.json();
    const {jwt,user}=data;
    if (jwt) {
        localStorage.setItem("jwt",JSON.stringify(jwt));
    }
    return data;

}
export default function Login() {
    const [user, setUser] = useState({id: "", pw:""});
    const [loginUser,setLoginUser]=useLoginUser();
    const loginMutate=useMutation({
        mutationFn:()=>loadLogin(user),
        onSuccess:(result)=>{
            console.log(result);
            setLoginUser(()=>result)
            alert("로그인 성공");
            navigate("/");
        },
        onError:(err)=>{
            console.log(err);
            alert("아이디나 비밀번호를 확인하세요.")
        }
    })
    const googleLoginMutate=useMutation({
        mutationFn:googleLogin,
        onSuccess:(data)=>{
            const {jwt,user}=data;
            if(jwt){
                alert("로그인 성공");
                setLoginUser(user);
                navigate("/");
            }else{
                console.log(user);
                confirm("구글계정으로 회원가입하겠습까?")
                && navigate("/signup",{state:user});
            }
        },
        onError:(error)=>{
            console.log(error.message);
            alert("로그인 실패")

        }
    })
    const navigate = useNavigate();
    function inputHandler(e) {
        const{value,name} = e.target;
        setUser(preUser=>({
            ...preUser,
            [name]:value
        }))
    }
     async function signupHandler(e) {
        e.preventDefault();
        loginMutate.mutate()

    }
    return (
        <div className="d-flex  flex-column align-items-center mt-5">
            <h1 className="mb-5">로그인 양식입니다.</h1>
            <form onSubmit={signupHandler} style={{width:'400px'}}>
                <FloatingLabel label="User ID" className="mb-3">
                    <Form.Control type="text" name="id" placeholder="" value={user.id} onChange={inputHandler}/>
                </FloatingLabel>
                <FloatingLabel label="User PW" className="mb-3">
                    <Form.Control type="text" name="pw" placeholder="" value={user.pw} onChange={inputHandler}/>
                </FloatingLabel>
                <p className="text-end">
                    <Button variant="outline-primary" type="submit">로그인</Button>
                </p>
            </form>
            <GoogleLogin
                onSuccess={(credentialResponse)=>{
                    googleLoginMutate.mutate(credentialResponse);
                }}/>
        </div>
    )
}