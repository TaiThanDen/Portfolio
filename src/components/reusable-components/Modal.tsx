import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    img: string;
    sourceCode?: string;
    website?: string;
}

const Modal = ({ isOpen, onClose, title, children, img, sourceCode, website }: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#18181b] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-purple-600 relative">
                {/* Project Image */}
                {img && (
                    <div className="bg-gradient-to-r from-[#4f3cc9] to-[#2d1e5f] p-0 flex flex-col items-center">
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-55 object-cover"
                        />
                    </div>
                )}
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl bg-gray-300 p-1 rounded-full hover:bg-gray-400 transition"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                {/* Content */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
                    <div className="text-gray-300 mb-6">{children}</div>
                    <div className="flex flex-col gap-4">
                        {sourceCode && (
                            <a
                                href={sourceCode}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-purple-600 to-purple-400 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 text-lg hover:from-purple-700 hover:to-purple-500 transition"
                            >
                                <svg width="22" height="22" fill="currentColor" className="mr-2" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                Source Code
                            </a>
                        )}
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 text-lg hover:from-blue-700 hover:to-blue-500 transition"
                            >
                                🌐 Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;