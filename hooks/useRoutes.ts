import { useMemo } from "react";
import { HiChat, HiUsers } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { useAuth } from "../providers/AuthProvider"; // Assuming you have this set up

// Define the Route interface
interface Route {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

// Custom hook for routes
const useRoutes = (): Route[] => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;

  const routes: Route[] = useMemo(
    () => [
      {
        label: "watch",
        href: "/watch",
        icon: HiChat,
        active: pathname === "/watch",
      },
      {
        label: "profile",
        href: "/profile",
        icon: HiUsers,
        active: pathname === "/profile",
      },
      {
        label: "Logout",
        href: "#",
        icon: FiLogOut,
        onClick: () => logout(),
      },
    ],
    [pathname, logout]
  );

  return routes;
};

export default useRoutes;
