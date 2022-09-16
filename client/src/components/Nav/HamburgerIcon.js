export default function HamburgerIcon({ hamburgerOpen, setHamburgerOpen }) {
  const hamburgerLine =
    "w-8 h-1 rounded-full bg-black transition transform duration-300";

  return (
    <div
      className="cursor-pointer space-y-2"
      onClick={(event) => {
        setHamburgerOpen(!hamburgerOpen);
      }}
    >
      <div
        className={`${hamburgerLine} ${
          hamburgerOpen
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      ></div>
      <div
        className={`${hamburgerLine} ${
          hamburgerOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      ></div>
      <div
        className={`${hamburgerLine} ${
          hamburgerOpen
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      ></div>
    </div>
  );
}
