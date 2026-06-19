import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: '1',
    slug: 'kopeklerde-asi-takvimi',
    title: 'Köpeklerde Aşı Takvimi: Bilinmesi Gerekenler',
    excerpt: 'Köpek sahipleri için kapsamlı aşı rehberi. Hangi aşının ne zaman yapılması gerektiğini öğrenin.',
    category: 'Aşılama',
    date: '2024-03-15',
    readTime: '5 dk',
  },
  {
    id: '2',
    slug: 'kedi-besleme-rehberi',
    title: 'Kediler İçin Sağlıklı Beslenme Rehberi',
    excerpt: 'Kedinizin yaşına ve sağlık durumuna göre nasıl beslenmesi gerektiğini keşfedin.',
    category: 'Beslenme',
    date: '2024-03-10',
    readTime: '7 dk',
  },
  {
    id: '3',
    slug: 'kisirlastirma-operasyonu',
    title: 'Kısırlaştırma Operasyonu: Sık Sorulan Sorular',
    excerpt: 'Kısırlaştırma operasyonu hakkında merak edilenleri yanıtladık.',
    category: 'Cerrahi',
    date: '2024-03-05',
    readTime: '6 dk',
  },
  {
    id: '4',
    slug: 'kene-pire-korunma',
    title: 'Kene ve Pire Korunma Yöntemleri',
    excerpt: 'Evcil hayvanınızı dış parazitlerden nasıl koruyabilirsiniz? Etkili yöntemler.',
    category: 'Koruyucu Sağlık',
    date: '2024-02-28',
    readTime: '4 dk',
  },
  {
    id: '5',
    slug: 'egzotik-hayvan-bakimi',
    title: 'Egzotik Hayvan Bakımı: Başlangıç Rehberi',
    excerpt: 'Papağan, kaplumbağa ve diğer egzotik hayvanlar için temel bakım bilgileri.',
    category: 'Egzotik',
    date: '2024-02-20',
    readTime: '8 dk',
  },
  {
    id: '6',
    slug: 'dis-sagligi-onemi',
    title: 'Evcil Hayvanlarda Diş Sağlığı Neden Önemli?',
    excerpt: 'Diş hastalıkları ve bunların genel sağlığa etkisi hakkında bilmeniz gerekenler.',
    category: 'Diş Sağlığı',
    date: '2024-02-15',
    readTime: '5 dk',
  },
];

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evcil hayvan sağlığı hakkında faydalı bilgiler, ipuçları ve haberler.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-48 bg-primary/10 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      <span className="text-primary font-medium group-hover:underline">Devamını Oku</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bilgilendirme Bültenimize Abone Olun
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            En yeni makalelerimizi ve evcil hayvan sağlığı ipuçlarını e-posta ile alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
