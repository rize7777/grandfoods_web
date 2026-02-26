"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Shield, Heart } from "lucide-react"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const values = [
  {
    icon: Leaf,
    title: "厳選素材",
    description:
      "全国の契約農家から届く、新鮮で安全な国産素材のみを使用。産地から食卓まで、品質を徹底管理しています。",
  },
  {
    icon: Shield,
    title: "安心・安全",
    description:
      "ISO22000認証取得の製造環境で、厳しい品質基準のもと製造。第三者機関による定期検査を実施しています。",
  },
  {
    icon: Heart,
    title: "伝統の技",
    description:
      "七十年以上受け継がれてきた発酵・醸造の技術。熟練の職人が、一つひとつ丁寧に仕上げています。",
  },
]

export default function Philosophy() {
  const { ref, isVisible } = useInView()

  return (
    <section id="philosophy" ref={ref} className="bg-secondary py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Our Philosophy
          </p>
          <h2 className="font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-balance">三つのこだわり</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            山田食品がお届けする商品の根底にある、三つの大切な価値観。
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {values.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`group text-center transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/5">
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
