import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';



const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing!</h2>;
const App = () => {
  return (
    // container will add empty space for the whole page component
    <div className="container">
      <BrowserRouter>
      {/*has only one child*/}
        <div>
          {/*header here will like text between routes, which will ne always visible*/}
          <Header />
          <Route exact path='/' component = {Landing} />
          <Route exact path='/surveys' component = {Dashboard} />
          <Route path='/surveys/new' component={SurveyNew} /> 
        </div>
      </BrowserRouter>
    </div>
  );
};


export default App;