import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import awsExports from './aws-exports';
import LandingPage from "./routes/LandingPage";
import {
    Routes,
    Route,
    Navigate, Link
} from "react-router-dom";
import Footer from "./routes/Footer";
import AboutUs from "./routes/AboutUs";
import Map from "./routes/Map";
import Faq from "./routes/Faq";
import CustomerWelcomeP from "./routes/CustomerWelcomeP";
import Businesses from "./routes/Businesses";
import SignInCustomer from "./routes/NewCustomerLogin";
import SignUpBusiness from "./routes/NewBusinessSignUp";
import SignUpCustomer from "./routes/NewCustomerSignUp";
import SignInBusiness from "./routes/NewBusinessLogin";
import Dashboard from "./routes/Dashboard";
import {useEffect, useState} from "react";
import {Button, Header, Input, Menu} from 'semantic-ui-react'
import React from "react";
import Searchbar from "./routes/Searchbar";
import BusinessProfile from "./routes/BusinessProfile";
import axios from "axios";
import CustomerProfile from "./routes/CustomerProfile";




Amplify.configure(awsExports);

function App() {
    const [customer, setCustomer] = useState(null);
    const [business, setBusiness] = useState(null);
    const [businessInfo, setBusinessInfo] = useState(null);
    const email = localStorage.getItem('userId');

    let routing = null;

    useEffect(() => {
        const loggedInCustomer = localStorage.getItem("customer");
        if (loggedInCustomer) {
            const foundCustomer = JSON.parse(loggedInCustomer);
            setCustomer(foundCustomer);
        }
    }, []);

    useEffect(() => {
        const loggedInBusiness = localStorage.getItem("business");
        if (loggedInBusiness) {
            const foundBusiness = JSON.parse(loggedInBusiness);
            setBusiness(foundBusiness);
            axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
                .then(response => {
                    setBusinessInfo(response.data);
                })
        }
    }, []);

    const jsonData = {
        "TableName": "BusinessUserDB",
        "Key": {
            "businessId": {
                "S": email
            }
        }
    }

    if (!customer && !business){
        routing = <Navigate to='/' />
    }else if (customer && !business){
        routing = <Navigate to='/customer-profile' />
    }else if(business && !customer){
        routing = <Navigate to='/business-profile' />
    }

    async function handleLogout(){
        const user = await Auth.signOut();
        setCustomer(false)
        setBusiness(false)
        localStorage.clear();
        await Auth.signOut()
    }

  return (

        <div className="App">
            <nav>
                <Menu>
                    <Menu.Item header>
                        <Link to="/" style={{color: 'black'}}> Elite Managing </Link>
                    </Menu.Item>
                    <Menu.Item
                        name='Businesses'
                    >
                        <Link to="/Businesses" style={{color: 'black'}}> Businesses </Link>
                    </Menu.Item>
                    <Menu.Item
                        name='About Us'
                    >
                        <Link to="/AboutUs" style={{color: 'black'}}> About Us </Link>
                    </Menu.Item>
                    {/*{(business) && (
                        <>
                            <Header as='h1' textAlign='center' color='green' style={{marginLeft: '11em'}}>Welcome  {businessInfo.Item.businessName.S}</Header>
                        </>
                    )}*/}

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {/*<Input className='icon' icon='search' placeholder='Search...' />*/}
                            <Searchbar/>
                        </Menu.Item>
                        {!customer && !business && (
                            <>
                                <Menu.Item>
                                    <Button color='green' >

                                        <Link to="/BusinessLogin" style={{color: 'white'}}> Login as Business </Link>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button color='green' >

                                        <Link to="/CustomerLogin" style={{color: 'white'}}> Login as Customer </Link>

                                    </Button>
                                </Menu.Item>
                            </>
                        )}
                        {(customer || business) && (
                            <>
                                <Menu.Item>
                                    <Link to="/profile" style={{color: 'black'}}> Profile </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button color='green' onClick={handleLogout}>

                                        Logout

                                    </Button>
                                </Menu.Item>
                            </>
                        )}

                    </Menu.Menu>
                </Menu>
            </nav>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              {!business && <Route path="BusinessLogin" element={<SignInBusiness businessAuth={() => setBusiness(true)} />} />}
              {business && (
                  <>
                      <Route path="business-profile" element={<Dashboard />} />
                  </>
              )}
              <Route path="BusinessSignUp" element={<SignUpBusiness />} />
              {!customer && <Route path="CustomerLogin" element={<SignInCustomer customerAuth={() => setCustomer(true)}/>} />}
              {customer && (
                  <>
                      <Route path="customer-profile" element={<CustomerProfile customerLogout={() => setCustomer(false)}/>} />
                  </>
              )}

              <Route path="CustomerSignup" element={<SignUpCustomer />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="Faq" element={<Faq />} />
              <Route path="businesses" element={<Businesses />} />
              <Route path="map" element={<Map />} />
              <Route path="*" element={ routing } />
          </Routes>
            <Footer />
        </div>
  );
}

export default App;

