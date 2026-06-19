'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface DashboardStats {
  services: number;
  team: number;
  testimonials: number;
  blogPosts: number;
  messages: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    team: 0,
    testimonials: 0,
    blogPosts: 0,
    messages: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [services, team, testimonials, blog, messages, subscribers] = await Promise.all([
          fetch('/api/services').then(r => r.json()),
          fetch('/api/team').then(r => r.json()),
          fetch('/api/testimonials?all=true').then(r => r.json()),
          fetch('/api/blog?all=true').then(r => r.json()),
          fetch('/api/contact').then(r => r.json()),
          fetch('/api/subscribers').then(r => r.json()),
        ]);

        setStats({
          services: Array.isArray(services) ? services.length : 0,
          team: Array.isArray(team) ? team.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          blogPosts: Array.isArray(blog) ? blog.length : 0,
          messages: Array.isArray(messages) ? messages.filter((m: { is_read: boolean }) => !m.is_read).length : 0,
          subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Hizmetler', value: stats.services, href: '/admin/hizmetler', color: 'bg-blue-500' },
    { title: 'Ekip Üyeleri', value: stats.team, href: '/admin/ekip', color: 'bg-green-500' },
    { title: 'Yorumlar', value: stats.testimonials, href: '/admin/yorumlar', color: 'bg-yellow-500' },
    { title: 'Blog Yazıları', value: stats.blogPosts, href: '/admin/blog', color: 'bg-purple-500' },
    { title: 'Okunmamış Mesajlar', value: stats.messages, href: '/admin/iletisim', color: 'bg-red-500' },
    { title: 'Bülten Aboneleri', value: stats.subscribers, href: '/admin/aboneler', color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    {loading ? '...' : stat.value}
                  </span>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link
                href="/admin/hizmetler"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Yeni Hizmet Ekle</div>
                  <div className="text-sm text-gray-500">Hizmet listesine yeni bir hizmet ekleyin</div>
                </div>
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Blog Yazısı Yaz</div>
                  <div className="text-sm text-gray-500">Yeni bir blog yazısı oluşturun</div>
                </div>
              </Link>
              <Link
                href="/admin/ayarlar"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Site Ayarları</div>
                  <div className="text-sm text-gray-500">İletişim bilgilerini ve ayarları düzenleyin</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistem Bilgisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-500">Platform</span>
                <span className="font-medium">Next.js + Supabase</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-500">Veritabanı</span>
                <span className="font-medium">PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-500">Depolama</span>
                <span className="font-medium">Supabase Storage</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Sürüm</span>
                <span className="font-medium">1.0.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
