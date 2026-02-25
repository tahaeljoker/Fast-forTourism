import CountryPage from '@/components/CountryPage';

export default async function IndonesiaPage({ params: { locale } }: { params: { locale: string } }) {
  return <CountryPage country="indonesia" locale={locale} />;
}
