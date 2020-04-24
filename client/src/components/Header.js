import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return ;// during fetching, it returns nothing
      case false:
        return (<a href="/auth/google">Login With Google</a>);
      default:
        return <li><a href='/api/logout'>Log out</a></li>;
    }
  }

  render(){
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand > 
          <Link to={this.props.auth ? '/surveys': '/'}
          >
            Emaily
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="ml-auto">
            {this.renderContent()}
            {/* <Nav.Item>
              <Nav.Link href="#link">Login With Google</Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps( {auth} ){
  return { auth }; //destructring and = {auth: state.auth}
}


export default connect(mapStateToProps)(Header);