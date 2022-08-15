import React from "react";

import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import {Button as B, Divider, Form, Image, Input, Label, Modal} from "semantic-ui-react";

export default function BusinessProfile() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [perks, setPerks] = useState('');
  const [image, setImage] = useState([]);

  const [business, setBusiness] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessDescription, setBusinessDescription] = useState(null);
  const email = localStorage.getItem('userId');
  const [businesseBadges, setBusinessesBadges] = useState([]);
  const src = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

  async function getTheBusiness() {
    const jsonData = {
        "TableName": "BusinessUserDB",
        "Key": {
            "businessId": {
                "S": email
            }
        }
    }
    await axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/get', jsonData)
        .then(response => {
          console.log(response.data);
            setBusiness(response.data);
            setBusinessName(response.data.Item.businessName.S);
            setBusinessDescription(response.data.Item.description.S);
        })
  }

  useEffect(() => {
    getTheBusiness()
        .then(() => {
          console.log(business)
        })
  }, []);

  const generateJsonData = (pictureName, perks, price, business)=> {
    const date = new Date();
    return {
      "TableName": "BadgeDB",
      "Item": {
        "badgeId": {
          "S": pictureName
        },
        "Business": {
          "S": business
        },
        "DateOfCreation": {
          "S": date
        },
        "CurrentOwner": {
          "S": "None"
        },
        "Price": {
          "S": price
        },
        "Perks": {
          "S": perks
        }
      }
    }
  };

  function onClick(event) {
    event.preventDefault();
    setOpen(false);
    generateBadge('/' + description.valueOf(), perks.valueOf() , price.valueOf(), business.Item.businessName.S, '7');
    console.log('/'+description.valueOf());
    console.log('perks: ' + perks.valueOf());
    console.log('price: ' + price.valueOf());
  }

  function generateBadge(descriptions, perks, price, business, numberBadge){
    price = "$" + price.replace(/[^\d.]/g,'');
    const pictureName = business + numberBadge;
    const s3URL = "https://1v74t44h9b.execute-api.us-east-1.amazonaws.com/S3Test/badgepicscontainer/" + pictureName +  ".jpeg";
    axios.get("https://loremflickr.com/200/200" + descriptions, {responseType: "blob"})
        .then((response) => {
          console.log(response)
          axios({
            method : 'put',
            url : s3URL,
            headers : {'Content-Type' : 'image/jpeg'},
            data : response.data
          })
              .then(response => {
                console.log(response);
              });
        });
    axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateJsonData(pictureName, perks, price, business))
  }

  function generateJsonScanData(businessName){
    return {
      "TableName": "BadgeDB",
      "FilterExpression": "businessId = :val",
      "ExpressionAttributeValues": {":val": {"S": businessName}}
    }
  }

  function onImageChange(event) {
    setImage([...event.target.files]);

  }

  function uploadBadge(){
    const s3URL = "https://1v74t44h9b.execute-api.us-east-1.amazonaws.com/S3Test/badgepicscontainer/bh.jpeg";
    axios({
      method : 'put',
      url : s3URL,
      headers : {'Content-Type' : 'image/jpeg'},
      data : image[0].valueOf()
    }).then(response => {
      console.log('uploaded');
    })

    axios.post('https://e4zbw0wbnk.execute-api.us-east-1.amazonaws.com/test/post', generateJsonData("somename", perks.valueOf(), price.valueOf(), "construction")).then(r => {
      console.log("DB Posted")
    })
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
                        src='https://yt3.ggpht.com/ytc/AKedOLTlGVLrXzgZDwItF-m8Tux0NF5II9C-TIa6HgIalg=s900-c-k-c0x00ffffff-no-rj'
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
                          Badges
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Customers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {businessName}
                  </h3>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      {businessDescription}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        No Badges Yet
                      </h3>
                      <Image.Group size='medium'>
                        <Image src={src} />
                        <Image src={src} />
                      </Image.Group>
                      <Modal
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          open={open}
                          trigger={<B color={'green'}>Create Badge</B>}
                      >
                        <Modal.Header>Create Badge Image</Modal.Header>
                        <Modal.Content>
                          <Form>
                            <Form.Group>
                              <Form.Field width={12}>
                                <label>Badge Description</label>
                                <input placeholder='Coffee' onChange={(e) => setDescription( e.target.value)}/>
                              </Form.Field>

                              <Form.Field width={4} style={{marginTop: '1.6em'}}>
                                <Input labelPosition='right' type='text' placeholder='15' onChange={(e) => setPrice(e.target.value)}>
                                  <Label basic>$</Label>
                                  <input />
                                  <Label>.00</Label>
                                </Input>
                              </Form.Field>

                            </Form.Group>
                            <Form.Group>
                              <Form.Field width={12}>
                                <label>Perk</label>
                                <input placeholder='Free coffee fridays' onChange={(e) => setPerks(e.target.value)}/>
                              </Form.Field>

                              <Form.Field >
                                <Modal.Actions>
                                  <B
                                      style={{marginTop: '1.6em', marginLeft: '1.6em'}}
                                      content='Generate Badge'
                                      icon='checkmark'
                                      color={'green'}
                                      onClick={onClick}
                                  />
                                </Modal.Actions>
                              </Form.Field>
                            </Form.Group>
                          </Form>


                          <Divider horizontal>Or</Divider>
                          <Form>
                            <Form.Group >
                              <Form.Field width={8}>
                                <label>Upload jpg image</label>
                                <Input
                                    type='file'
                                    multiple accept="image/*"
                                    onChange={onImageChange}

                                />
                              </Form.Field>
                              <Form.Field width={4} style={{marginTop: '1.6em'}}>
                                <Input labelPosition='right' type='text' placeholder='15' onChange={(e) => setPrice(e.target.value)}>
                                  <Label basic>$</Label>
                                  <input />
                                  <Label>.00</Label>
                                </Input>
                              </Form.Field>
                            </Form.Group>
                            <Form.Group>
                              <Form.Field width={12}>
                                <label>Perk</label>
                                <input placeholder='Free coffee fridays' onChange={(e) => setPerks(e.target.value)}/>
                              </Form.Field>
                              <Form.Field>
                                <Modal.Actions>
                                  <B
                                      style={{marginTop: '1.6em', marginLeft: '1.6em'}}
                                      content='Upload Badge'
                                      icon='upload'
                                      color={'green'}
                                      onClick={uploadBadge}
                                  />

                                </Modal.Actions>
                              </Form.Field>
                            </Form.Group>
                          </Form>
                        </Modal.Content>
                        <Modal.Actions>
                          <B
                              icon='close'
                              color={'red'}
                              onClick={() => setOpen(false)}
                          />
                        </Modal.Actions>
                      </Modal>
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
