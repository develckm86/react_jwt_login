import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useLocation} from "react-router";
import {useLoginUser} from "../provider/LoginUserProvider.jsx";

export default function HeaderNav() {
    const [user]=useLoginUser();
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/" >HOME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/board/list">게시글 리스트</Nav.Link>
                            <NavDropdown title="관리자" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/admin/user/list">유저 리스트</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/board/list">게시글 관리</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {user ?
                            <Nav>
                                <Nav.Link as={Link} to={`/user/${user.id}/detail`} >{user.name}({user.username})</Nav.Link>
                                <Nav.Link as={Link} to="/logout" >로그아웃</Nav.Link>
                            </Nav> :
                            <Nav>
                                <Nav.Link as={Link} to="/login" >로그인</Nav.Link>
                                <Nav.Link as={Link} to="/signup" >회원가입</Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>


                </Container>
            </Navbar>

        </header>
    )
}