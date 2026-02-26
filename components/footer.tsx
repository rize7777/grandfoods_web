import Link from "next/link"

const navLinks = [
  { label: "ホーム", href: "#hero" },
  { label: "私たちについて", href: "#about" },
  { label: "こだわり", href: "#philosophy" },
  { label: "商品紹介", href: "#products" },
  { label: "会社情報", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 md:flex-row md:justify-between md:text-left">
          <div>
            <span className="font-serif text-lg font-bold tracking-wider text-foreground">
              山田食品
            </span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              山田食品株式会社
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center sm:mt-10 sm:pt-8">
          <p className="text-xs text-muted-foreground">
            {'© 2026 山田食品株式会社 All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
