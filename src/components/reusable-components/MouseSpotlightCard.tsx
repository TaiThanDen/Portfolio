import { SpotLightItem } from "@/../components/uilayouts/main-spotlight";
import clsx from "clsx";

interface MouseSpotlightCardProps {
    image: string;
    title: string;
    desc: string;
    tags: string[];
    className?: string;
    onClick?: () => void;
}

const MouseSpotlightCard = ({
    title,
    image,
    desc,
    tags,
    onClick,
    className,
}: MouseSpotlightCardProps) => (
    <SpotLightItem
        className={clsx("rounded-2xl", className)}
    >
        <article
            onClick={onClick}
            className={clsx(
                "relative overflow-hidden rounded-2xl",
                "bg-zinc-900/80 backdrop-blur",
                "ring-1 ring-white/5"
            )}
        >
            {/* tỉ lệ ảnh thấp hơn để card gọn */}
            <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />

            <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">{title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2">{desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    </SpotLightItem>
);

export default MouseSpotlightCard;
