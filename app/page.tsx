import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import ParallaxDivider from "@/components/parallax-divider"
import Philosophy from "@/components/philosophy"
import Products from "@/components/products"
import CompanyInfo from "@/components/company-info"
import ContactCTA from "@/components/contact-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <ParallaxDivider
        imageSrc="/images/parallax-field.jpg"
        alt="日本の豊かな自然と農村風景"
        quote="土から食卓まで、すべてに真心を。"
      />
      <Philosophy />
      <Products />
      <ParallaxDivider
        imageSrc="/images/hero.jpg"
        alt="山田食品のこだわりの食材"
        quote="美味しさの先にある、安心を届けたい。"
        author="代表取締役 山田太郎"
      />
      <CompanyInfo />
      <ContactCTA />
      <Footer />
    </main>
  )
}
