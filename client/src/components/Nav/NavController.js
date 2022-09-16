import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../util/auth";

import MobileBottomNav from "./Mobile/BottomNav";
import MobileTopHeader from "./Mobile/TopHeader";
import TabletNav from "./Tablet/TabletNav";

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
