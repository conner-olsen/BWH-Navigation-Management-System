import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion"; // Import motion and useAnimation
import TeamCard from "../components/TeamCard.tsx";
import { Card } from "../components/ui/card.tsx";
import GlobalFooter from "../components/GlobalFooter.tsx";
import { useEffect } from "react";
import {SwipeCarousel} from "../components/SwipeCarousel.tsx";
import {Carousel, CarouselItem, CarouselContent} from "../components/ui/carousel.tsx";
const AboutPage = () => {

    const controls = useAnimation(); // Initialize animation controls

    // Define animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Use useEffect to trigger animation when component mounts
    useEffect(() => {
        controls.start("visible"); // Start the animation when component mounts
    }, [controls]);

    return (
        <>
            <SwipeCarousel></SwipeCarousel>

            <div className="flex justify-center items-center overflow-hidden">
                <Carousel className={"max-w-screen justify-content-center align-items-center"}>
                    <CarouselContent className={"-ml-5"}>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Conner Olsen"} role={"Lead Software Engineer"}
                                          bio={"Class of 2026, Computer Science & Mathematics"}
                                          image={"public/teamImages/Conner_Olsen.png"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Karish Gupta"} role={"Assistant Team Lead"}
                                          bio={"Class of 2026, Computer Science & Data Science"}
                                          image={"public/teamImages/KARISH_GUPTA.jpg"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Max Gosselin"} role={"Assistant Team Lead"}
                                          bio={"Class of 2026, Computer Science & Data  Science"}
                                          image={"public/teamImages/Max.png"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>


                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Shivank Gupta"} role={"Scrum Master"}
                                          bio={"Class of 2024, Mechanical and Robotics Engineering"}
                                          image={"public/teamImages/Shivank.jpeg"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Tanya Khan"} role={"Product Owner"}
                                          bio={"Class of 2025, Computer Science and IMGD"}
                                          image={"public/teamImages/TanyaKhan.jpg"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"Aiden Deady"} role={"Documentation Analyst"}
                                          bio={"Class of 2024, Robotics Engineering"}
                                          image={"public/teamImages/Aiden.JPG"}>
                                </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <TeamCard name={"William Smith"} role={"Project Manager"}
                                      bio={"Class of 2025, Interactive Media and Game Development"}
                                      image={"public/teamImages/WilliamSmith.jpg"}
                                      quote={'"'}>
                            </TeamCard>
                            </div>
                        </CarouselItem>


                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <TeamCard name={"Minh Bui"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Minh_Bui.JPG"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>
                        </CarouselItem>


                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <TeamCard name={"Ceci Herriman"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Ceci.jpeg"}
                                      quote={'"'}>
                            </TeamCard>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <TeamCard name={"James Walden"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/James.jpeg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>
                        </CarouselItem>

                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <TeamCard name={"Steven Gao"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Steven.png"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>
                        </CarouselItem>

                    </CarouselContent>
                </Carousel>
            </div>



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
                <motion.div variants={cardVariants} initial="hidden" animate={controls} className="col mb-4">

                    <Row>
                        <div className="col mb-4">
                            <TeamCard name={"Nick Leslie"} role={"Team Coach"}
                                      bio={"Class of 2025, Computer Science"}
                                      image={"public/teamImages/Nick_pic.png"}
                                      quote={' "The only way to do great work is to love what you do" Steve Jobs'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"Conner Olsen"} role={"Lead Software Engineer"}
                                      bio={"Class of 2026, Computer Science & Mathematics"}
                                      image={"public/teamImages/Conner_Olsen.png"}
                                      quote={' "The only way to do great work is to love what you do" Steve Jobs'}
                            >
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"Karish Gupta"} role={"Assistant Team Lead"}
                                      bio={"Class of 2026, Computer Science & Data Science"}
                                      image={"public/teamImages/KARISH_GUPTA.jpg"}
                                      quote={' "People will forget what you said, people will forget what you did, but people will never forget how you made them feel" - Maya Angelou'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"Max Gosselin"} role={"Assistant Team Lead"}
                                      bio={"Class of 2026, Computer Science & Data  Science"}
                                      image={"public/teamImages/Max.png"}
                                        quote={' "The only way to do great work is to love what you do" Steve Jobs'}>
                            </TeamCard>
                        </div>

                    </Row>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate={controls} className="col mb-4">
                    <Row>
                        <div className="col mb-4">
                            <TeamCard name={"Shivank Gupta"} role={"Scrum Master"}
                                      bio={"Class of 2024, Mechanical and Robotics Engineering"}
                                      image={"public/teamImages/Shivank.jpeg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"Tanya Khan"} role={"Product Owner"}
                                      bio={"Class of 2025, Computer Science and IMGD"}
                                      image={"public/teamImages/TanyaKhan.jpg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"Aiden Deady"} role={"Documentation Analyst"}
                                      bio={"Class of 2024, Robotics Engineering"}
                                      image={"public/teamImages/Aiden.JPG"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"William Smith"} role={"Project Manager"}
                                      bio={"Class of 2025, Interactive Media and Game Development"}
                                      image={"public/teamImages/WilliamSmith.jpg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                    </Row>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate={controls} className="col mb-4">
                    <Row>

                        <div className="col mb-4">
                            <TeamCard name={"Minh Bui"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Minh_Bui.JPG"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>


                        <div className="col mb-4">
                            <TeamCard name={"Ceci Herriman"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Ceci.jpeg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                        <div className="col mb-4">
                            <TeamCard name={"James Walden"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/James.jpeg"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>
                        <div className="col mb-4">
                            <TeamCard name={"Steven Gao"} role={"Full-Time Software Engineer"}
                                      bio={"Class of 2026, Computer Science"}
                                      image={"public/teamImages/Steven.png"}
                                      quote={'"'}>
                            </TeamCard>
                        </div>

                    </Row>
                </motion.div>

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


        </>
);
};

export default AboutPage;
