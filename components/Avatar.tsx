import { useSocket } from "@/providers/SocketProvider";

interface AvatarProps {
    user?: any;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {

const {isConnected} = useSocket()

    return (
      <div className="relative">
        <div
          className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
        >
          <img
            className="w-full h-full"
            src={"https://avatar.iran.liara.run/public"}
            alt="Avatar"
          />
        </div>
        {isConnected ? (
          <span
            className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
          />
        ) : null}
      </div>
    );
}

export default Avatar;