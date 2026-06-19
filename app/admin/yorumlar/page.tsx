'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Testimonial {
  id: string;
  customer_name: string;
  pet_name: string;
  pet_type: string;
  content: string;
  rating: number;
  is_active: boolean;
}

const defaultTestimonial: Omit<Testimonial, 'id'> = {
  customer_name: '',
  pet_name: '',
  pet_type: 'Köpek',
  content: '',
  rating: 5,
  is_active: true,
};

const petTypes = ['Köpek', 'Kedi', 'Kuş', 'Hamster', 'Tavşan', 'Diğer'];

export default function YorumlarPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [newItem, setNewItem] = useState<Omit<Testimonial, 'id'>>(defaultTestimonial);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const response = await fetch('/api/testimonials?all=true');
      const data = await response.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setSaving(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        setMessage('Yorum başarıyla eklendi');
        setNewItem(defaultTestimonial);
        setShowAddForm(false);
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      setMessage('Yorum eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(item: Testimonial) {
    setSaving(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setMessage('Yorum başarıyla güncellendi');
        setEditingItem(null);
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      setMessage('Yorum güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Yorum başarıyla silindi');
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setMessage('Yorum silinirken hata oluştu');
    }
  }

  function renderStars(rating: number, editable: boolean = false, onChange?: (rating: number) => void) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!editable}
            onClick={() => onChange?.(star)}
            className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${editable ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
    );
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
        <h1 className="text-2xl font-bold text-gray-900">Müşteri Yorumları</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Yorum Ekle'}
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
            <CardTitle>Yeni Yorum Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-customer">Müşteri Adı</Label>
                <Input
                  id="new-customer"
                  value={newItem.customer_name}
                  onChange={(e) => setNewItem({ ...newItem, customer_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pet-name">Hayvan Adı</Label>
                <Input
                  id="new-pet-name"
                  value={newItem.pet_name}
                  onChange={(e) => setNewItem({ ...newItem, pet_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pet-type">Hayvan Türü</Label>
                <select
                  id="new-pet-type"
                  className="w-full h-10 px-3 border rounded-md"
                  value={newItem.pet_type}
                  onChange={(e) => setNewItem({ ...newItem, pet_type: e.target.value })}
                >
                  {petTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Puan</Label>
                {renderStars(newItem.rating, true, (rating) => setNewItem({ ...newItem, rating }))}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-content">Yorum</Label>
                <Textarea
                  id="new-content"
                  rows={3}
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="new-active"
                  checked={newItem.is_active}
                  onChange={(e) => setNewItem({ ...newItem, is_active: e.target.checked })}
                />
                <Label htmlFor="new-active">Aktif (sitede göster)</Label>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving}>
                {saving ? 'Kaydediliyor...' : 'Yorumu Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {testimonials.map((item) => (
          <Card key={item.id} className={!item.is_active ? 'opacity-50' : ''}>
            <CardContent className="pt-6">
              {editingItem?.id === item.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Müşteri Adı</Label>
                    <Input
                      value={editingItem.customer_name}
                      onChange={(e) => setEditingItem({ ...editingItem, customer_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hayvan Adı</Label>
                    <Input
                      value={editingItem.pet_name}
                      onChange={(e) => setEditingItem({ ...editingItem, pet_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hayvan Türü</Label>
                    <select
                      className="w-full h-10 px-3 border rounded-md"
                      value={editingItem.pet_type}
                      onChange={(e) => setEditingItem({ ...editingItem, pet_type: e.target.value })}
                    >
                      {petTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Puan</Label>
                    {renderStars(editingItem.rating, true, (rating) => setEditingItem({ ...editingItem, rating }))}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Yorum</Label>
                    <Textarea
                      rows={3}
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active}
                      onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                    />
                    <Label>Aktif (sitede göster)</Label>
                  </div>
                  <div className="md:col-span-2 flex gap-2">
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
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{item.customer_name}</h3>
                      <p className="text-sm text-gray-500">{item.pet_name} ({item.pet_type})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(item.rating)}
                      {!item.is_active && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Pasif</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{item.content}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                      Düzenle
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(item.id)}>
                      Sil
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Henüz yorum eklenmemiş
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
