import { CgProfile } from "react-icons/cg";

export default function ProfilePicture() {
  const handlePictureClicked = () => {
    console.log("picture clicked");
  };
  return (
    <CgProfile
      className="m-auto h-[50%] w-[50%]"
      onClick={handlePictureClicked}
    />
  );
}
