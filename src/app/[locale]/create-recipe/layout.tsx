import CreateNewIngredient from '@/app/(popups)/(create)/CreateNewIngredient/page';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ...

  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CreateNewIngredient />
      {children}
    </NextIntlClientProvider>
  );
}
