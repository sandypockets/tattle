import Layout from "../components/Web/Layout/Layout";
import PricingSection from "../components/Web/PricingSection";
import PersonWithReceiptSvg from "../components/Web/Graphics/PersonWithReceiptSvg";
import SignUpFooter from "../components/Web/SignUpFooter";

export default function Pricing() {
  return (
    <Layout>
      <div className="bg-white mt-16 mx-4">
        <div className="mx-28 mt-24 pb-6">
          <h2 id="pricing" className="text-5xl font-extrabold text-gray-900">Pricing</h2>
          <p className="mt-4 text-2xl text-gray-500">
            We're big fans of nonsense, but never when it comes to pricing.
          </p>
        </div>
        <PricingSection />

        <section className="flex flex-row-reverse my-12 mx-28 justify-between">
          <div className="flex flex-col justify-center max-w-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900">One plan to rule them all</h2>
            <p className="mt-4 text-lg text-gray-500">
              We don't believe in tiered pricing, or gating features to certain users.
              <p className="pt-1">
                We offer a single plan, with full access to the platform, and any new features we release.
              </p>
            </p>
          </div>
          <div className="my-auto transform -scale-x-100 ">
            <PersonWithReceiptSvg />
          </div>
        </section>
        <div className="mx-28 pb-16">
          <SignUpFooter />
        </div>
      </div>
    </Layout>
  )
}