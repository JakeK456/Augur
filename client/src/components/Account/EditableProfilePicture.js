import Picture from "./Picture";
import EditButton from "./EditButton";
import { useEffect, useState, useRef } from "react";
import {
  defaultProfilePicture,
  testingProfilePicture,
} from "../../util/profilePicture";
import { useLazyQuery, useMutation } from "@apollo/client";
import { PROFILE_PICTURE } from "../../util/queries";

export default function EditableProfilePicture() {
  const [imageUrl, setImageUrl] = useState();
  const [getProfilePicture] = useLazyQuery(PROFILE_PICTURE);

  useEffect(() => {
    fetchImage();
  }, [imageUrl]);

  const fetchImage = async () => {
    try {
      const { loading, error, data } = await getProfilePicture({
        fetchPolicy: "network-only",
      });
      setImageUrl(data.profilePicture.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-48 w-48 m-auto">
      <Picture src={imageUrl} />
      <EditButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
    </div>
  );
}
