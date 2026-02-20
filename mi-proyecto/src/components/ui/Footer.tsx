import SocialLinks from './SocialLinks';

export default function Footer() {
    return (
        <footer className="w-full bg-transparent py-8 text-center text-white mt-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4">© {new Date().getFullYear()} MiProyecto. Todos los derechos reservados.</div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <a href="#" className="text-white/80 hover:text-white">Términos</a>
                        <a href="#" className="text-white/80 hover:text-white">Privacidad</a>
                        <a href="#" className="text-white/80 hover:text-white">Soporte</a>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
}
