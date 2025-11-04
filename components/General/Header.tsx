import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Menu } from "./Menu";

const Header = () => {
  return (
    <div className="h-14 fixed top-0 w-full z-100 flex items-center sm:px-20 px-4 justify-between bg-primary">
      <div>
        <Image src="/w-logo.png" alt="Somoco Logo" width={200} height={26} />
      </div>
      <div className="flex divide-x ">
        <div className="hidden sm:flex items-center gap-2 pr-4">
          <Input placeholder="Search Inventory..." className="text-white" />
          <Button className="cursor-pointer" variant={"outline"} size={"icon"}>
            <Search />
          </Button>
        </div>
        <div className="pl-4">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
