// @ts-nocheck
'use client'

import { cn } from '@/lib/utils'
import React, {
  useRef,
  useState,
  useContext,
  createContext,
} from 'react'

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  ProximitySpotlight?: boolean
  HoverFocusSpotlight?: boolean
  CursorFlowGradient?: boolean
}
interface SpotlightItemProps {
  children: React.ReactNode
  className?: string
}

interface SpotLightContextType {
  ProximitySpotlight: boolean
  HoverFocusSpotlight: boolean
  CursorFlowGradient: boolean
}

const SpotLightContext = createContext<SpotLightContextType | undefined>(undefined)

export const useSpotlight = () => {
  const context = useContext(SpotLightContext)
  if (!context) {
    throw new Error('useSpotlight must be used within a SpotlightProvider')
  }
  return context
}

export const Spotlight = ({
  children,
  className,
  ProximitySpotlight = true,
  HoverFocusSpotlight = false,
  CursorFlowGradient = true,
}: SpotlightProps) => {
  return (
    <SpotLightContext.Provider
      value={{ ProximitySpotlight, HoverFocusSpotlight, CursorFlowGradient }}
    >
      {/* đổi 'group' -> 'group/spotgrid' để không lan hover toàn grid */}
      <div className={cn('group/spotgrid relative z-10 rounded-md', className)}>
        {children}
      </div>
    </SpotLightContext.Provider>
  )
}

export function SpotLightItem({ children, className }: SpotlightItemProps) {
  const { HoverFocusSpotlight, ProximitySpotlight, CursorFlowGradient } = useSpotlight()
  const boxWrapper = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // vị trí chuột toàn cục (cho proximity/hover focus)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  // vị trí chuột cục bộ (cho highlight trong card)
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setOverlayColor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => CursorFlowGradient && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={boxWrapper}
      // mỗi card là 1 group riêng
      className={cn(
        'group/card relative rounded-lg p-[2px] bg-[#ffffff15] overflow-hidden',
        className
      )}
    >
      {/* lớp spotlight bám theo chuột bên trong card (chỉ khi hover) */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-40 opacity-0 group-hover/card:opacity-100 transition duration-300 rounded-xl"
          style={{
            background: `radial-gradient(250px circle at ${overlayColor.x}px ${overlayColor.y}px, rgba(255,255,255,0.14), transparent 80%)`,
          }}
        />
      )}

      {/* hover/focus spotlight (toàn cục) */}
      {HoverFocusSpotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover/card:opacity-100 rounded-lg"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff76 0%, transparent 20%, transparent) fixed`,
          }}
        />
      )}

      {/* proximity spotlight (toàn cục) */}
      {ProximitySpotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-lg"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff6e 0%, transparent 20%, transparent) fixed`,
          }}
        />
      )}

      {/* Nội dung card: mặc định grayscale, chỉ card đang hover mới có màu */}
      <div
        className="
          relative z-50 transition-[filter] duration-150 ease-out
          filter grayscale contrast-105
          group-hover/card:filter-none
        "
      >
        {children}
      </div>
    </div>
  )
}

type SpotlightCardProps = {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        'relative h-full bg-slate-800 rounded-3xl p-px overflow-hidden',
        // các “quầng sáng” trang trí (blur) bám chuột – optional
        'before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover/card:opacity-100 before:z-10 before:blur-[100px]',
        'after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px]',
        className
      )}
    >
      {children}
    </div>
  )
}
