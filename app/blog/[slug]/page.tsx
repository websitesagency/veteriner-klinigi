import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  'kopeklerde-asi-takvimi': {
    title: 'Köpeklerde Aşı Takvimi: Bilinmesi Gerekenler',
    category: 'Aşılama',
    date: '2024-03-15',
    readTime: '5 dk',
    content: `
      Köpek sahipleri olarak en önemli sorumluluklarımızdan biri, dostlarımızın aşı takvimini düzenli takip etmektir.

      ## Yavru Köpeklerde Aşı Takvimi

      Yavru köpekler, annelerinden aldıkları antikorlar sayesinde ilk haftalarda korunurlar. Ancak bu koruma zamanla azalır ve aşılama gerekli hale gelir.

      **6-8 Hafta:** İlk karma aşı (Distemper, Parvo, Hepatit)
      **10-12 Hafta:** İkinci karma aşı
      **14-16 Hafta:** Üçüncü karma aşı + Kuduz aşısı

      ## Yetişkin Köpeklerde Hatırlatma Aşıları

      Yetişkin köpeklerde aşılar genellikle yılda bir tekrarlanır. Kuduz aşısı yasal olarak zorunludur.

      ## Seyahat Öncesi Aşılar

      Eğer köpeğinizle seyahat edecekseniz, gideceğiniz bölgeye göre ek aşılar gerekebilir. Bu konuda veterinerinize danışın.

      Aşı takvimi konusunda sorularınız için bize ulaşın.
    `,
  },
  'kedi-besleme-rehberi': {
    title: 'Kediler İçin Sağlıklı Beslenme Rehberi',
    category: 'Beslenme',
    date: '2024-03-10',
    readTime: '7 dk',
    content: `
      Kediler obligat karnivorlerdir, yani doğal diyetleri tamamen et bazlıdır.

      ## Temel Beslenme İlkeleri

      - Yüksek proteinli mamalar seçin
      - Tahıl içeriği düşük mamalar tercih edin
      - Taze su her zaman ulaşılabilir olmalı

      ## Yaşına Göre Beslenme

      **Yavru Kediler (0-1 yaş):** Yüksek kalorili yavru maması
      **Yetişkin Kediler (1-7 yaş):** Dengeli yetişkin maması
      **Yaşlı Kediler (7+ yaş):** Sindirimi kolay, protein destekli mamalar

      ## Yasak Yiyecekler

      Asla kedinize şu besinleri vermeyin:
      - Soğan ve sarımsak
      - Çikolata
      - Üzüm ve kuru üzüm
      - Çiğ yumurta

      Sağlıklı beslenme konusunda daha fazla bilgi için veterinerinize danışın.
    `,
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
          <Link href="/blog">
            <Button>Blog&apos;a Don</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
              &larr; Blog&apos;a Don
            </Link>
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              <span>{post.readTime} okuma</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.trim().startsWith('**') && paragraph.trim().includes(':')) {
                  return <p key={index} className="text-gray-700 mb-2">{paragraph}</p>;
                }
                if (paragraph.trim().startsWith('- ')) {
                  return <li key={index} className="text-gray-700 ml-4">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.trim()) {
                  return <p key={index} className="text-gray-700 mb-4">{paragraph}</p>;
                }
                return null;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sorularınız mı Var?
              </h3>
              <p className="text-gray-600 mb-4">
                Uzman veterinerlerimiz sorularınızı yanıtlamak için hazır.
              </p>
              <Link href="/iletisim">
                <Button>Bize Ulaşın</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
