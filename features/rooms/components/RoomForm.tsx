"use client";
import { useEffect, useState } from "react";

export default function RoomForm() {
  const [packageName, setPackageName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadig, setLoading] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block text-white text-2xl font-bold  ">
          Add Your PackageName
        </h1>

        <p className="mt-2 text-sm text-[gray]">
          https://play.google.com/store/apps/details?id=
          <span className="text-green-500">com.discord</span>
        </p>
      </div>
      

      {/* display msg error */}
      {error && (
        <div className="flex items-center justify-center w-full mt-5 bg-red-500 text-white  text-sm py-1 px-3 rounded-md mb-2">
          {error}
        </div>
      )}
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-4">
            <div>
              <div className="relative">
                <input
                  onChange={(e) => setPackageName(e.target.value)}
                  type="text"
                  id="packagename"
                  name="packagename"
                  placeholder="com.instagram.app"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
            <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
