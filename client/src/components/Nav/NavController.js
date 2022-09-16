import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../util/auth";

import MobileBottomNav from "./MobileBottomNav";
import MobileTopHeader from "./MobileTopHeader";
import TabletNav from "./TabletNav";

export default function NavController() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      <div className="sm:hidden">
        <MobileTopHeader />
        <MobileBottomNav />
      </div>
      <div className="hidden sm:block lg:hidden">
        <TabletNav />
      </div>
      <div className="hidden lg:block">
        <TabletNav />
      </div>
    </div>
  );
}
