import React, { useState } from "react";

type Props = React.PropsWithChildren<{
    radius?: number;
    mode?: "word" | "character" | "full" | "sentence" | "line";
    initiallyRevealed?: boolean;
    revealMode?: "individual" | "all" | "progressive";
    variant?: "title" | "content"; // Thêm prop variant
}>;

export default function ScratchText({
    children,
    radius = 140,
    mode = "word",
    initiallyRevealed = false,
    revealMode = "individual",
    variant = "title"
}: Props) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
        initiallyRevealed ? new Set() : new Set()
    );
    const [isAllRevealed, setIsAllRevealed] = useState(initiallyRevealed);
    const [progressiveRevealCount, setProgressiveRevealCount] = useState(0);

    const onMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
        e.currentTarget.style.setProperty("--r", `${radius}px`);
        setHoveredIndex(index);

        if (revealMode === "all") {
            setIsAllRevealed(true);
        } else if (revealMode === "progressive") {
            setProgressiveRevealCount(Math.max(progressiveRevealCount, index + 1));
        } else {
            setRevealedIndices(prev => new Set([...prev, index]));
        }
    };

    const onLeave = () => {
        setHoveredIndex(null);
    };

    // Style variants
    const getVariantStyles = (isRevealed: boolean, isCurrentlyHovered: boolean) => {
        if (variant === "content") {
            return {
                revealed: isRevealed || isCurrentlyHovered
                    ? `text-gray-100 drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]`
                    : 'text-gray-500',
                background: isRevealed || isCurrentlyHovered ? `
                    radial-gradient(
                        var(--r, ${radius}px) var(--r, ${radius}px) at var(--x, 50%) var(--y, 50%),
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.05) 40%,
                        transparent 70%
                    )
                ` : ''
            };
        } else {
            // Title variant (original styling)
            return {
                revealed: isRevealed || isCurrentlyHovered
                    ? `text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`
                    : 'text-gray-400',
                background: isRevealed || isCurrentlyHovered ? `
                    radial-gradient(
                        var(--r, ${radius}px) var(--r, ${radius}px) at var(--x, 50%) var(--y, 50%),
                        rgba(255, 255, 255, 0.3) 0%,
                        rgba(255, 255, 255, 0.1) 40%,
                        transparent 70%
                    )
                ` : ''
            };
        }
    };

    // Nếu mode là "full", sử dụng component cũ
    if (mode === "full") {
        const [isRevealed, setIsRevealed] = useState(initiallyRevealed);

        const onMoveOld = (e: React.MouseEvent<HTMLSpanElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
            e.currentTarget.style.setProperty("--r", `${radius}px`);
            setIsRevealed(true);
        };

        const baseColor = variant === "content" ? '#9ca3af' : '#9ca3af';
        const revealedColor = variant === "content" ? '#f3f4f6' : '#ffffff';

        return (
            <span
                onMouseMove={onMoveOld}
                className={`
                    relative inline
                    text-transparent bg-clip-text
                    [background-image:
                      linear-gradient(${isRevealed ? revealedColor : baseColor},${isRevealed ? revealedColor : baseColor}),
                      radial-gradient(var(--r,140px)_var(--r,140px)_at_var(--x,0)_var(--y,0),
                      ${revealedColor} 0,${revealedColor} 35%,transparent 65%)
                    ]
                    [background-size:100%_100%,auto]
                    [background-repeat:no-repeat]
                    transition-[background-image] duration-200
                    cursor-default
                `}
            >
                {children}
            </span>
        );
    }

    // Xử lý text thành segments
    const text = typeof children === 'string' ? children : '';
    let segments: string[];

    switch (mode) {
        case "sentence":
            segments = text.split(/(?<=[.!?])\s+/);
            break;
        case "line":
            segments = text.split('\n');
            break;
        case "character":
            segments = text.split('');
            break;
        default: // word
            segments = text.split(' ');
    }

    const getSegmentClass = (index: number) => {
        let isRevealed = false;

        if (revealMode === "all") {
            isRevealed = isAllRevealed;
        } else if (revealMode === "progressive") {
            isRevealed = index < progressiveRevealCount;
        } else {
            isRevealed = revealedIndices.has(index);
        }

        const isCurrentlyHovered = hoveredIndex === index;
        const styles = getVariantStyles(isRevealed, isCurrentlyHovered);

        return `
            relative inline transition-all duration-300 ease-out cursor-default
            ${styles.revealed}
        `;
    };

    const getSegmentStyle = (index: number) => {
        let isRevealed = false;

        if (revealMode === "all") {
            isRevealed = isAllRevealed;
        } else if (revealMode === "progressive") {
            isRevealed = index < progressiveRevealCount;
        } else {
            isRevealed = revealedIndices.has(index);
        }

        const isCurrentlyHovered = hoveredIndex === index;

        if (!isRevealed && !isCurrentlyHovered) return {};

        const styles = getVariantStyles(isRevealed, isCurrentlyHovered);

        return {
            '--x': 'var(--x, 50%)',
            '--y': 'var(--y, 50%)',
            '--r': `${radius}px`,
            background: styles.background,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
        } as React.CSSProperties;
    };

    return (
        <span className="relative">
            {segments.map((segment, index) => (
                <span key={index}>
                    <span
                        onMouseMove={(e) => onMove(e, index)}
                        onMouseLeave={onLeave}
                        className={getSegmentClass(index)}
                        style={getSegmentStyle(index)}
                    >
                        {segment}
                    </span>
                    {mode === "word" && index < segments.length - 1 && (
                        <span className={variant === "content" ? "text-gray-500" : "text-gray-400"}> </span>
                    )}
                    {mode === "sentence" && index < segments.length - 1 && (
                        <span className={variant === "content" ? "text-gray-500" : "text-gray-400"}> </span>
                    )}
                </span>
            ))}
        </span>
    );
}
