"use client";
import Image from "next/image";
import { Menu } from "./Menu";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useRef } from "react";

const Header = () => {
  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);
  const prevScrollYProgress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (i) => {
    setHide(i > prevScrollYProgress.current);
    prevScrollYProgress.current = i;
  });

  return (
    <motion.div
      animate={{ y: hide ? "-100%" : "0" }}
      transition={{
        ease: "easeInOut",
        delay: 0.2,
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
