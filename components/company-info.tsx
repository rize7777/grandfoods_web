"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Mail, Building2 } from "lucide-react"

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

const companyData = [
  { label: "会社名", value: "グランフーズ株式会社　Grand Foods Co., Ltd." },
  { label: "所在地", value: "〒812-0053　福岡市東区箱崎1-5-22 YGM箱崎駅前1-402" },
  { label: "事業内容", value: "食品の製造・加工・販売" },
  { label: "設立", value: "2026年1月" },
  { label: "代表取締役", value: "福岡 将英" },
  { label: "お問い合わせ", value: "info@grandfoods.co.jp" },
]

const contactInfo = [
  {
    icon: MapPin,
    label: "所在地",
    value: "〒812-0053　福岡市東区箱崎1-5-22 YGM箱崎駅前1-402",
  },
  {
    icon: Mail,
    label: "メール",
    value: "info@grandfoods.co.jp",
  },
]

export default function CompanyInfo() {
  const { ref, isVisible } = useInView()

  return (
    <section id="company" ref={ref} className="bg-secondary py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Company
          </p>
          <h2 className="font-serif text-2xl font-bold tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-balance">会社情報</span>
          </h2>
        </div>

        <div
          className={`mt-10 grid gap-10 sm:mt-16 sm:gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Company details table */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                会社概要
              </h3>
            </div>
            <dl className="divide-y divide-border">
              {companyData.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                >
                  <dt className="w-28 shrink-0 text-sm font-medium text-foreground">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact & Location */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                アクセス
              </h3>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background">
                      <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-wide text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Map embed placeholder */}
            <div className="mt-8 aspect-square overflow-hidden border border-border bg-muted sm:aspect-[16/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.0!2d130.4202!3d33.6219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x354191c2e3f5d1a1%3A0x0!2z56aP5bKh5biC5p2x5Yy65Yi25bKhMS01LTIy!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="グランフーズ株式会社 所在地"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
