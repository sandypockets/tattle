import Layout from "../components/Web/Layout/Layout";
import Profile from "../components/Global/Profile/Profile";
import {SITE_NAME} from "../lib/constants";
import Head from "next/head";

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>Account | {SITE_NAME}</title>
      </Head>
      <Layout>
        <Profile />
      </Layout>
    </>
  )
}