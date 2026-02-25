import CountryPage from '@/components/CountryPage';
import fs from 'fs';
import path from 'path';

export default async function EuropePage() {
  const dataFilePath = path.join(process.cwd(), 'src/data/tours.json');
  const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
  const allTours = JSON.parse(fileContent);
  const packages = allTours.filter((tour: any) => tour.country === 'europe');

  return <CountryPage country="europe" packages={packages} />;
}
