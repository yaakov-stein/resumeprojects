import React from "react";

import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {Image} from "semantic-ui-react";
import {faker} from "@faker-js/faker";

export default function CustomerProfile() {
    const [customer, setCustomer] = useState(null);
    const email = localStorage.getItem('userId');
    const src = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'


    useEffect(() => {
        axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
            .then(response => {
                console.log(email)
                console.log(response);
                setCustomer(response.data);
            })
    }, []);

    const jsonData = {
        "TableName": "CustomerUserDB",
        "Key": {
            "customerId": {
                "S": email
            }
        }
    }

    if (!customer) {
        return (
            <p>There is no information to display at this time</p>
        )
    }
    return (
        <>
            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1566807387450-b74aea0e727e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60')",
                        }}
                    >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
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
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRYYGRgaGhoaGhwaGBgYFR4ZGBgZGRoYHB4cIS4lHB4rIRkaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQoJSs0NDY0NzQ0NDQ0NDYxNTYxNDQ0NDQ0NDQ0NDQ0NjQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ1NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABEEAACAQIDBAYGCAQFBAMBAAABAgADEQQSIQUxQVEGYXGBkaETIjKxwfAHFEJSYnLR4SMzkrJTgqLC8TRjc6OT0uIW/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAECAwQF/8QALBEAAgIBAwMDAwQDAQAAAAAAAAECEQMSITEEQVETInEyYZEzgbHBFCOhBf/aAAwDAQACEQMRAD8A6ujAi4jpj6VUqeriJeRgRcSTVEIyshr0tcy75LSqZhfxj5A6ZTmXvHxhyPjcmIlen6jZTuO6Tq1xcRtanmHXwggflEGKS3rDv/WWKL5hfx7Yyk2ZbHfuMoYvHLh0qVKnsIjO3OyKW06zu74yPDsrdKelNDAIGqXZ20Skvtuf9qjix8zpOQbe6V43GE+kqmjSO6lSJUW10dt7G2/hpoBMZtTaL16r4isb1HN7cFX7NNeSqNOvfMezE75Gi1IeionsqO3j4mK1Y9kihGMUmWk0UdkqR7OTpwgArPmYcrxaz3NuEjU2iQAlotYEyUkFfW3Ea98qx7vew5CAFim1+ocI/DYqooqoGKpUKBwNC6oGsrH7l2Y5eOl7gCQo4CiIlQloAda+inH4f0Jw62SuGZ3BIzOCdHU6ZgBlUjeuUcCCegTzWGIIZWKspurKSrqRuZWGqnrE7H9H/Ss4pDSrEfWKYuToPSJoBUAGgYEgMBpcg6BgAiDRuMY7gC5jpTqOXaw3cP1jSIt0NRS7e+WqjhBp3CGiL86mR0ULHO3cIxJV8hh6X2m3/OsswlevW+yu+LklskWISj6B/kwhQtX2LFehm1G/3ytTcofeJaVyNG7jwP6GLWpBu3nBPyDV7ocrgi4jpQRih1l1XBFxBoE7GWym49k7+rr7IVywRjTCs9jlDMVUtwDMASB1gHsMljFFtOHDq6oh8HN9qdKdpYKsDiqFBkc2U0/SKjccquS1mAF7MgJtpxlfpV02w+KwT00FRKzFBkdbgqKiMwzqStsobeQTyma+kLZ2MKVKlKvnw+X+LQdKGVVGpdGZLm1r2vmBFwToJx1zYDU9vOBJJDKh1MZFJiRkghCEACEIQAIQhAAhCEACSUfaHzwkcUGAD6tS+g3TMbB2q2GxNPEKpYpmBUNlzKyMpUngLlTuPsiYOWEJOa3YIAdm6JbRxFei+KxLgCox9Gg9SklJDluL7yzAnMxOgW1gSJn9l7Tw9TOKVVKhS2coc6qTuXMPVv1XvOHUhXxbUcNmzezTpodKKKq+1lGllUFixuxsddZ2vYOx0w9FKFMHImpY+27n2nbrJ8BYDQQK2qdmRRS5zHdwEsxBI3ck5V38TwH7w5DgSrUN8q7/AHR1GiF6zzi06YUafvHwsK7sIQhEAjC+hkeq9a+Y/USWEAojdAw9xlYZkPV5GWiltV7xwP6GJowse8cRGmJqxyOCLiaL9Ku2FSgmGU+vVZXNjYrTpsHzdRLqoH+blNuqt6K7k+oASTwsBc37pwDbm2HxVapiXuPSN6in7NNdETfp6uptxYnjChx3IMTtB3FnqVKgG4PUd1BG4gMxtKjuTvjYAcACTwA1JPIQLCTDYd6jqiIzuxsqqLsT88eE3zZX0bMwDYmrk/BTAZh2u2ncAe2bN0M6NrhaQZgDXcXqN90HUIvUOPM91tjmeeV3US+ONcs1NPo+wQGq1G6zUIP+kASDE/Rxhm9h6qH8yuPArfzm5xZDXLyT0x8HM6v0ZVB7GJRh+JGQ+TNKzfRtieFSif8AM4/2TqwEW0fqyF6cTk6/RtieNSh/U5/2SxT+jOqfaxFNexHf3lZ1C0QiHqyD04mi4f6NaA9utVY/hyIPAqx85JV+jfDEerUrKfzI3+ybrEi1y8j0R8HLdqfRzXQFqFRKo+6Rke3IXJVj3iabicO6OUdGR13qwKsO4++ehJiOkOwKWLTK4s4ByOB66H4rzU6d+snHK+5CWJdjhslpPuHXrJ9rbNfD1Wo1BZl4j2WU7nXmD+o3iVUaxBmjkpZm9hbTbDYhKoNlzIrkKGb0RqIagW+4lV7esTumwtojEYenXVcgdSQpIJFmIsSOOk89o1xedn+jJ82zqQ+69df/AH1D7jEQaNpYk6DvPwHXHIoAsIoEWAgkdSoF3+HGR1sTbRdTz4SFKTNqfExpeSLfZD/rf4fP9oR/1ReZ8oR7C3JwYso+unZ4iT08SDv0PlFQ0yeNZL67jzjoREjW+n+IKbOxR4mky9RDkIbdzGcFYWVByUe6egOnNDPs/Fr/ANh2/wDjXP8A7Z59DXVDzVfdAcRJtP0ebMFbFh2F0oj0h5Z72pjxu3+SatOqfRdg8uGerbWo9r8clMZQP6i/jI5JVEtgrkbrCEJlNQRwjY4QEKBHARBHrAQ0iNIkpkbQAaY2OMSAxIQhAZqX0ibGFbDGqo9eiC45lPtr3D1h+XrnI56IZQQQRcHQjgQd4nn7H4X0VV6X+HUdNd9kYqD4CX4ZbUZ8sd7Cg1+4Tsv0SNfZ46q1Yf6r/GcZw/Gdj+ixwuzKR4u9V/8A2uuv9MuKJOjdmcAXMqvUZ9FGnzvirRZjdv3/AGk4sug8BvhwQ3YylhgNTqfKSM/AankPjyhlJ36DkN/ef0iqoG6AJeBt3+6PGEkhESoi9LwYW81jXw6nUadm6SBwdPI6HziGkOGnZu8IyNWVxnTrHiP2k9OuD1GLmI3i/WP0jWpK2o8viIBTXA7EUQ6Mh3OrKexgQffPMKIVGRvaRnRu1W3T0yA6fiHnOAdMMKKePxagEA1BVF+VUBzbqu1u6FEovcw07d0MoBMDhwONMP8A1kv/ALpxBjoZ6B2fRCUaabglNF/pQD4SnM9kaMPLLMJQx21UpjRHqN91Av8Ac5CjxmNTpBUO/DMo661LN4KSPOZXKK5a/Ja5xXc2GOExtDayMPWDIevKf7SZZTHIdzjzESyRfdBqi+5aBjwZEjg6gg9msdeTsY8mMJheIzRgBiSu+NQb3Hdr7pXq7WQDTM3UAB/cRK3kiu6Fqiu5fhNfqdIHHs4ZmH/lQHwOnnLmz9srU0ZHpNybKw/qRmXxIjU4vhr8gpxfcyk4d0vA+u4i3+IfGwv53ncFN904R0hqZsViG/71Tydh8Jow8shl4RSzZUduQPu0noHohgBQwWGVhZhRS/UzKGYDvJnA8FhPTPRoC/8AGrIhtvyswDHuE9LKgG7s7peZpCanq9/7RVUCOhAQQiSN8Qo437ICslhK31scvOEKYWWCL743JyJHu84npOYYd36RRUXmIBsLrEKg9vgY+EBlfFYgU0LMbqP6iSbADmSdJxz6VAGxVGsFdC9JqbBgBqjZ1Nxobhrf5Z1Tb7/yl5uXPZTUn3kTSen+GargRUZfXpMlb1eKeyw15K9yOoSlzanpL44lo1dzQujWzkr1sr3yqpYgG17EADs1nTFZ6jBblieF9P2E5NgHZKqFSQQ6i4NtMwBHZadt6PIPXbrA95Pw8Jk6qEpZVFvZ/wBEIq3Q6lsdEGao1+euVB375Xq7ZwFM5TWwoI4ekQsO3eYx+j7YnFk4kipSVA1NLEUkbMVYFb+u1spzH7x00FrfSummFw4NFVRncU1KooCghmJAA32Ugdsuh08FG0iepRdJGMq7S2fUP86kpPFaip36kDykybDDjNSxF1O7MA47mB17po+xdo4f6wVxFPOjXUsRmcNe+fXsPX8d72X0fpvTGIwpaixLi6DKjhHZbvSPqEMBciwOuhEn6cXt/KE5J8okTZFZAWV1LDgtxfx07pAdr1N1lB46G/vmfwbsR6wsw0YDVb8xfWxmFw9BXr1CRdQzHquW/wCZhzY3GSUHV/glTVKL5Il2xU45T3H4GOqYGvUXMXUE7g+a1udl3dkXa+FVMrKtgSQeXV8ZlcVUIByjMT7IvYEndc8BxPVz3RY4ScnGbuq/6NJttSfBrT9H6mpqYrKo3imgW3+YnTvjsJitn0d+IR24mpWFTyBKjwmRxXRtPRPiMVeuyIzhGJWiCqk5Upg5QNLXbMeuc3fHJTrIz01azBmUKFTLf2QALATcsSW1fhENUeyOn4bbGAq6LUwzHiM6BvgZPV2NScZkOXkQcye/3GN2DWw+JLqgLKio3rqCRnzgprfMBkvfX2rcIlfYxpYhGw9kVg5qAA+jbLkyqVvYE5jqOUUsEGt0LVbpoxNdKlF8pJB4EE2I5gznnTPZ6U3WolwahqM4Jv61wxYX5ljpOvdIqYNMNxVh4G4I93hOJdJqjNialySFNhc6AZRoOUz9PjlDO4p7VYpKnRkfo9QHH02ZWYUUdwFFyXf1FBvoPavc8p3PBYtaiZlBFiQQdGVhvB+eM5d9GODK0q9cC7VGCLfdkorYnsLMR15ZvGxPXd7n20p1LDQXIyt7hNuv36exN4/9eruZx66jjfskRxDH2V+MkCIOV/Ex2c8FPfoP1lxm3K/oHb2j8ZIuFUb9fISXKx4gdgv74noRxue0wsKG+jTq8YR/ol+6PCELCh8QiVQ1Tl5CO9I/3fL94UFk3oxy8NPdDJ1n3++RCo/3Ioqt9w+MKY7Rhtv3zp1UqxHaQolTaoQ0mV9UYej/AMrrZ/8AST/TMhtu/qVCpAQlX5ZHsCe42mKxdHM9BG1W7368v6/GYstqbN+GpQX7nE61JqblW9pGKt+ZDlJ8VncujdQMjEcSrdzDSaztXobRr13cu6M6o/q5Sp9UITYj8PPjNg2PQ+rOtEtmGRFDEWzFVAzHkSQfGRzTTcZeNn+5VocZW+DPl2UXS2bhmvlPUbajt4de6VtqOK9PJVoNcMrjK1N1DL+ZlJBFwdBoTLMJaptKhygm7Od//wAnWLsy0kQFjYl1NlJ0GlybD3TfNlM9KktIIqqosLOzG5JJYnKtySSdw3yxFj1MNMSGtWyKztwBPfwHjaY3Y1OyFjvc37h+5Mbjq3pnFJD6oN2Ybv8AgeZMvBQGRRuCm3Zpb3TLeud9l/I4q3fgg2pRzUzzHrDu3+V5Js589NWG8aHtX5EtWmJpv9XqEH+W+48v+PdCXtmpdns/6YS2dmZxOJdkZMiMrKVYMzLcMLEXCm2h65oW1Oi9RnBSglgABZ1JJH2jmtruv2X4zfgQRcaiE062xaI9jF9GsOcLTYCk7OxBdi1NU0FlUWcnKNdbE3J7JladV21fKCeCklR1XNi3bYdgiQjcm1QKCTsp9IG/g25so95+E4NtSrmrVX4Go57gx+AncNsVM7pSXgczdXyL+ImnUOglGm9O9So75wdcqqcnrEkAE6258ZTjmlklJ/ZEdDlLY2HonQFLD06f2kAV+tn9ZiOrOWPjMnsZf4yjh6FvKoLeRlLD08lWoqbmQMOpja3mT4zK7Eo3d3HsqBSQ88urn+qw7pKFymi/LUYP4M0BFia/Iia9U2GAdCN16oa9UAHQjderx/aEAHQhCABCIWA3mNzjt7ATAAq0wylWF1YEEdR0M1laOV/ROfXQhkbmo0Vuu49UjmJs+bqPlKe1MB6VRayuuqNyPI9R4yrJDUrXJbhyaXT4ZgcScroe1D2NqB2AjQ8iJbrYZaigNvG4jeJBiCXpNpZ03jiHQgkd9vOWcLUzKCNxAI7xMjSdpm1pOO5XQYhNAyOOGbf898d9axH+Ep7G/eXYRenXDZVo+7KJxeIO6ko7T/8AqMejiKmjuFXiB+2/vMyUURPFfLbFo8tkWFwqoLKO08T2xtM5nJ4KLfPnJMRUyrfjuHbGbOGh7fhLEkqSLEqRYtI8RQV1ysLj51EnIjDG0mqZHkxSYStT/luCv3W/fT3R4xWIG+mp7x/9pkDEMq9KvpbRHQuzKP1uv/hL/UP1iM2JbS6J2an4y9CPQ+7Y9H3ZUw2ECAm+ZjvY75WVr1j+FLdd2OtuuwA77zIVjpKOEqBabVSLl2JA4m5Coo7bDxjUUqSLIpJbBXUhsqa1HI7AANOxVGvbbnM9hU9GioENlFufaT1k3PfItk4D0YLvrUf2jyG/IOoeZ7pkZrxQpW+TJmnqdLhEH1ocQRFGJXn5SaMNNTwHhLtjPuIK68xFDjmPERhwy8vOMOEHAmGwe4nzDmISt9U6/KEKQW/BYyHix7gBE9GONz2kySNzjt7NYh0gVANwHhHRtz2QJA3mAx0IzMTuHef0iMQNWPz2QAxeNwT+kL0grBwA6scozLoHBsb6aEdUx2z1KXptbMjFTbdY6qR1WPlNjFQt7I05n4CYbatHJVR73FQZGP411XxFx3TPlxpe5GnDlcnpZPCNRriOlZeLFESYXbXSjDYYlaj3e18iDM+ouLjct/xEQSb4E2lyZLH02ZQV1Km9uJFiDbr1v3SpQxWViFvfiCpA85oW1vpJrPdcOi0gdAz2eprusPZB6vWmV6BPtBqzPiDVNFkN/S6evcZSinUcdwAseySeJpW9hRyrirNuq7UZRwF+Skn9pLgC5zlr2JFr8dNSOrd4TSunlTaCVw+HNUUVVcvovWGbXMXUanvBFgOuYzZP0k1VsuIRagGhdLI+nNfZJ/pgsTatOxPIltVHUTEMw2xek+GxJy0ns9r5HGV9N9hua34SZmZFprkkmnwJCEQmAyltFzlIX2jZF/M5sPf5S1gtm1MyekCBKeoCtmzMBZW1AsBv7ZDg0z11HBBnb8x9VB7z3TYZZjgn7mVZsjj7UAMWIREy8j8RNBkFiEnlEueIv2foYquD28txgAhfnfwPwgKi8x4x8QqDvEAEzDmIRPRL90eEIbC3D0fMk9u7wgzgaeQ3xuRj7Rt1D9YjOqaeQ3xiHesfwjxP6CIxVdSdevUyA1WbRRb55ySnhhvbU+X7woLvgT0rN7IsOZj0oDedT1yURYWOvISptLCekpsu471PJ11U+Pvlq8jepb1V1b3dZkWrVDUtLtGAwVe41FmBKsOTDQiXJFtXBmmfTrc/4o5gbnHWOPVCjUDC4N/iOcxyi4umb4yUo2iYTkGxdifXcXXeqzhFqMXK6uzO7ZEB1yiwOvUAN4t18TSvo4UFMVcXviXB7Mo08zLItqLaIySbSZsWzNi4fD/yqGQ7sxRs/e7C58ZkPrCfeXvIEmoYl00HrrwDEhh2NrcdR8ZaG0xxRx3Kfc0Wz5Yra4Rj/rCfeXuIMx+09i4bE/zaAc/eCPn7nQZvObAdpjhTf/QB/dIKmNqNoLIOr1m8SAB4Hthsu4XJ9jjm2NhnBY3D+jZsjVKbJmBV1s6hkbQXFm321BI5366ZpX0h0wPqZ4/WV13k3sSSTqToJupjk7SbHBU2hJXxlcKpJ3DU/ASZ3sJDszDelcVG/lofV/G4+1+VeHXK0nJ0iTaitTLmysM9NMzi7OczjiOS9dhYeMyKsDqp+euPkL0tbrofIzZFJKjBKTk22SBuB0PzuiyJKoPqsLHyj9R1jz/eOhWOgyg7xGgg6g/PXDNbf4iAwyciR5jziZ2G8X7P0MeDFgKiP0w5N4GEkhANyk1Vm0HlJKeF+94SdVA0EdHfgSj5EAtuiwjWa3zrESFMTf2ecQC+p8OEhqVSxyp3mOiLY56muVN/kJJSphR18TClTCjSOgNLuxZr2OwpoNnT+UTqBvQ8SPwe6bBOddJ+l1QuyYdsiLdS4ALMQbNa+irfS+823gb0sLy7IH1Cw7v8eTa6ThrETTvo3YZcUvEYhjbqIsP7T4SPovtaoVIPrBTu4201HXNNwW26uDxdZ0AN3cOjXAZSxZew2IIPC/WRM6g03B8o1rJGUVkXDO1TnHTzpdfNhsO2gutR1Pcaakb+THuHGVukH0gNVp+jw6PSzCzuzDPbiqZd1/vb7bgN40UCShjreQp5O0TonQPpbquGxDG5stN2JPZTa+48j3Hhfo086kTe9gfSC1Kn6PEI1QqLI6sAxHBXzb7fe38xfUk8feIQydpGb+kRxmwSX1OIUgcbAqCfFh4zc3a04vX2zVxmNou9haogRBfKiK4dusmwJJ427BN66SbYcUyy+qCba7zc7yOA6pFxdxiuWTUkoym+F/RseHotiGsLikDZmH2rfYTq5mZyiAlk3LuXlYcJznop0rqpUp0qrZ6TMtPUDMhY2RgRvW5AIPO/Cx6XVTMLfN5o9F4nTMX+Ss61R4XYdeLIaL39Vt4+byQHgYAmNqUw2/xkAdk0bUc5biMoOhjsGhlg2qnXmPiICpbRtOvgf0ld6RQ3Xd8+Mlp1w2h3+RhQrJCnEaH53jjEzke0O8bv2iZCvs6jkfgY5KgO7fy4wAPSr94eMI7IOQ8IkQ9x0IkjzlvZ0HP9P1gMcz8BqfIdsAttSdefzuENFHISq7lzYbvnUxpEW6FeoXOVd3zv6pYpUwosIU6YUWEextqYNgl3YM1oARiC+p7hyH6xaj2HXwHXESMX0l2h6HD1GBswWy/nf1UHiQewGchdPVsOFvKbV0z2sKjiihulMksw3NWIKm3MICR2seU1mdDBHTG/JyuqnrlS7GQ6GAlqo5ZT4kx/TDo0aw9NRH8VRZl++o3D844c93KYvD4ipRf0lJrHcQRdWXirDivum37K2/Rr2Rv4VQ/ZY+ox/A/wOswdTgnHI8kd0dPoepxyxLFLZo5ADvGoI0IIsQRoQRwMWdV6S9DkxBLj+HW++BdW6nH2u3f7pzzaXRnF0iQ1FnG7NTBqIev1RmHeBK45Is0yxtGNhyGpJIAAFySdAABvPVMns7ozjKx9WiyA/bqAoo7iMx7gZ0Po30Qp4b19alX75Gi8wg+yOvf18ISyRQRxyZjuiPRs0R6WqP4rCwXQ5FPD8548t3O83TIWpJ1vbyvaZzau1aGG0qNmfhTTVz2/dHb3Xmm7S2jUxLBnsiL7CL7K34n7zdfhH02Cc5qb4RX1nU48eJ407bVFKjTOU87WB6xuPjO3bKxgrUadUbnRW7CRqD1g3HdOMgTauhfSAUW9BVNqbtdGO5HY6q3JWOt+DE89Oj1EHKNrscjpMihJxfc6DiKf2hvEWm4YdfzrJZUrKUOYbuMwrc6T23LKtwO/39cdGKQwuP3BgjcDv+dRESHyvWw19V38uEsQgmJqynTrldG/cScor6g68xvi1aQbt5yoQyH5sY+SO65LHo3+/wCUJF9aPIecI6C0ThS3taDlz7Y53CjXuEStVC9vKUwC5+bCJKxt1wKSzn5sJcpoFFhIq1anRTM7oijezsFHiZr+K6d4RSQjPVI/w0YjxawPdGoyfCIuUY7yZs8iX1jf7I3dZ59k0fGdPWbRMMQOJeoqH+lQffKNXpvijoooIOpHc+LMB5SxYJvsVS6nGu50yc+6YdIKhqPQpsURAFdho7MyhsoP2VsRcjU33jjg6/SLFPcPiHseCZKY/wBKhvOYsuS7ZmZs9jdmZmzAWsSxJNwPKXY8Gl3Iz5uqUo1HYPhu5W5QhCazEEiqUAfnSSwgBkdidJKmHIWoS9LdY6ug5oeIH3T3WnQ6ZR1DrZlYAgjcQRcETkNStfcARzPHs/Wbz0Bx2eg1M76baDkj3IHcwcdlpzeswRUdcV8nX/8AP6mTl6cnfg2gIOQmj9IulTuzUcMcqjR6g3kjeE5D8XhzOc6ZbSNHDNlNnqH0aniMwJZu5Qe8ic3oVMo9nT/VIdHgjL3SXwT6/qnH2QdPuT0sOBqdWOpJ1JJ3mTRFa4uN0WdU4oRfnqtyMSEANx6HdJSjLh6zjIQRTZ2sUKi/o2Y71t7JOultdLb9ow4EHlqJw2qgJQEAgXYg7tRZR7z3SXDtk1ptUpH/ALdR09xmWfTqTuOxsxdXpjpkrOxAlGtw+H6y0wuLg9hnKaPSLFLp9ZzgcKiK3+oWbzmYwPTWsmlSgjjmjlD3K4IPZmlMsEkaI9VjexvyPfqI3j54R81nDdMcK9sztRfh6Vcq9mcXS3fNhw9dXUMpBHMEEdxGhHXKpRceUXxnGXDsljWUEWMdCRJkH1VevxhJ4R2xUjHIhY+8zV9t9McpajgwrsNHqtrTU8lH228u2RdONuEN9RoNYkXrsN4U/YHWRa/UQOJmoEhQETQCacWHV7pGHPn0+2PI7FMXfPWdqz83NwOoLuUdQkZqHduHIaCNhNiSXBgcm3bCEIRgERlv88eBiwgAA3F+O49v6HfCMY5Tm4bm/Lz7Rv8AGSEQASQVrsco7WPVwHfJaj2F/AczwEbRSw13nU9sQCikOUzPQipkxTJwqU2/qQhh5ZpiZc2JUCYmgx0/iZf61ZPeRKs8dWNr7F3TS05ov7mQ6fVs1elS4Ihc9rtYf2ecwHoxymT6SVM+MqneFFNB3IrHzYzHw6aOnEvgl1c9WaT+9ECDI2X7Lbuo8u+TxtRMwI+QeBjaT3Gu8aHt+dZaZySNd7C+/gBzJ3COkSesc3AaL2cW7/dAB6rz1J1J6/04d0dCEYBFBtuiQgBKtY7jqJNga70mzYeo1JuIGqN+ZD6plSETimqYRk4u0dE6O9M1qsKOIUUqx0U3/hOfwk+y34T48Jts4g6q65H7jxBm9dBekbuThMQ16qC6Od7oOBPFgOPEdYJOLNh0+6J0sHUavbLk3WEITNuazjW0P+txf/kb+5pThCdTH9KOLm+thCEJMgEIQgAQhCAA26Npeyv5V/tEIQAZW3r+b/aZLCEQBJML/Npf+Wl/esISOT6H8E8X6kfkl2r/ANTX/OP7FlaEIsX6a+ES6j9WXywkSe03YvxiQkyokf2T2H3QTcOwe6EIdw7DoQhGAQhCABCEIAEv7G/6/Cfm+BhCV5fpZZh/UOxQhCc07B//2Q=='
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button
                                                className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Badges Owned
                        </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          174
                        </span>
                                                <span className="text-sm text-blueGray-400">
                          Follwing
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {customer.Item.firstName.S} {customer.Item.lastName.S}
                                    </h3>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Hi, my favorite song is {faker.music.songName()}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        University of Computer Science
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <h1 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Your Wallet</h1>
                                            {/*<h3 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">No Badges Yet</h3>*/}
                                            <Image.Group size='medium'>
                                                <Image src={src} />
                                                <Image src={src} />
                                            </Image.Group>
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
