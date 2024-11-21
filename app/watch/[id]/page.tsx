import Header from '@/components/Header';
import ChatBar from '@/features/party/componets/ChatBar';
import type { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
       return (
         <div className="flex h-screen bg-gray-900">
           <div className="flex-1 flex flex-col">
             <Header />
             <main className="flex-1 flex flex-col items-center justify-center">
             player
             </main>
           </div>
           <ChatBar />
         </div>
       );
}
export default page;