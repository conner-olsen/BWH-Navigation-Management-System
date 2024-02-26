import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TeamCard from "../components/TeamCard.tsx";
import GlobalFooter from "../components/Global_Footer.tsx";

const AboutPage = () => {

    return (
        <div>

            <div className="container text-center">
                <Row>
                    <Col>
                        <h1>CREDIT PAGE</h1>
                    </Col>
                    <Row>
                        <p className="font-roboto text-neutral-500 italic font-light dark:text-neutral-300">
                           All of the software libraries and frameworks that this application has incorporated
                        </p>
                    </Row>
                </Row>
            </div>

            <Container>
                <Row>
                    <div className="col mb-4">
                        <a href="https://tailwindcss.com/" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"Tailwind"} role={""}
                                      bio={"A utility-first CSS framework for efficient and customizable web design with pre-defined utility classes."}
                                      image={"public/images/TAILWINDCSS.png"}>
                            </TeamCard>
                        </a>
                    </div>


                    <div className="col mb-4">
                        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"CSS"} role={""}
                                      bio={"A styling language used to control the presentation and layout of HTML documents on the web."}
                                      image={"public/images/CSS.png"}>
                            </TeamCard>
                        </a>
                    </div>


                    <div className="col mb-4">
                        <a href="https://blog.logrocket.com/the-definitive-guide-to-scss/" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"SCSS"} role={""}
                                      bio={"A superset of CSS, offering advanced features like variables, nesting, and mixins, to simplify and enhance the organization and maintenance of stylesheets."}
                                      image={"public/images/SCSS!.png"}>
                            </TeamCard>
                        </a>
                    </div>

                    <div className="col mb-4">
                        <a href="https://ui.shadcn.com/" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"Shadcn UI"} role={""}
                                      bio={"A CSS framework that provides pre-designed components and styles for creating modern and visually appealing user interfaces on the web."}
                                      image={"public/images/SHADCN.png"}>
                            </TeamCard>
                        </a>
                    </div>
                </Row>


                <Row>
                    <div className="col mb-4">
                        <a href="https://nodejs.org/en" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"Node Js"} role={""}
                                      bio={"A JavaScript runtime framework built on Chrome's V8 JavaScript engine, designed for building scalable and efficient network applications, particularly web servers."}
                                      image={"public/images/NODEJS.png"}>
                            </TeamCard>
                        </a>
                    </div>

                    <div className="col mb-4">
                        <a href="https://react.dev/" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"React Js"} role={""}
                                      bio={"A JavaScript library for building user interfaces, known for its component-based architecture and efficient rendering, developed by Facebook."}
                                      image={"public/images/REACT.png"}>
                            </TeamCard>
                        </a>
                    </div>

                    <div className="col mb-4">
                        <a href="https://expressjs.com/" style={{textDecoration: 'none', color: 'inherit'}}>
                            <TeamCard name={"Express Js"} role={""}
                                      bio={"A minimal and flexible Node.js web application framework that simplifies the development of server-side applications and APIs by providing a robust set of features for routing, middleware integration, and handling HTTP requests and responses."}
                                      image={"public/images/ExpressJS.png"}>
                            </TeamCard>
                        </a>
                    </div>
                </Row>
                <br/>
                <GlobalFooter></GlobalFooter>
            </Container>
  </div>
    );
};

export default AboutPage;
