import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return(
    <div style={{textAlign:"center"}}>
      <h1>
        Emaily!
      </h1>
     <Link to="/surveys">
      Collect feedback!
      </Link>
    </div>
  );
};

export default Landing;