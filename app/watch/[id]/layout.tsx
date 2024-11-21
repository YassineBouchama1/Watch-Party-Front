import { Metadata } from "next";
import SideBar from "@/components/SideBar";
import { PartyProvider } from "@/providers/PartyProvider";

export const metadata: Metadata = {
  title: "Watch Party",
  description: "Watch video together",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

       const partyId = 'partyid'; 
     const username = 'username'; 
  return (
   


       <PartyProvider partyId={partyId} username={username}>

        {children}
  
</PartyProvider>
  );
}
