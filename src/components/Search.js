import React, { Component } from 'react';
import { Container, Row, Col, Button, Nav} from 'react-bootstrap';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            authenticatedLoggedUser : "",
            searchKeyword : "",
            planets : []
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
    handleSearch(e){
        this.setState({
            searchKeyword : e.target.value
        })
        console.log(e.target.value);
        if(e.target.value.length >=1 ) {
            console.log("trying fetch");
            fetch(`https://swapi.co/api/planets/?search=${e.target.value}`)
            .then(response => response.json())
            .then( data => {    
                    console.log(data);
                    this.setState({
                        planets : data.results
                    });
                    console.log(this.state.planets);
                }
            )
            .catch(error => this.setState({ error}));
        }
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
                                value={this.state.searchKeyword}
                                onChange={this.handleSearch}
                            />
                        </Col>
                        <Col>
                            <Button>Search</Button>
                        </Col>
                    </Row>
                    <div className="search-results">
                        Search results...<br/>
                        {
                            this.state.planets.map( planet => (
                                        
                                <div key={planet.name} className="card card-body">
                                Planet <h4 className="card-title">{planet.name}</h4>
                                <p className="card-text">
                                    Climate: {planet.climate}<br/>
                                    Diameter: {planet.diameter}<br/>
                                    Population: {planet.population}<br/>
                                    Terrain: {planet.terrain}<br/>
                                </p>
                                <Button href="#" className="btn btn-info">More</Button>
                                </div>

                            )
                                
                            )
                        }

                    </div>
                </Container>
            </div>
        )
    }
}

export default Search;
