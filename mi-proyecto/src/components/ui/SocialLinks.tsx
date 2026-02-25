export default function SocialLinks() {
    const links = [
        { href: '#', label: 'Twitter', icon: '𝕏' },
        { href: '#', label: 'LinkedIn', icon: 'in' },
        { href: '#', label: 'GitHub', icon: '⌘' }
    ];

    return (
        <div className="flex gap-3 items-center">
            {links.map(l => (
                <a key={l.label} href={l.href} aria-label={l.label} className="text-white/80 hover:text-white">{l.icon}</a>
            ))}
        </div>
    );
}
