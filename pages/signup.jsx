import EmailPasswordAuth from "../components/App/Auth/EmailPasswordAuth";
import {SITE_NAME} from "../lib/constants";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign up | {SITE_NAME}</title>
      </Head>
      <EmailPasswordAuth registrationType="signup" />
    </>
  )
}