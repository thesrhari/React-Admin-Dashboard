import React from "react";
import Navbar from "../ui/Navbar";
import { UserNav } from "../ui/UserNav";
import { ModeToggle } from "../ui/ModeToggle";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Navbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
