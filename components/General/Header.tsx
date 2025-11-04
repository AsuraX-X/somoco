import Image from "next/image";
import { Menu } from "./Menu";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-14 fixed top-0 w-full z-100 flex items-center sm:px-20 px-4 justify-between bg-primary">
      <Link href={"/"}>
        <div>
          <Image src="/w-logo.png" alt="Somoco Logo" width={200} height={26} />
        </div>
      </Link>
      <div className="flex">
        <div className="pl-4">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
