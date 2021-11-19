import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <meta name="description" content={`Next.js, Tailwind CSS, Supabase, and Storybook.js Template`} />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="apple-touch-icon" sizes="180x180" href="/react.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/react.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/react.ico" />
      <link rel="mask-icon" href="/react.ico" color="#000000" />
      <link rel="shortcut icon" href="/react.svg" />
    </Head>
  )
}