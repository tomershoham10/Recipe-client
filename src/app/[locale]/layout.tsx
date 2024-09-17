import { lazy } from 'react';
const CreateNewIngredient = lazy(
  () => import('../(popups)/(create)/CreateNewIngredient')
);

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <CreateNewIngredient />
      {children}
    </section>
  );
}
