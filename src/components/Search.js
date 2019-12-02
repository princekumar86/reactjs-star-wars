import React, { Component } from 'react';
import { Container, Row, Col, Button, Nav} from 'react-bootstrap';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            authenticatedLoggedUser : ""
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem("authenticatedUser") === null) {
            this.props.history.push("/");
          } else {
            this.setState({
                authenticatedLoggedUser:localStorage.getItem("authenticatedUser")
            });
          }
    }
    handleLogout(){
        localStorage.removeItem("authenticatedUser");
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <Nav className="navbar navbar-light bg-light">
                    Star Wars > 
                    {" Logged in as :" + this.state.authenticatedLoggedUser}
                <ul className="nav navbar-nav navbar-right">
                    <li><button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogout}>Logout</button></li>
                </ul>
                </Nav>
                <Container>
                    <Row>
                        <Col md="10">
                            <input type="text" 
                                placeholder="Search a planet..." 
                                className="searchinput"
                            />
                        </Col>
                        <Col>
                            <Button>Search</Button>
                        </Col>
                    </Row>
                    <div className="search-results">
                        Search results...<br/>

                    </div>
                </Container>
            </div>
        )
    }
}

export default Search;
