'use client'
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { LuLogOut } from 'react-icons/lu';

interface LogOutBtnProps {}

const LogOutBtn: FC<LogOutBtnProps> = ({}) => {


    const { logout } = useAuth();
const router = useRouter()
    function onlogout (){
   logout();
router.push('/auth')

    }
        return (
          <div
            onClick={() => onlogout()}
            className="cursor-pointer   group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-[#8C73D3]
            mb-4"
          >
            <LuLogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
          </div>
        );
}
export default LogOutBtn;