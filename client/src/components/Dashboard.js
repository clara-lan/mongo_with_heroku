import React from 'react';
import { Link } from 'react-router-dom';
import  { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () =>{
  return (
    <div>
      Dashboard
      <Link to="/surveys/new" style={{ position:"absolute", bottom:"15%", left:"85%" }}>
          <FontAwesomeIcon icon={ faPlusCircle } style={{ fontSize:"4em", color:"#17a2b8 " }} />
      </Link>
    </div>

  )
};

export default Dashboard;