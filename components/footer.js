import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="p-10 bg-[#272945] text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Left Side: Logo */}

            <div className="flex items-center justify-center space-x-8 mt-2 md:mt-4">
            <Link href="https://ece.snu.ac.kr" target="_blank" rel="noopener noreferrer">

                <Image
                    src="/logo/snu-ece-white.png"
                    alt="SNU ECE Logo"
                    width={400}
                    height={200}
                    className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto"
                />
                </Link>
                <Link href="https://gsai.snu.ac.kr" target="_blank" rel="noopener noreferrer">

                <Image
                    src="/logo/snu-ipai-white.png"
                    alt="SNU IPAI Logo"
                    width={909}
                    height={207}
                    className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto"
                />
                </Link>
            </div>

    
            {/* Centered Two-Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-300 text-center md:text-left">
                <div>
                    <h3 className="text-white font-semibold mb-2">About</h3>
                    <ul className="space-y-1">
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/people" className="hover:underline">Our Team</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-2">Legal</h3>
                    <ul className="space-y-1">
                        <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    
        {/* Bottom Copyright */}
        <div className="text-center text-sm text-white mt-6 border-t border-gray-600 pt-4">
            &copy; {new Date().getFullYear()} AIDAS Lab | All Rights Reserved
        </div>
    </footer>
    );
  }
  