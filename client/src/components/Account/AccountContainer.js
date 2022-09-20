import { useAuth } from "../../util/auth";
import { useQuery } from "@apollo/client";
import { ME } from "../../util/queries";
import { useState } from "react";
import EditableProfilePicture from "./EditableProfilePicture";

export default function AccountContainer() {
  const { logout } = useAuth();
  const { data, loading } = useQuery(ME, {
    // skip cache for demonstration
    fetchPolicy: "network-only",
  });

  return (
    <div className="p-12">
      <EditableProfilePicture />
      {data ? (
        <>
          <h1 className="text-4xl font-semibold text-center mt-4">
            {data.me.firstName} {data.me.lastName}
          </h1>
          <h1 className="text-2xl font-semibold text-center mt-4">
            {data.me.email}
          </h1>
        </>
      ) : null}
      <div className="flex justify-center mt-4">
        <button className="font-semibold text-red-600" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
