import { useEffect, useState } from "react";
import {
    Dialog,
    DialogPanel,
} from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Toggle nền khi cuộn
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Navbar fixed + trong suốt */}
            <header
                className={[
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled
                        ? " backdrop-blur supports-backdrop-blur:border-b border-white/10 shadow-sm"
                        : "bg-transparent"
                ].join(" ")}
            >
                <nav
                    aria-label="Global"
                    className={[
                        "mx-auto flex max-w-7xl items-center justify-between lg:px-8",
                        scrolled ? "p-4" : "p-6"
                    ].join(" ")}
                >
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <a className="text-2xl font-bold ">Portfolio</a>
                        </a>
                    </div>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link to="/" className="text-sm/6 font-semibold text-white">
                            Home
                        </Link>
                        <Link to="/about" className="text-sm/6 font-semibold text-white">
                            About Me
                        </Link>
                        <Link to="/skills" className="text-sm/6 font-semibold text-white">
                            Skills
                        </Link>
                        <Link to="/projects" className="text-sm/6 font-semibold text-white">
                            Projects
                        </Link>
                        <Link to="/contact" className="text-sm/6 font-semibold text-white">
                            Contact
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Mobile menu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                <Link to="/products" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    Product
                                </Link>
                                <Link to="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    About Me
                                </Link>
                                <Link to="/skills" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    Skills
                                </Link>
                                <Link to="/projects" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    Projects
                                </Link>
                                <Link to="/contact" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export default Navbar;
