import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "../store"
import { addToHistory } from "../lib/userData"
import { readToken, removeToken } from "../lib/authenticate"

export default function MainNav() {
  const router = useRouter()
  let token = readToken()

  function logout() {
    removeToken()
    setExpanded(false)
    router.push("/login")
  }

  const [searchField, setSearchField] = useState("")
  const [isExpanded, setExpanded] = useState(false)

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  async function submitForm(e) {
    e.preventDefault()

    let queryString = `title=true&q=${searchField}`
    if (searchField != "") {
      //setSearchHistory((current) => [...current, queryString])
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
      router.push(`/artwork?title=true&q=${searchField}`)
      setSearchField("")
    }
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-primary"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Cleverson Dionisio</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={(e) => setExpanded((n) => (n = !n))}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={(e) => setExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={(e) => setExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" variant="success">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;&nbsp;
            {token && (
              <NavDropdown
                title={<span className="text-success">{token.userName}</span>}
                id="basic-nav-dropdown"
              >
                <Link href="/favourites" passHref>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={(e) => setExpanded(false)}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={(e) => setExpanded(false)}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>

                <NavDropdown.Item
                  active={router.pathname === "/logout"}
                  onClick={logout}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav className="ml-auto" expanded={false}>
              {!token && (
                <Link href="/register" passHref>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={(e) => setExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
              )}

              {!token && (
                <Link href="/login" passHref>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={(e) => setExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  )
}
