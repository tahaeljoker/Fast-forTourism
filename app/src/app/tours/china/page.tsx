import CountryPage from '@/components/CountryPage';

export default async function ChinaPage({ params: { locale } }: { params: { locale: string } }) {
  return <CountryPage country="china" locale={locale} />;
}
