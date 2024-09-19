import NavBar from '@/components/NavBar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import { lazy } from 'react';
// const CreateNewIngredient = lazy(
//   () => import('../(popups)/(create)/CreateNewIngredient')
// );

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NavBar />
        <section className='h-full overflow-hidden text-recipeGray-darker'>
          {children}
        </section>
      </NextIntlClientProvider>
    </>
  );
}
