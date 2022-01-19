import Layout from "../components/Web/Layout/Layout";
import Faqs from "../components/Web/Faqs";
import Head from 'next/head'
import { SITE_NAME } from "../lib/constants";

export default function Faq() {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | {SITE_NAME}</title>
      </Head>
      <Layout>
        <Faqs />
      </Layout>
    </>
  )
}