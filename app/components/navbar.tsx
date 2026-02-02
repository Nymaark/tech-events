import Image from "next/image"
import Link from "next/link"

function Navbar() {
    return (
    <header>
        <nav className="flex flex-row w-full">
            <Link href="/" className="logo flex flex-row justify-space-between">
                <Image src="/icons/techevent_logo.svg" alt="Tech Events logo" width={30} height={30} />
                <p className="hidden md:inline">TechEvents</p>
            </Link>

            <ul className="text-xl md-text-l">
                <Link href="/">Home</Link>
                <Link href="/">Events</Link>
                <Link href="/">Create Event</Link>
            </ul>
        </nav>
    </header>
    )
}

export default Navbar;