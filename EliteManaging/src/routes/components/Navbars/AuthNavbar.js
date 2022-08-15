/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components

import {Auth} from "aws-amplify";

export default function Navbar(props, businessLoggedIn, customerLoggedIn) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [business, setBusiness] = React.useState(businessLoggedIn);
  const [customer, setCustomer] = React.useState(customerLoggedIn);

  async function handleLogout(){
    const user = await Auth.signOut();
    setCustomer(false)
    setBusiness(false)
    localStorage.clear();
    await Auth.signOut()
  }
  return (
    <>
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
    </>
  );
}
