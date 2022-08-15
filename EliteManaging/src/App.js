import '@aws-amplify/ui-react/styles.css';
import {Amplify, Auth} from 'aws-amplify';
import awsExports from './aws-exports';
import {
    Routes,
    Route,
    Navigate, Link
} from "react-router-dom";
import Footer from "./routes/components/Footers/Footer.js"
import AboutUs from "./routes/views/AboutUs";
import Maps from "./routes/views/Map";
import Businesses from "./routes/views/Businesses";
import SignInCustomer from "./routes/views/CustomerLogin";
import SignUpBusiness from "./routes/views/BusinessSignUp";
import SignUpCustomer from "./routes/views/CustomerSignUp";
import SignInBusiness from "./routes/views/BusinessLogin";
import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";
import Landing from "./routes/views/Landing";
import BusinessProfile from "./routes/views/BusinessProfile";
import CustomerProfile from "./routes/views/CustomomerProfile";




Amplify.configure(awsExports);

function App() {
    const [customer, setCustomer] = useState(null);
    const [business, setBusiness] = useState(null);
    const [businessInfo, setBusinessInfo] = useState(null);
    const [navbarOpen, setNavbarOpen] = React.useState(false);
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
            <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            to="/"
                        >
                            Elite Managing
                        </Link>
                        <Link
                            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            to="/Businesses"
                        >
                            Participating Businesses
                        </Link>
                        <Link
                            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            to="/AboutUs"
                        >
                            About Us
                        </Link>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                            (navbarOpen ? " block rounded shadow-lg" : " hidden")
                        }
                        id="example-navbar-warning"
                    >
                        {!customer && !business && (
                            <>
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                    <li className="flex items-center">
                                        <button
                                            className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            <Link to="/BusinessLogin">Login as Business</Link>
                                        </button>
                                    </li>

                                    <li className="flex items-center">
                                        <button
                                            className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            <Link to="/CustomerLogin">Login as Customer</Link>
                                        </button>
                                    </li>
                                </ul>
                            </>

                        )}
                        {(customer || business) && (
                            <>
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                    {customer && (
                                        <>
                                            <li className="flex items-center">
                                                <Link
                                                    className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                                                    to="/CustomerProfile"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {business && (
                                        <>
                                            <li className="flex items-center">
                                                <Link
                                                    className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                                                    to="/BusinessProfile"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li className="flex items-center">
                                        <button
                                            className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                            onClick={handleLogout}
                                            type="button"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </>
                        )}

                    </div>
                </div>
            </nav>
          <Routes>
              <Route path="/" element={<Landing />} />
              {!business && <Route path="BusinessLogin" element={<SignInBusiness businessAuth={() => setBusiness(true)} />} />}
              {business && (
                  <>
                      <Route path="BusinessProfile" element={<BusinessProfile />} />
                  </>
              )}
              <Route path="BusinessSignUp" element={<SignUpBusiness />} />
              {!customer && <Route path="CustomerLogin" element={<SignInCustomer customerAuth={() => setCustomer(true)}/>} />}
              {customer && (
                  <>
                      <Route path="CustomerProfile" element={<CustomerProfile/>} />
                  </>
              )}

              <Route path="CustomerSignup" element={<SignUpCustomer />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="businesses" element={<Businesses />} />
              <Route path="maps" element={<Maps />} />
              <Route path="*" element={ routing } />
          </Routes>
            <Footer />
        </div>
  );
}

export default App;

