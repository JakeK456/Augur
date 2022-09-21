import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SET_PROFILE_PICTURE } from "../../util/mutations";
import { GrEdit } from "react-icons/gr";

export default function EditButton({ setImageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [setProfilePicture] = useMutation(SET_PROFILE_PICTURE);

  const uploadPhoto = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = async () => {
      await setProfilePicture({ variables: { url: reader.result } });
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setIsExpanded(false);
  };

  const removePhoto = async () => {
    if (
      window.confirm(
        "Are you sure you want to remove your profile picture? This will set your picture to the default."
      )
    ) {
      await setProfilePicture({ variables: { url: null } });
      setImageUrl(null);
    }
    setIsExpanded(false);
  };

  return (
    <div>
      <button
        className="flex absolute bottom-2 left-2 px-2 py-1 bg-white  rounded-md border items-center shadow-xl"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <GrEdit className="pr-1" />
        Edit
      </button>
      {isExpanded && (
        <>
          <ul className="absolute py-1 border rounded bg-white shadow-xl">
            <li className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8">
              <label htmlFor="file-upload">Upload a photo</label>
            </li>
            <li
              className="hover:bg-blue-500 hover:text-white cursor-pointer py-1 pl-2 pr-8"
              onClick={removePhoto}
            >
              Remove photo
            </li>
          </ul>
          <div className="absolute -bottom-1 left-4 border-l border-t rotate-45 w-2 h-2 bg-white"></div>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={uploadPhoto}
          />
        </>
      )}
    </div>
  );
}
