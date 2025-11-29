import Header from "@/components/header"
import Hero from "@/components/hero"
import AppDownload from "@/components/app-download"
import Services from "@/components/services"
import PartnerSection from "@/components/partner-section"
import RiderSection from "@/components/rider-section"
import WhyChoose from "@/components/why-choose"
import Footer from "@/components/footer"

export const metadata = {
  title: "Dinebd - Food Delivery Made Easy",
  description: "Order delicious food from your favorite restaurants and get it delivered fast with Dinebd",
}

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <AppDownload />
      {/* <Services />
      <PartnerSection />
      <RiderSection />
      <WhyChoose />
      <Footer /> */}
    </main>
  )
}
