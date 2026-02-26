"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export default function About() {
  const { ref: sectionRef, isVisible } = useInView(0.15)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-accent">
              About Us
            </p>
            <h2 className="font-serif text-2xl font-bold leading-snug tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-balance">伝統と革新の融合</span>
            </h2>
            <div className="mt-8 space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                山田食品株式会社は、1952年の創業以来、日本の豊かな食文化を支え続けてまいりました。
                私たちは「自然の恵みを、食卓へ」の理念のもと、厳選された国産素材を使用し、
                伝統的な製法を守りながらも、時代のニーズに応える革新的な商品開発に取り組んでいます。
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                全国の契約農家から届く新鮮な原料。
                職人の手による丁寧な仕込み。
                長年培ってきた発酵・醸造の技術。
                すべての工程に、私たちのこだわりが込められています。
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:mt-10 sm:gap-6">
              <div>
                <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">70+</p>
                <p className="mt-1 text-[10px] tracking-wide text-muted-foreground sm:text-xs">年の歴史</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">200+</p>
                <p className="mt-1 text-[10px] tracking-wide text-muted-foreground sm:text-xs">商品ラインナップ</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">50+</p>
                <p className="mt-1 text-[10px] tracking-wide text-muted-foreground sm:text-xs">契約農家</p>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
            }`}
          >
            <div className="relative aspect-square overflow-hidden sm:aspect-[4/5]">
              <Image
                src="/images/about.jpg"
                alt="山田食品の職人が丹精込めて食材を調理する様子"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-3 left-0 bg-accent px-5 py-4 text-accent-foreground sm:-bottom-6 sm:-left-6 sm:px-8 sm:py-6">
              <p className="font-serif text-base font-bold sm:text-lg">創業 1952年</p>
              <p className="mt-1 text-[10px] tracking-wide opacity-80 sm:text-xs">七十年以上の伝統</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
