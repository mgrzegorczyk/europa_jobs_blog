'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="text-white flex space-x-4 justify-center">
                <li>
                    <Link href="/" className={`hover:text-orange-300 ${pathname === '/' ? 'text-orange-500' : ''}`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/blog" className={`hover:text-orange-300 ${pathname === '/blog' ? 'text-orange-500' : ''}`}>
                        Blog
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
