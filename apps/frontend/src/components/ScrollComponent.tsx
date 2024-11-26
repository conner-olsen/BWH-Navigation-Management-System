import { motion, useScroll, useSpring } from "framer-motion";

const ScrollComponent = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
};

export default ScrollComponent;
