import { NavLink } from "react-router-dom";

import { GiCrystalBall } from "react-icons/gi";
import { BsBook } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function MobileBottomNav() {
  return (
    <div className="bg-white flex h-12 fixed bottom-0 w-screen border-t">
      <NavLink to="/predict" className="basis-1/5 m-2">
        <GiCrystalBall className="m-auto h-[70%] w-[70%]" />
        <p className="text-center text-[11px]">Predict</p>
      </NavLink>
      <NavLink to="/portfolio" className="basis-1/5 m-2">
        <BsBook className="m-auto h-[70%] w-[70%]" />
        <p className="text-center text-[11px]">Portfolio</p>
      </NavLink>
      <NavLink to="/charts" className="basis-1/5 m-2">
        <AiOutlineLineChart className="m-auto h-[70%] w-[70%]" />
        <p className="text-center text-[11px]">Charts</p>
      </NavLink>
      <NavLink to="/news" className="basis-1/5 m-2">
        <IoNewspaperOutline className="m-auto h-[70%] w-[70%]" />
        <p className="text-center text-[11px]">News</p>
      </NavLink>
      <NavLink to="/account" className="basis-1/5 m-2">
        <CgProfile className="m-auto h-[70%] w-[70%]" />
        <p className="text-center text-[11px]">Account</p>
      </NavLink>
    </div>
  );
}
