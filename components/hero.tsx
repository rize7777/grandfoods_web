"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/images/hero.jpg"
          alt="山田食品のこだわりの食材"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-wider text-background sm:text-4xl md:text-6xl lg:text-7xl">
          <span className="block text-balance">混じりけのない、まっすぐな味。</span>
          <span className="block mt-3 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal opacity-90">手間ひまは、私たちが済ませておきました。</span>
        </h1>
        <p className="mt-8 text-sm font-medium tracking-[0.2em] text-background/70 sm:text-base">
          グランフーズ株式会社
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-6">
          <a
            href="#about"
            className="w-full border border-background/40 bg-background/10 px-8 py-3.5 text-sm font-medium tracking-wider text-background backdrop-blur-sm transition-all duration-300 hover:bg-background/20 sm:w-auto sm:py-3"
          >
            会社情報
          </a>
          <a
            href="#products"
            className="w-full bg-background px-8 py-3.5 text-sm font-medium tracking-wider text-foreground transition-all duration-300 hover:bg-background/90 sm:w-auto sm:py-3"
          >
            商品紹介
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-background/60 sm:text-xs">SCROLL</span>
          <div className="h-8 w-px animate-pulse bg-background/40 sm:h-12" />
        </div>
      </div>
    </section>
  )
}
