"use client";
import Image from "next/image";
import { Menu } from "./Menu";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { scrollYProgress } = useScroll();

  // Initialize hide based on current scroll position to avoid calling setState synchronously in an effect
  const [hide, setHide] = useState(() => scrollYProgress.get() > 0.01);
  const mountedRef = useRef(false);
  const prevScrollYProgress = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    // Initialize prevScrollYProgress with current scroll position
    const current = scrollYProgress.get();
    prevScrollYProgress.current = current;
    // No synchronous state updates here to avoid cascading renders;
    // initial hide state is derived during initialization above.
    return () => {
      mountedRef.current = false;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (i) => {
    if (!mountedRef.current) return;

    // If scrolled to the very top, always show header
    if (i === 0) {
      setHide(false);
      prevScrollYProgress.current = i;
      return;
    }

    // Only hide when scrolling down and scroll progress is significant
    if (i > 0.01 && i > prevScrollYProgress.current) {
      setHide(true);
    } else if (i < prevScrollYProgress.current) {
      setHide(false);
    }
    prevScrollYProgress.current = i;
  });

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hide ? "-100%" : "0" }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      className="h-14 fixed top-0 w-full z-100 flex items-center sm:px-20 px-4 justify-between bg-primary"
    >
      <Link href={"/"}>
        <div>
          <Image
            src="/ui/w-logo.png"
            alt="Somoco Logo"
            width={200}
            height={26}
          />
        </div>
      </Link>
      <div className="flex">
        <div className="pl-4">
          <Menu />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
