import MobileBottomNav from "./MobileBottomNav";
import MobileTopHeader from "./MobileTopHeader";
import TabletNav from "./TabletNav";

export default function NavController() {
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
