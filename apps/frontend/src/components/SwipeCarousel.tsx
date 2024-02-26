import {motion, useMotionValue} from "framer-motion";
import {useState} from "react";
import TeamCard from "./TeamCard.tsx";
import {Container, Row} from "react-bootstrap";

const sets = [
    () => (
        <Container>
            <Row>
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
        </Container>
    ),
    () => (
        <Container>
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
            </Row>
        </Container>
    )
];

const DRAG_BUFFER = 50;
export const SwipeCarousel = () => {
    const [dragging, setDragging] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragStart = () => {
        setDragging(true);
    };

    const onDragEnd = () => {
        setDragging(false);

        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < sets.length - 1) {
            setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
            setImgIndex((pv) => pv - 1);
        }
    };

    console.log(dragging);

    return (
        <div className={"relative min-h-screen overflow-hidden bg-neutral-950"}>
            <motion.div
                drag={"x"}
                dragConstraints={{left: 0, right: 0}}
                style={{x: dragX}}
                animate={{translateX: `-${imgIndex * 100}%`}}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className={"flex items-center cursor-grab active:cursor-grabbing "}>

                {sets[imgIndex]()}

            </motion.div>
        </div>
    );
};
