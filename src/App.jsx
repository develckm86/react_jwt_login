import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router";
import HeaderNav from "./component/HeaderNav.jsx";
import Home from "./page/Home.jsx";
import UserList from "./page/user/UserList.jsx";
import BoardList from "./page/board/BoardList.jsx";
import AdminUserList from "./page/admin/user/AdminUserList.jsx";
import AdminBoardList from "./page/admin/board/AdminBoardList.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import {LoginUserProvider, useLoginUser} from "./provider/LoginUserProvider.jsx";
import {useState} from "react";
import Logout from "./page/Logout.jsx";

function App() {

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
