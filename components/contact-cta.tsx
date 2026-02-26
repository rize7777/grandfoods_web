"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-primary py-16 sm:py-24 md:py-32"
    >
      <div
        className={`mx-auto max-w-3xl px-4 text-center transition-all duration-1000 sm:px-6 lg:px-8 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-primary-foreground/60">
          Contact
        </p>
        <h2 className="font-serif text-2xl font-bold tracking-wide text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="text-balance">お気軽にお問い合わせください</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70">
          商品に関するご質問、お取引のご相談など、
          お気軽にお問い合わせください。
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-6">
          <a
            href="mailto:info@yamada-foods.co.jp"
            className="flex w-full items-center justify-center gap-3 bg-primary-foreground px-8 py-4 text-sm font-medium tracking-wider text-primary transition-opacity duration-300 hover:opacity-90 sm:w-auto"
          >
            お問い合わせはこちら
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:03-1234-5678"
            className="flex w-full items-center justify-center gap-3 border border-primary-foreground/30 px-8 py-4 text-sm font-medium tracking-wider text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground/10 sm:w-auto"
          >
            03-1234-5678
          </a>
        </div>
      </div>
    </section>
  )
}
