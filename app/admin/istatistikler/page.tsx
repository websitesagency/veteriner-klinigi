'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  sort_order: number;
}

const defaultStat: Omit<Statistic, 'id'> = {
  label: '',
  value: 0,
  suffix: '+',
  sort_order: 0,
};

export default function IstatistiklerPage() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingItem, setEditingItem] = useState<Statistic | null>(null);
  const [newItem, setNewItem] = useState<Omit<Statistic, 'id'>>(defaultStat);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    try {
      const response = await fetch('/api/statistics');
      const data = await response.json();
      setStatistics(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setSaving(true);
    try {
      const response = await fetch('/api/statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        setMessage('İstatistik başarıyla eklendi');
        setNewItem(defaultStat);
        setShowAddForm(false);
        fetchStatistics();
      }
    } catch (error) {
      console.error('Error adding statistic:', error);
      setMessage('İstatistik eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(item: Statistic) {
    setSaving(true);
    try {
      const response = await fetch('/api/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setMessage('İstatistik başarıyla güncellendi');
        setEditingItem(null);
        fetchStatistics();
      }
    } catch (error) {
      console.error('Error updating statistic:', error);
      setMessage('İstatistik güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu istatistiği silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/statistics?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('İstatistik başarıyla silindi');
        fetchStatistics();
      }
    } catch (error) {
      console.error('Error deleting statistic:', error);
      setMessage('İstatistik silinirken hata oluştu');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">İstatistikler</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni İstatistik Ekle'}
        </Button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('başarı') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Yeni İstatistik Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-label">Etiket</Label>
                <Input
                  id="new-label"
                  value={newItem.label}
                  onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                  placeholder="Mutlu Hasta"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-value">Değer</Label>
                <Input
                  id="new-value"
                  type="number"
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-suffix">Sonek</Label>
                <Input
                  id="new-suffix"
                  value={newItem.suffix}
                  onChange={(e) => setNewItem({ ...newItem, suffix: e.target.value })}
                  placeholder="+ veya Yıl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-sort">Sıralama</Label>
                <Input
                  id="new-sort"
                  type="number"
                  value={newItem.sort_order}
                  onChange={(e) => setNewItem({ ...newItem, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving}>
                {saving ? 'Kaydediliyor...' : 'İstatistiği Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statistics.map((stat) => (
          <Card key={stat.id} className="text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İstatistik Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statistics.map((stat) => (
              <div key={stat.id} className="border-b pb-4 last:border-0">
                {editingItem?.id === stat.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Etiket</Label>
                      <Input
                        value={editingItem.label}
                        onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Değer</Label>
                      <Input
                        type="number"
                        value={editingItem.value}
                        onChange={(e) => setEditingItem({ ...editingItem, value: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sonek</Label>
                      <Input
                        value={editingItem.suffix}
                        onChange={(e) => setEditingItem({ ...editingItem, suffix: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sıralama</Label>
                      <Input
                        type="number"
                        value={editingItem.sort_order}
                        onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                      <Button onClick={() => handleUpdate(editingItem)} disabled={isDemo || saving} size="sm">
                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
                        İptal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-primary">{stat.value}{stat.suffix}</span>
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingItem(stat)}>
                        Düzenle
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(stat.id)}>
                        Sil
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {statistics.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Henüz istatistik eklenmemiş
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
