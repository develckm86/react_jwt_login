import {Button, FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
async function loadLogin(loginUser) {
    const response=await fetch("http://localhost:9999/user/api/login.do", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
    })
    if (!response.ok) throw new Error(response.statusText);
    const {jwt,user}= await response.json();
    console.log(jwt,user);
    const expirationDate=new Date().getTime()+(1000*60*30); //지금부터 30분 뒤에 조회되는 jwt는 삭제
    localStorage.setItem("jwt",JSON.stringify({data:jwt,expires:expirationDate}));
}

export default function Login() {
    const [user, setUser] = useState({id: "", pw:""});

    function inputHandler(e) {
        const{value,name} = e.target;
        setUser(preUser=>({
            ...preUser,
            [name]:value
        }))
    }

    function signupHandler(e) {
        e.preventDefault();
        loadLogin(user);

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
        </div>
    )
}