import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content="Podlaski Klub Koszykówki Żubry Białystok. Klub posiada drużynę w 2. i 3. lidze koszykówki mężczyzn. Na stronie można znaleźć terminarze i wyniki meczy oraz informacje o zawodnikach. Klub posiada sklep własny sklep oraz newsletter."
      />
      <title>PKK Żubry Białystok</title>
    </Head>
  );
}
