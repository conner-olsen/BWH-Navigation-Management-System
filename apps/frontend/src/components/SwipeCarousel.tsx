import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

const sources = [
  "public/carousel/building.jpeg",
  "public/carousel/caring.jpeg",
  "public/carousel/dystopian.jpg",
  "public/carousel/oppenheimer.jpg",
  "public/carousel/stretcher.jpg",
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

    if (x <= -DRAG_BUFFER && imgIndex < sources.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  console.log(dragging);

  return (
    <div className={"relative min-h-screen overflow-hidden"}>
      <motion.div
        drag={"x"}
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={"flex items-center cursor-grab active:cursor-grabbing "}
      >
        <Images />
      </motion.div>
    </div>
  );
};

const Images = () => {
  return (
    <>
      {sources.map((image, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={
              "aspect-video w-screen shrink-0 bg-neutral-850 object-cover"
            }
          />
        );
      })}
    </>
  );
};
