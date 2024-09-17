import './globals.css';
import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';

import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// import { getMessages } from 'next-intl/server';

const assistant = Assistant({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe apps',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={'he'} dir='rtl'>
      <body
        suppressHydrationWarning={true}
        className={`${assistant.className} flex flex-col bg-recipeGray-light text-recipeBrown-dark`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          <section className='h-full overflow-hidden text-recipeGray-darker'>
            {children}
          </section>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
