
import React from 'react';
import NavBar from "../../components/NavBar.tsx";
import { Link } from 'react-router-dom';

const ServiceList = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <NavBar/>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%', marginLeft: '15%' }}>
            <h1 className="font-roboto font-extrabold italic"
                style={{marginTop: '5%', marginLeft: '10%', fontSize: '60px'}}>
                SERVICE REQUESTS
            </h1>
            <p className="font-roboto text-neutral-500 italic font-light"
               style={{marginRight: '30%', marginLeft: '0%', marginTop: '5%', textAlign: "right", fontSize: '25px', lineHeight: '30px'}}>
                At Brigham and Women's we value our patients and want to accommodate to their needs
                as seamlessly as possible. Below is a list of rhe services we offer.
            </p>
            </div>
            <div style={{marginTop: '5%', marginLeft: '24%'}}>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/FlowerService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        FLOWER SERVICE REQUEST
                    </Link>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/CleaningService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        CLEANING SERVICE REQUEST
                    </Link>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/ReligiousService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        RELIGIOUS REQUESTS
                    </Link>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/MedicationDeliveryService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        MEDICATION DELIVERY
                    </Link>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/InternalTransportationService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        INTERNAL HOSPITAL TRANSPORTATION
                    </Link>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <Link className={"font-bold"}
                          to="/ExternalTransportationService"
                          style={{
                              fontSize: '20px',
                              textDecoration: 'underline',
                              color: '#3382fe',
                              cursor: 'pointer'
                          }}
                    >
                        EXTERNAL HOSPITAL TRANSPORTATION
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ServiceList;
