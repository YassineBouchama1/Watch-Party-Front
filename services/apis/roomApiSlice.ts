import { IRoom, IRoomFetch } from "@/types/room";
import { baseApiSlice } from "../baseApiSlice";

export const roomApiSlice = baseApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRooms: builder.query<IRoomFetch[], void>({
      query: () => "/room",
      transformResponse: (response: IRoomFetch[]) => response,
      providesTags: ["rooms"],
    }),

    // Add new chat
    addRoom: builder.mutation({
   
      query: (roomData) => ({
        url: "/room",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["rooms"],
    }),

    // Delete Room
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const { useGetRoomsQuery, useAddRoomMutation, useDeleteRoomMutation } =
  roomApiSlice;
