import HeroSection from "../components/Web/HeroSection";
import Layout from '../components/Web/Layout/Layout'
import StatsSection from "../components/Web/StatsSection";
import ImagesWithDescriptions from "../components/Web/ImagesWithDescriptions";

export default function Index() {

  return (
    <>
      <Layout>
        <HeroSection />
        <StatsSection />
        <ImagesWithDescriptions />
      </Layout>
    </>
  )
}