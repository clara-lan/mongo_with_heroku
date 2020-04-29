import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import StripePayment from './StripePayment';

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return ;// during fetching, it returns nothing
      case false:
        return <a href="/auth/google">Login With Google</a>;
      default:
        //return different component as an array
        return [
          <Nav.Item key="1" style={{margin: "auto 14px"}}> <StripePayment /> </Nav.Item> ,
          <Nav.Item key ="3" style={{margin:'26px 10px', color:'white'}}> 
            Credits:{this.props.auth.credits}
          </Nav.Item>,
          <Nav.Link key="2" href="/api/logout" style={ {margin:'auto 9px', color:'white'} }>
            Log out
          </Nav.Link>
         
      ];
    }
  }

  render(){
    return (
      <Navbar bg="info" expand="lg" variant="dark">
        <Navbar.Brand > 
          <Nav.Link to={this.props.auth ? '/surveys': '/'} style={{color:'white'}}
          >
            Emaily
          </Nav.Link>
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