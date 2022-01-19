import Layout from "../components/Web/Layout/Layout";
import {SITE_NAME} from "../lib/constants";
import Head from "next/head";

export default function ByeForNow() {
  return (
    <>
      <Head>
        <title>Bye for now | {SITE_NAME}</title>
      </Head>
      <Layout>
        <section className="flex justify-center mt-20">
          <div>
            <h1 className="text-4xl font-extrabold">Thanks for giving Tattle a try. </h1>
            <h2 className="text-2xl mt-4">We hope it helped you achieve your goals.</h2>
            <div className="mt-6">
              <p className="text-xl">Some other information</p>
              <p className="text-lg">Share your feedback</p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}