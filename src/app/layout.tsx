import './globals.css';
import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';

import NavBar from '@/components/NavBar';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const assistant = Assistant({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe apps',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

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
