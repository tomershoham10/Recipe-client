import './globals.css';
import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';

// import NavBar from '@/components/NavBar';
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';

const assistant = Assistant({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipes app',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // const messages = await getMessages();

  return (
    <html lang={locale} dir='rtl'>
      <body
        suppressHydrationWarning={true}
        className={`${assistant.className} flex flex-col bg-recipeGray-mid text-recipeBrown-dark`}
      >
        {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
        {/* <NavBar /> */}
        {/* <section className='h-full overflow-hidden text-recipeGray-darker'> */}
        {children}
        {/* </section> */}
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
