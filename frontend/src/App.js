import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Axios from 'axios';


function App() {
  // const [data, setData] = useState(false)
  // useEffect(() => {
  //   Axios.get('http://localhost:6000/api/v1/admin/users')
  //   .then(res => {
  //     console.log(res.data)
  //     setData(res.data)
  //   })
    
  //   .catch(err => console.log(err))
    
  // }, [])
  // if(!data) {
  //   return <div />
  // }
  return (
    <Router>
      <Sidebar />
      <Switch>
        {/* <Route  path='/overview' exact component={Overview}  /> */}
        {/* <Route exact path='/overview'> <Overview  props={data}/></Route> */}
        <Route path='/reports' exact component={Reports} />
        <Route path='/reports/reports1' exact component={ReportsOne} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} />
      </Switch>
    </Router>
  );
}

export default App;