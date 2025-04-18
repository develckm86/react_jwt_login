import {Button, FloatingLabel, FormFloating} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import {useLoginUser} from "../provider/LoginUserProvider.jsx";
async function loadSignup(signupUser){
    const response=await fetch("http://localhost:9999/user/api/oauth/signup.do",{
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(signupUser),
        method:"POST"
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const {jwt,user}=await response.json();

    localStorage.setItem("jwt",jwt);
    return user;
}
export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const user=location.state;
    const [signupUser,setSignupUser] = useState(user)
    const [loginUser,setLoginUser]=useLoginUser();
    const signupMutate=useMutation({
        mutationFn: loadSignup,
        onSuccess:(user)=>{
            console.log(user);
            setLoginUser(user);
            alert("회원가입을 축하합니다.");
            navigate("/");
        },
        onError:(err)=>{
            console.log(err);
            alert("가입 실패입니다. 다시 시도하세요.");
        }

    })
    const submitSignup=(e)=>{
        e.preventDefault();
        signupMutate.mutate(signupUser);
    }
    const inputHandler=(e)=>{
        const{value,name}=e.target;
        setSignupUser(preUser=>({
            ...preUser,
            [name]:value
        }))
    }
    return (
        <>
            <div className="text-center">
                <h1 className="m-5">회원가입 양식입니다.</h1>
                <form className="mx-auto" onSubmit={submitSignup} style={{width:'400px'}}>
                    <FloatingLabel label="User ID" className="mb-3">
                        <Form.Control name="id" value={signupUser.id} readOnly={true}></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="이름을 입력하세요" className="mb-3">
                        <Form.Control name="name" value={signupUser.name} onChange={inputHandler}></Form.Control>
                    </FloatingLabel>
                    <p><Button type="submit">회원가입</Button></p>
                </form>
            </div>

        </>
    )
}