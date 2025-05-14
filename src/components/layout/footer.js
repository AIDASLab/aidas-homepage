import Link from 'next/link';
import Image from 'next/image';
import SocialIcon from '../common/social-icon';

export default function Footer() {
    return (
        <footer className="p-3 bg-[#272945] text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
            
            {/* Left Side: Logo */}
            <div className="flex items-center justify-center space-x-8 mt-2 md:mt-4">
            <Link href="https://ece.snu.ac.kr" target="_blank" rel="noopener noreferrer">

                <Image
                    src="/logo/snu-ece-white.png"
                    alt="SNU ECE Logo"
                    width={400}
                    height={200}
                    className="h-8 lg:h-10 w-auto"
                />
                </Link>
                <Link href="https://gsai.snu.ac.kr" target="_blank" rel="noopener noreferrer">

                <Image
                    src="/logo/snu-ipai-logo-white.png"
                    alt="SNU IPAI Logo"
                    width={909}
                    height={207}
                    className="h-8 lg:h-10 w-auto"
                />
                </Link>
            </div>

            {/* Left Side: Social */}
            <div className="flex justify-center md:justify-end items-center space-x-6 mt-4 text-white">
                <SocialIcon property="github" href="https://github.com/AIDASLab" />
                <SocialIcon property="huggingface" href="https://huggingface.co/AIDAS-Lab" />
                <SocialIcon property="youtube" href="https://www.youtube.com/@AIDAS-Lab" />
            </div>
        </div>
    
        {/* Bottom Copyright */}
        <div className="text-center text-sm text-white mt-6 border-t border-gray-600 pt-4">
            &copy; {new Date().getFullYear()} AIDAS Lab | All Rights Reserved
        </div>
    </footer>
    );
  }
  