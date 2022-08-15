import React from 'react'

const About = () => (
    <main className="profile-page">

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
                                    About Us
                                </h1>
                                <p className="mt-4 text-lg text-blueGray-200">
                                    In the summer of 2022, we all signed up to spend our summer working
                                    on a Customer Relationship Management Website. Due to the Covid-19 pandemic,
                                    the customer relationships that were so critical to the success of so many small businesses were decimated.
                                    This application allows businesses to rebuild that connection and customer loyalty while enjoying a seamless user experience.
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
        <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
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

    </main>

)

export default About