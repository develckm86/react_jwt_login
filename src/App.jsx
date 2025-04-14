import {BrowserRouter, Route, Routes} from "react-router";
import HeaderNav from "./component/HeaderNav.jsx";
import Home from "./page/Home.jsx";
import UserList from "./page/user/UserList.jsx";
import BoardList from "./page/board/BoardList.jsx";
import AdminUserList from "./page/admin/user/AdminUserList.jsx";
import AdminBoardList from "./page/admin/board/AdminBoardList.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";

function App() {

  return (
    <BrowserRouter>
      <HeaderNav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/user">
            <Route path="list" element={<UserList/>}></Route>
        </Route>
        <Route path="/board">
            <Route path="list" element={<BoardList/>}></Route>
        </Route>
        <Route path="/admin">
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

export default App
