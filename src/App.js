import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navber from './components/Nevber';
import Login from './page/Login';
import Register from './page/Register';
import Profile from './page/Profile'
import Home from './page/Home'
import Detail from './page/Detail'
import Pay from './page/Payment';
import Dasborad from './page/Dasborad';
import Selectlevel from './page/Selectlevel';
import Videoplay from './page/Videoplay';
import Shop from './page/Shop'
import Historylist from './page/Historylist'
import ForgotPassword from './page/ForgotPassword'
import Newpassword from './page/Newpassword'
import Preview from './page/Preview'


// addmin
import Dassborad from './admin/Dassboradadmin'
import Addcouse from './admin/Addcouse'
import Updatecouse from './admin/Updatecouse'
import Addlevel from './admin/Addlevel'
import Bank from './admin/Bank_account'
import Updatelevel from './admin/Updatelevel'
import Datacouse from './admin/Datacouse'
import Listuserdata from './admin/Listuserdata'
import Datauser from './admin/Datauser'
import Couse from './admin/Couse'
import Addvideo from './admin/Addvideo'



import Hdetail from './page/Hdetail.js'
import Updatedate from './page/Updatedate'
import './styles/background.css'
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'

function App() {
  const history = useHistory();
  const path = useLocation().pathname;
  const [right, setright] = useState(null)
  useEffect(() => {
    checklogin();
  }, [path])

  function checklogin() {
    const token = localStorage.getItem("token");
    if (path !== "/login" && path !== "/register" && path !== '/' && path !== '/ForgotPassword' && path !== "/Newpassword") {
      if (!token) {
        swal({
          icon: "info",
          title: "กรุณาล็อกอิน"
        })
        history.push("/login");
      } else {
        axios({
          url: "http://34.66.210.189/check-login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ token })
        }).then(res => {
          setright(res.data.rights)
          if (res.data.rights === "") {
            localStorage.removeItem("token");  
            history.push("/login");
          }
        }).catch(e => {
          localStorage.removeItem("token");
          history.push("/login");
        })
      }
    }
  }

  return (
    <div>
      <Navber rights={right} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/ForgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/Newpassword">
          <Newpassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/payment/:price">
          <Pay />
        </Route>
        <Route path="/dasborad">
          <Dasborad />
        </Route>
        <Route path="/level/:id">
          <Selectlevel />
        </Route>
        <Route path="/video/:id/:level">
          <Videoplay />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/Preview/:name/:level">
          <Preview />
        </Route>
        <Route path="/history">
          <Historylist />
        </Route>
        <Route path="/historydetail/:Id">
          <Hdetail />
        </Route>
        <Route path="/update">
          <Updatedate />
        </Route>


        {/* admin */}
        <Route path="/userdata">
          <Listuserdata />
        </Route>
        <Route path="/dasboradadmin">
          <Dassborad />
        </Route>
        <Route path="/insertdata">
          <Addcouse />
        </Route>
        <Route path="/updatecouse/:id">
          <Updatecouse />
        </Route>
        <Route path="/Addlevel">
          <Addlevel />
        </Route>
        <Route path="/updatelevel/:id/:level">
          <Updatelevel />
        </Route>
        <Route path="/bank-account">
          <Bank />
        </Route>
        <Route path="/datacouse/:id">
          <Datacouse />
        </Route>
        <Route path="/datauser/:id/:idcouse">
          <Datauser />
        </Route>
        <Route path="/cousedata/:id">
          <Couse />
        </Route>
        <Route path = "/previewVideo/:name/:level">
          <Addvideo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
