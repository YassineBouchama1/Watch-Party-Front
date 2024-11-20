
import { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Watch Part | Dashboard",
  description: "Watch video together",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <div className="flex h-full ">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        
          {children}
       
      </main>
    </div>
  );
}
