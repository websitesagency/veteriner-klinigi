'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export default function AbonelerPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    try {
      const response = await fetch('/api/subscribers');
      const data = await response.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu aboneyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/subscribers?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Abone başarıyla silindi');
        setSubscribers(prev => prev.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      setMessage('Abone silinirken hata oluştu');
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function exportToCSV() {
    const csvContent = [
      ['E-posta', 'Kayıt Tarihi', 'Durum'],
      ...subscribers.map(s => [
        s.email,
        formatDate(s.subscribed_at),
        s.is_active ? 'Aktif' : 'Pasif'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aboneler_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  function copyEmails() {
    const emails = subscribers.filter(s => s.is_active).map(s => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    setMessage('E-postalar panoya kopyalandı');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeCount = subscribers.filter(s => s.is_active).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bülten Aboneleri</h1>
          <p className="text-sm text-gray-500">{activeCount} aktif abone</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyEmails}>
            E-postaları Kopyala
          </Button>
          <Button onClick={exportToCSV}>
            CSV Olarak İndir
          </Button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('başarı') || message.includes('kopyalandı') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{subscribers.length}</div>
              <div className="text-gray-500">Toplam Abone</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{activeCount}</div>
              <div className="text-gray-500">Aktif Abone</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400">{subscribers.length - activeCount}</div>
              <div className="text-gray-500">Pasif Abone</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Abone Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">E-posta</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Durum</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline">
                        {subscriber.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {formatDate(subscriber.subscribed_at)}
                    </td>
                    <td className="py-3 px-4">
                      {subscriber.is_active ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Aktif</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Pasif</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(subscriber.id)}
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {subscribers.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Henüz abone yok
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
