import HeroSection from "../components/Web/HeroSection";
import Layout from '../components/Web/Layout/Layout'
import StatsSection from "../components/Web/StatsSection";
import ImagesWithDescriptions from "../components/Web/ImagesWithDescriptions";

const statProps = {
  'heading': 'Pressuring people to keep their goals since 2021.',
  'subHeading': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.',
  'statOne': '90%',
  'statOneText': 'goal success rate',
  'statTwo': '180',
  'statTwoText': 'goals achieved',
  'statThree': '40',
  'statThreeText': 'tattle messages sent',
}

export default function Index() {
  return (
    <>
      <Layout>
        <HeroSection />
        <div className="pt-24">
          <StatsSection statProps={statProps} />
        </div>
        <ImagesWithDescriptions />
      </Layout>
    </>
  )
}