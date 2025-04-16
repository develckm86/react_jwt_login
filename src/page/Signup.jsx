import {Button} from "react-bootstrap";
import {useLocation} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
async function loadSignup(user){

}
export default function Signup() {
    const location = useLocation();
    const user=location.state;
    const [signupUser,setSignupUser] = useState(user)
    const signupMutate=useMutation({
        mutationFn: loadSignup,
    })
    const submitSignup=(e)=>{
        e.preventDefault();
        signupMutate.mutate(signupUser)
    }


    return (
        <>
            <div className="text-center">
                <h1 className="m-5">회원가입 양식입니다.</h1>
                <form onSubmit={submitSignup}>
                    <p>유저아이디 : {user && user.id}</p>
                    <p>회원가입 양식 작성하세요.  <Button>회원가입</Button></p>

                </form>
            </div>

        </>
    )
}