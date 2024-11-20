import FormBtn from '@/features/rooms/components/FormBtn';
import type { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
        return (
          <div className="flex-1 px-2 sm:px-0">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-extralight text-white/50">Apps 2</h3>
              <div className="inline-flex items-center space-x-2">
                <h3 className="text-3xl font-extralight text-white/50">
                  Credit:
                </h3>
                <a
                  className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                  href="#"
                >
                  15
                </a>
              </div>
            </div>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <FormBtn />
              {/* Card List */}
              {/* {result.user?.appsIDs.map((item: AppInfo) => (
              <CardApp key={item.id} item={item} />
            ))} */}
            </div>
          </div>
        );
}
export default page;