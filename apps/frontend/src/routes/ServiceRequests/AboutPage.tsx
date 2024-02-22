import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TeamCard from "../../components/TeamCard.tsx";
import {Card} from "../../components/ui/card.tsx";
import GlobalFooter from "../../components/Global_Footer.tsx";

const AboutPage = () => {

    return (
        <div>

            <div className="container text-center">
                <Row>
                    <Col>
                        <h1>THE TEAM</h1>
                    </Col>
                    <Row>
                        <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300">
                            Team D, "The Dark Maroon Dragons", is a group of students from the Worcester Polytechnic Institute
                        </p>
                    </Row>
                </Row>
            </div>

            <Container>
                <Row>
                    <div className="col mb-4">
                        <TeamCard name={"Nick Leslie"} role={"Team Coach"}
                                  bio={"Class of 2025, Computer Science"}
                                  image={"public/teamImages/Nick_pic.png"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"Conner Olsen"} role={"Lead Software Engineer"}
                                  bio={"Class of 2026, Computer Science & Mathematics"}
                                  image={"public/teamImages/Conner_Olsen.png"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"Karish Gupta"} role={"Assistant Team Lead"}
                                  bio={"Class of 2026, Computer Science & Data Science"}
                                  image={"public/teamImages/KARISH_GUPTA.jpg"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"Max Gosselin"} role={"Assistant Team Lead"}
                                  bio={"Class of 2026, Computer Science & Data  Science"}
                                  image={"public/teamImages/Max.png"}>
                        </TeamCard>
                    </div>

                </Row>

                <Row>
                    <div className="col mb-4">
                        <TeamCard name={"Shivank Gupta"} role={"Scrum Master"}
                                  bio={"Class of 2024, Mechanical and Robotics Engineering"}
                                  image={"public/teamImages/Shivank.jpeg"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"Tanya Khan"} role={"Product Owner"}
                                  bio={"Class of 2025, Computer Science and IMGD"}
                                  image={"public/teamImages/TanyaKhan.jpg"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"Aiden Deady"} role={"Documentation Analyst"}
                                  bio={"Class of 2024, Robotics Engineering"}
                                  image={"public/teamImages/Aiden.JPG"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"William Smith"} role={"Project Manager"}
                                  bio={"Class of 2025, Interactive Media and Game Development"}
                                  image={"public/teamImages/WilliamSmith.jpg"}>
                        </TeamCard>
                    </div>

                </Row>

                <Row>

                    <div className="col mb-4">
                        <TeamCard name={"Minh Bui"} role={"Full-Time Software Engineer"}
                                  bio={"Class of 2026, Computer Science"}
                                  image={"public/teamImages/Minh_Bui.JPG"}>
                        </TeamCard>
                    </div>


                    <div className="col mb-4">
                        <TeamCard name={"Ceci Herriman"} role={"Full-Time Software Engineer"}
                                  bio={"Class of 2026, Computer Science"}
                                  image={"public/teamImages/Ceci.jpeg"}>
                        </TeamCard>
                    </div>

                    <div className="col mb-4">
                        <TeamCard name={"James Walden"} role={"Full-Time Software Engineer"}
                                  bio={"Class of 2026, Computer Science"}
                                  image={"public/teamImages/James.jpeg"}>
                        </TeamCard>
                    </div>
                    <div className="col mb-4">
                        <TeamCard name={"Steven Gao"} role={"Full-Time Software Engineer"}
                                  bio={"Class of 2026, Computer Science"}
                                  image={"public/teamImages/Steven.png"}>
                        </TeamCard>
                    </div>

                </Row>

                <br/>

                <Row>
                    <Card className={"text-center"}>
                        <p>Thank You To Brigham and Women’s Hospital and our representative, Andrew Shinn</p>

                        <p>The Brigham & Women’s Hospital maps and data used in this application are copyrighted and
                            provided for
                            the sole use of educational purposes.</p>
                    </Card>
                </Row>


                <GlobalFooter></GlobalFooter>
            </Container>


        </div>
    );
};

export default AboutPage;
