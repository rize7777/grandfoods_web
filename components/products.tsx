"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

function useInView(threshold = 0.1) {
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

const products = [
  {
    image: "/images/product-1.jpg",
    title: "天然だし",
    description:
      "厳選された鰹節と昆布から丁寧に引いた、風味豊かな天然だし。化学調味料無添加。",
  },
  {
    image: "/images/product-2.jpg",
    title: "伝統漬物",
    description:
      "旬の国産野菜を伝統的な製法で漬け込んだ、素材本来の味わいが生きる漬物シリーズ。",
  },
  {
    image: "/images/product-3.jpg",
    title: "蔵出し味噌",
    description:
      "国産大豆と天然塩を使い、木桶で長期熟成させた深い味わいの味噌。",
  },
]

export default function Products() {
  const { ref, isVisible } = useInView()

  return (
    <section id="products" ref={ref} className="bg-background py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Products
          </p>
          <h2 className="font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-balance">商品紹介</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            素材の味を活かした、こだわりの商品をご紹介します。
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium tracking-wide text-accent transition-all duration-300 group-hover:gap-3">
                  詳しく見る
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
