import { useState } from "react";

import HamburgerIcon from "./HamburgerIcon";
import HamburgerMenu from "./HamburgerMenu";

export default function TabletNav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div>
      <nav className="flex h-20 items-center border-b-2 border-black ">
        <div className="basis-1/4 flex justify-start pl-6 group">
          <HamburgerIcon
            hamburgerOpen={hamburgerOpen}
            setHamburgerOpen={setHamburgerOpen}
          />
        </div>

        <div className="basis-1/2 flex justify-center">
          <a href="/" className="font-marcellus text-4xl font-medium">
            Augur
          </a>
        </div>

        <div className="basis-1/4"></div>
      </nav>

      <HamburgerMenu
        hamburgerOpen={hamburgerOpen}
        setHamburgerOpen={setHamburgerOpen}
      />
    </div>
  );
}
