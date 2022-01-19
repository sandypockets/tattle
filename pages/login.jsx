import SignIn from "../components/App/Auth/MagicLinkAuth";
import {SITE_NAME} from "../lib/constants";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | {SITE_NAME}</title>
      </Head>
      <SignIn />
    </>
  )
}