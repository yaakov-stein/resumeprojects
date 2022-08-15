import React from "react";

import {Card, Image, Button} from "semantic-ui-react";
import {useEffect, useState} from "react";
import axios from "axios";
import {faker} from "@faker-js/faker";

export default function Landing() {
  const [businesses, setBusinesses] = useState('');
  const apiEndpoint1 = 'https://loremflickr.com/320/240/business';
  const apiEndpoint2 = 'https://loremflickr.com/320/240/badge';
  const apiEndpoint3 = 'https://loremflickr.com/320/240/people';


  useEffect(() => {
    getAllBusinesses();
  }, []);

  const jsonData = {
    "TableName": "BusinessUserDB"
  }

  const getAllBusinesses = () => {
    axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/scan', jsonData)
        .then(response => {
          const allBusinesses = response.data.Items;
          setBusinesses(allBusinesses);
        });
  }
  return (
    <>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566807387450-b74aea0e727e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Welcome to Elite Managing.
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    More than just a CRM, it's a tool for managing your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">Featured Badge</h6>
                    <Card style={{width: '250px', marginLeft: '4em'}}>
                      <Image src={apiEndpoint1} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{faker.company.companyName()}</Card.Header>
                        <Card.Meta>
                          <span className='date'>Badge</span>
                        </Card.Meta>
                        <Card.Description>
                          this badge gets you 75% off {faker.commerce.product()} on the first {faker.date.weekday()} of each month.
                        </Card.Description>
                        <Button color={'green'} style={{marginTop: '1em'}} inverted>
                          Buy
                        </Button>
                      </Card.Content>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">Featured Badge</h6>
                    <Card style={{width: '250px', marginLeft: '4em'}}>
                      <Image src={apiEndpoint2} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{faker.company.companyName()}</Card.Header>
                        <Card.Meta>
                          <span className='date'>Badge</span>
                        </Card.Meta>
                        <Card.Description>
                          this badge gets you a free {faker.commerce.product()} on {faker.date.weekday()}s
                        </Card.Description>
                        <Button color={'green'} style={{marginTop: '1em'}} inverted>
                          Buy
                        </Button>
                      </Card.Content>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-xl font-semibold">Featured Badge</h6>
                    <Card style={{width: '250px', marginLeft: '4em'}}>
                      <Image src={apiEndpoint3} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{faker.company.companyName()}</Card.Header>
                        <Card.Meta>
                          <span className='date'>Badge</span>
                        </Card.Meta>
                        <Card.Description>
                          this badge gets you half off {faker.commerce.product()} on {faker.date.weekday()}s
                        </Card.Description>
                        <Button color={'green'} style={{marginTop: '1em'}} inverted>
                          Buy
                        </Button>
                      </Card.Content>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Calling all consumers
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Do you want to be involved with your community? Join Elite Managing to get exclusive perks and badges to your favorite small businesses.
                </p>

              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      We guarantee you will be the first of your friends to know about the best deals in the community.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src='https://business.comcast.com/community/images/default-source/default-album/smb.jpg?sfvrsn=5ffcabd4_0'
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">Are you a growing small business</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    Do you want to join our growing community of small businesses? Register your small business and watch new customers roll in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">The Elite Founders</h2>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src='https://media-exp1.licdn.com/dms/image/C4D03AQHM8eOlkg4Asg/profile-displayphoto-shrink_800_800/0/1613509379027?e=1664409600&v=beta&t=qxcwYKLWqdu3CtIVUIrZT6ebFBruCtT3er4w1w5sCqk'
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Sam Shulman</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Class of 2025
                    </p>
                    <div className="mt-6">
                      <button
                          className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://www.linkedin.com/in/sam-shulman/", "_blank")}
                          }
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                          className="bg-white text-black-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://github.com/shulman33", "_blank")}
                          }
                      >
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src='https://media-exp1.licdn.com/dms/image/C4D03AQGZNFpyQAeMbw/profile-displayphoto-shrink_800_800/0/1631226167276?e=1664409600&v=beta&t=WEaJAg3isZJU_fyJwIP0m_CbwL3BCI_uhGPC1OPYSV4'
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Yaakov Stein</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Class of 2024
                    </p>
                    <div className="mt-6">
                      <button
                          className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://www.linkedin.com/in/yaakov-s-79a598ab/", "_blank")}
                          }
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                          className="bg-white text-black-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://github.com/yaakov-stein", "_blank")}
                          }
                      >
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src='https://media-exp1.licdn.com/dms/image/C4D03AQFcdLDxqKIrBg/profile-displayphoto-shrink_800_800/0/1644351787900?e=1664409600&v=beta&t=h9vt_46CX_UrvL8aNa2bCj3OW0qa8Uwt4nPDCgPLZvY'
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Yosef Teitelbaum</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Class of 2025
                    </p>
                    <div className="mt-6">
                      <button
                          className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://www.linkedin.com/in/joseph-teitelbaum-b60366231/", "_blank")}
                          }
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                          className="bg-white text-black-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://github.com/jjteitel", "_blank")}
                          }
                      >
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src='https://media-exp1.licdn.com/dms/image/C4E03AQHuyBB8MF_f6A/profile-displayphoto-shrink_800_800/0/1639870421169?e=1664409600&v=beta&t=U_Pp4hEHOqpy4qYdq9qGOHiJp7uqFurPBLKcZNUPjVE'
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">David Kohanchi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Class of 2025
                    </p>
                    <div className="mt-6">

                      <button
                          className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                        type="button"
                          onClick={() => {
                            window.open("https://www.linkedin.com/in/david-kohanchi/", "_blank")}
                          }
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                          className="bg-white text-black-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                          type="button"
                          onClick={() => {
                            window.open("https://github.com/DavidK1419", "_blank")}
                          }
                      >
                        <i className="fab fa-github"></i>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Get Connected with the Community
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Increase your customer base like never before. Connect with the members of the community and rebuild the loyalty of your customers.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Technicians online 24/7 to help if any problems arise.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow Your Market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Have new customers flowing into your store like never before.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-money-bill text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Increase Your Revenue
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  You can double even triple your cash flow with the services we provide.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to join our network of businesses?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
