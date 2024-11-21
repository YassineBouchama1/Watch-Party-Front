import type { FC } from 'react';

interface ChatBarProps {}

const ChatBar: FC<ChatBarProps> = ({}) => {
        return (
          <aside className="w-64 bg-gray-800 text-white p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
              <span>yasine</span>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-red-500 px-4 py-2 rounded">
                Report Issue
              </button>
              <button className="bg-blue-500 px-4 py-2 rounded">
                Request Control
              </button>
            </div>
          </aside>
        );
}
export default ChatBar;