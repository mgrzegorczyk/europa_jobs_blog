import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 justify-center">
                <li>
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/blog" className="text-white hover:text-gray-300">
                       Blog
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
