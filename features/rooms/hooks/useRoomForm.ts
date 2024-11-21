import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddRoomMutation } from "@/services/apis/roomApiSlice";
import { roomFormType, roomSchema } from "../validations/create";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";

export const useRoomForm = () => {
  const [errorsApi, setErrorApi] = useState<string>("");
  const [playlistUrls, setPlaylistUrls] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
 const dispatch = useAppDispatch();
  const [addRoom, { isLoading }] = useAddRoomMutation();

  const {
    register: roomForm,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<roomFormType>({
    resolver: zodResolver(roomSchema),
  });

  const onSubmit = async (data: roomFormType) => {
    const roomData = {
      name: data.name,
      playList: playlistUrls,
    };

    try {
      await addRoom(roomData).unwrap();
      toast.success("Room created successfully!");
      reset();
      setPlaylistUrls([]);
      dispatch(closeModal())
    } catch (err: any) {
      setErrorApi(err.data?.message || "Failed to create room");
      toast.error(err.data?.message || "Failed to create room");
    }
  };

  return {
    roomForm,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorsApi,
    playlistUrls,
    setPlaylistUrls,
    isVisible,
    setIsVisible,
  };
};
