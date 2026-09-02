import HeroSectionPage from "@/components/Hero-Section/Hero-Section"
import NewsletterSection from "@/components/HomePageUi/NewsletterSection"
import OurTopBrands from "@/components/OurTopBrands/OurTopBrands"
import ServiceBenefits from "@/components/ServiceBenefits/ServiceBenefits"
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory"

const Home = () => {
  return (
    <div>
      <HeroSectionPage />
      <ShopByCategory />
      <ServiceBenefits />
      <OurTopBrands />
      <NewsletterSection />
    </div>  
  )
}

export default Home
