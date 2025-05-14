import Link from 'next/link';
import Image from 'next/image';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-6 bg-[#272945] z-[60]">
      <div className="max-w-screen-xl mx-auto h-full flex items-center px-4 sm:ml-4 md:ml-6 lg:ml-8">
        <Link href="https://www.snu.ac.kr" target="_blank" rel="noopener noreferrer">
          <Image
            src="/logo/snu-long-text-white.svg"
            alt="Mini Logo"
            width={120}
            height={24}
            className="h-2 sm:h-2.5 md:h-3 lg:h-3 w-auto"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
