import CountryPage from '@/components/CountryPage';

export default async function EuropePage({ params: { locale } }: { params: { locale: string } }) {
  return <CountryPage country="europe" locale={locale} />;
}
