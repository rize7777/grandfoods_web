"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxDividerProps {
  imageSrc: string
  alt: string
  quote: string
  author?: string
}

export default function ParallaxDivider({ imageSrc, alt, quote, author }: ParallaxDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && imageRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const visible = rect.top < windowHeight && rect.bottom > 0
        if (visible) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
          const translateY = (progress - 0.5) * 100
          imageRef.current.style.transform = `translateY(${translateY}px)`
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[40vh] overflow-hidden sm:h-[50vh] md:h-[60vh]"
    >
      <div ref={imageRef} className="absolute inset-0 -top-24 -bottom-24">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
        <blockquote className="font-serif text-xl font-bold leading-relaxed tracking-wider text-background sm:text-2xl md:text-3xl lg:text-4xl">
          <span className="text-balance">{quote}</span>
        </blockquote>
        {author && (
          <p className="mt-6 text-sm tracking-widest text-background/70">{author}</p>
        )}
      </div>
    </div>
  )
}
