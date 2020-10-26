import React, {useState} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';

const Sitebar = (props) => {

  const [isOpen, setIsOpen ] = useState(false);

  const toggle = () => {                            // declares a toggler
    let newIsOpen = !isOpen;                        // declares a second toggler-variable, initializes it to the opposite of isOpen
    setIsOpen(newIsOpen);                           // sets isOpen to the second toggler-variable (reversing the current setting)
  }        // Why not:   setIsOpen(!isOpen);     ????

  return (
    <Navbar color="faded" light expand="md">
      <NavbarBrand href="/">Workout Log</NavbarBrand>
      <NavbarToggler onClick={ toggle } />
      <Collapse isOpen={ isOpen } navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button onClick={ props.clickLogout }>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )

};


export default Sitebar;