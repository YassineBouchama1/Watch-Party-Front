import { Metadata } from "next";
import { PartyProvider } from "@/providers/PartyProvider";
import getCookiesServer from "@/utils/CookiesServer ";

export const metadata: Metadata = {
  title: "Watch Party",
  description: "Watch video together",
};



export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get decrypted cookies
  const { user, guest } = await getCookiesServer();

  // Determine which user is authenticated: guest or user
  const userAuthed = user || guest;

  const partyId = "partyid"; // Replace with actual logic to get the party ID

  return (
    <PartyProvider partyId={partyId} userAuthed={userAuthed}>
      {children}
    </PartyProvider>
  );
}
