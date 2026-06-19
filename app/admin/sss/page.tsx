'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

const defaultFAQ: Omit<FAQ, 'id'> = {
  question: '',
  answer: '',
  sort_order: 0,
};

export default function SSSPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [newItem, setNewItem] = useState<Omit<FAQ, 'id'>>(defaultFAQ);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFAQs();
  }, []);

  async function fetchFAQs() {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setSaving(true);
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        setMessage('Soru başarıyla eklendi');
        setNewItem(defaultFAQ);
        setShowAddForm(false);
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
      setMessage('Soru eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(item: FAQ) {
    setSaving(true);
    try {
      const response = await fetch('/api/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setMessage('Soru başarıyla güncellendi');
        setEditingItem(null);
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      setMessage('Soru güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/faq?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Soru başarıyla silindi');
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setMessage('Soru silinirken hata oluştu');
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
        <h1 className="text-2xl font-bold text-gray-900">Sıkça Sorulan Sorular</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Soru Ekle'}
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
            <CardTitle>Yeni Soru Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-question">Soru</Label>
                <Input
                  id="new-question"
                  value={newItem.question}
                  onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
                  placeholder="Veteriner kliniğine ne zaman başvurmalıyım?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-answer">Cevap</Label>
                <Textarea
                  id="new-answer"
                  rows={4}
                  value={newItem.answer}
                  onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-sort">Sıralama</Label>
                <Input
                  id="new-sort"
                  type="number"
                  value={newItem.sort_order}
                  onChange={(e) => setNewItem({ ...newItem, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-32"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving}>
                {saving ? 'Kaydediliyor...' : 'Soruyu Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              {editingItem?.id === item.id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Soru</Label>
                    <Input
                      value={editingItem.question}
                      onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cevap</Label>
                    <Textarea
                      rows={4}
                      value={editingItem.answer}
                      onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sıralama</Label>
                    <Input
                      type="number"
                      value={editingItem.sort_order}
                      onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-32"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(editingItem)} disabled={isDemo || saving}>
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingItem(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded text-sm">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold">{item.question}</h3>
                      </div>
                      <p className="text-gray-600 whitespace-pre-wrap">{item.answer}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                        Düzenle
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(item.id)}>
                        Sil
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {faqs.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Henüz soru eklenmemiş
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
