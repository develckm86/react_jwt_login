import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router";
import HeaderNav from "./component/HeaderNav.jsx";
import Home from "./page/Home.jsx";
import UserList from "./page/user/UserList.jsx";
import BoardList from "./page/board/BoardList.jsx";
import AdminUserList, {authFetch} from "./page/admin/user/AdminUserList.jsx";
import AdminBoardList from "./page/admin/board/AdminBoardList.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import {useLoginUser} from "./provider/LoginUserProvider.jsx";
import Logout from "./page/Logout.jsx";
import {useQuery} from "@tanstack/react-query";

async function checkLoginUser(){
    const jwt=localStorage.getItem("jwt");
    if(!jwt){return null;}
    try {
        const resp=await authFetch("http://localhost:9999/user/api/check.do");
        const {user,jwt}=await resp.json();
        console.log(user,jwt);
        localStorage.setItem("jwt",jwt); //만료시간 연장
        return user;
    }catch (e){ //만료된 유저
        console.log(e);
        localStorage.removeItem("jwt");
        throw new Error(e);
    }
}
function App() {
    const [,setLoginUser]=useLoginUser();
    useQuery({
        queryFn:async ()=>{
            try {
                const user=await checkLoginUser()
                console.log(user);
                setLoginUser(user);
                return user;
            }catch (e){
                setLoginUser(null);
                console.log(e);

            }
        },
        queryKey:["loginUser"],
        retry:1,
    });
  return (
        <BrowserRouter>
          <HeaderNav/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/user">
                <Route path="list" element={<UserList/>}></Route>
            </Route>
            <Route path="/board" element={ <LoginRouteFilter/>}>
                <Route path="list" element={<BoardList/>} ></Route>
            </Route>
            <Route path="/admin" element={<AdminRouteFilter />}>
                <Route path="user">
                    <Route path="list" element={<AdminUserList/>}></Route>
                </Route>
                <Route path="board">
                    <Route path="list" element={<AdminBoardList/>}></Route>
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
  )
}

function LoginRouteFilter({children}) {
    const [loginUser, ] = useLoginUser();
    if (loginUser) {
        if (children) {
            return children;
        }
        return <Outlet/>;
    }
    alert("로그인 후 이용하세요");
    return <Navigate to="/login"></Navigate>
}

function AdminRouteFilter({children}) {
    const [loginUser, ] = useLoginUser();
    if (loginUser && loginUser.role === "ADMIN") {
        if (children) {
            return children;
        }
        return <Outlet/>;
    }
    alert("권한이 없습니다.")
    return <Navigate to="/login"></Navigate>
}



export default App
