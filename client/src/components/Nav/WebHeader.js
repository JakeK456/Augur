import { NavLink } from "react-router-dom";

export default function WebHeader() {
    return (
        <div className="flex bg-primary text-secondary text-[40px] shadow-xl">
            <h1 className="font-ubuntu m-2 pl-2">Augur</h1>
            <div className="flex justify-end h-12 w-screen">
                <NavLink to="/predict" className="m-5 p-2">
                    <p className="text-right text-[16px] font-maven hover:border-b-2 border-secondary">Predict</p>
                </NavLink>
                <NavLink to="/portfolio" className="m-5 pt-2">
                    <p className="text-right text-[16px] font-maven hover:border-b-2 border-secondary">Portfolio</p>
                </NavLink>
                <NavLink to="/charts" className="m-5 pt-2">
                    <p className="text-right text-[16px] font-maven hover:border-b-2 border-secondary">Charts</p>
                </NavLink>
                <NavLink to="/news" className="m-5 pt-2">
                    <p className="text-right text-[16px] font-maven hover:border-b-2 border-secondary">News</p>
                </NavLink>
                <NavLink to="/account" className="m-5 pt-2">
                    <p className="text-right text-[16px] font-maven hover:border-b-2 border-secondary">Account</p>
                </NavLink>
            </div>
        </div>
    );
}