import { Metadata } from "next";
import { PartyProvider } from "@/providers/PartyProvider";
import getCookiesServer from "@/utils/CookiesServer ";

export const metadata: Metadata = {
  title: "Watch Party",
  description: "Watch video together",
};

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }; 
}>) {


  // Get  authed user
  const { user, guest } = await getCookiesServer();

  // here i determine which user is authenticated: guest or user
  const userAuthed = user || guest;

  // cxtract the partyId from the URL parameters
  const partyId = params.id;

  return (
    <PartyProvider partyId={partyId} userAuthed={userAuthed}>
      {children}
    </PartyProvider>
  );
}
