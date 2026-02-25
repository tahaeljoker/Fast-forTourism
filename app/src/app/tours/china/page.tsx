import CountryPage from '@/components/CountryPage';
import fs from 'fs';
import path from 'path';

export default async function ChinaPage() {
  const dataFilePath = path.join(process.cwd(), 'src/data/tours.json');
  const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
  const allTours = JSON.parse(fileContent);
  const packages = allTours.filter((tour: any) => tour.country === 'china');

  return <CountryPage country="china" packages={packages} />;
}
