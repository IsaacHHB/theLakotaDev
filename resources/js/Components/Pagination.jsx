import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link 
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block px-3 py-2 mx-1 font-semibold rounded text-gray-500 text-xs" +
                        (link.active ? " bg-gray-200 " : " ") +
                        (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-gray-200")
                    }
                    dangerouslySetInnerHTML={{__html: link.label}}>
                    
                </Link>
            ))}
        </nav>
    )
}