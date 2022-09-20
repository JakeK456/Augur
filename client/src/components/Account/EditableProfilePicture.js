import Picture from "./Picture";
import EditButton from "./EditButton";
import { useState } from "react";
import {
  defaultProfilePicture,
  testingProfilePicture,
} from "../../util/profilePicture";

export default function EditableProfilePicture() {
  const [imageUrl, setImageUrl] = useState(defaultProfilePicture);
  console.log(imageUrl);
  return (
    <div className="relative h-48 w-48 m-auto">
      <Picture src={imageUrl} />
      <EditButton setImageUrl={setImageUrl} />
    </div>
  );
}
