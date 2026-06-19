import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    id: '1',
    name: 'Dr. Ayşe Yılmaz',
    title: 'Klinik Direktörü',
    specialty: 'Genel Cerrahi',
  },
  {
    id: '2',
    name: 'Dr. Mehmet Kaya',
    title: 'Uzman Veteriner',
    specialty: 'İç Hastalıkları',
  },
  {
    id: '3',
    name: 'Dr. Elif Demir',
    title: 'Uzman Veteriner',
    specialty: 'Egzotik Hayvanlar',
  },
];

export default function TeamPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Uzman Kadromuz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Deneyimli veteriner hekimlerimiz, evcil dostlarınızın sağlığı için
            en iyi bakımı sunmak üzere burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium">{member.title}</p>
                <p className="text-gray-500 text-sm mt-1">{member.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/ekibimiz">
            <span className="text-primary font-medium hover:underline">
              Tüm ekibimizi tanıyın &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
