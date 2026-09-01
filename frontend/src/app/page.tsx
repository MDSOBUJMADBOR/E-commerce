import HeroSectionPage from "@/components/Hero-Section/Hero-Section"
import NewsletterSection from "@/components/HomePageUi/NewsletterSection"
import OurTopBrands from "@/components/OurTopBrands/OurTopBrands"
import ServiceBenefits from "@/components/ServiceBenefits/ServiceBenefits"

const Home = () => {
  return (
    <div>
      <HeroSectionPage />
      <ServiceBenefits />
      <OurTopBrands />
      <NewsletterSection />
    </div>  
  )
}

export default Home
