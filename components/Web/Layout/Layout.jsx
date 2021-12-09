import { useRouter } from "next/router";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({ children }) {
  const router = useRouter()
  const currentUrl = router.asPath

  return (
    <>
      <Meta />
      <header>
        <Navigation currentUrl={currentUrl} />
      </header>
      <main className="mt-10">
        {children}
      </main>
      <Footer />
    </>
  )
}