import EmailPasswordAuth from "../../components/App/Auth/EmailPasswordAuth";
import {SITE_NAME} from "../../lib/constants";
import Head from "next/head";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign in | {SITE_NAME}</title>
      </Head>
      <EmailPasswordAuth registrationType="signin"/>
    </>
  )
}