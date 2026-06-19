'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
}

const defaultItem: Omit<GalleryItem, 'id'> = {
  category: 'Klinik',
  title: '',
  description: '',
  image_url: '',
  sort_order: 0,
};

const categories = ['Klinik', 'Hastalarımız', 'Ekibimiz', 'Etkinlikler'];

export default function GaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<GalleryItem, 'id'>>(defaultItem);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File, isEditing: boolean) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'gallery');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        if (isEditing && editingItem) {
          setEditingItem({ ...editingItem, image_url: data.url });
        } else {
          setNewItem({ ...newItem, image_url: data.url });
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Resim yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd() {
    if (!newItem.image_url) {
      setMessage('Lütfen bir resim yükleyin');
      return;
    }
    setSaving(true);
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        setMessage('Resim başarıyla eklendi');
        setNewItem(defaultItem);
        setShowAddForm(false);
        fetchItems();
      }
    } catch (error) {
      console.error('Error adding gallery item:', error);
      setMessage('Resim eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(item: GalleryItem) {
    setSaving(true);
    try {
      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setMessage('Resim başarıyla güncellendi');
        setEditingItem(null);
        fetchItems();
      }
    } catch (error) {
      console.error('Error updating gallery item:', error);
      setMessage('Resim güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu resmi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Resim başarıyla silindi');
        fetchItems();
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      setMessage('Resim silinirken hata oluştu');
    }
  }

  const filteredItems = filterCategory
    ? items.filter(item => item.category === filterCategory)
    : items;

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
        <h1 className="text-2xl font-bold text-gray-900">Galeri Yönetimi</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Resim Ekle'}
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
            <CardTitle>Yeni Resim Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-category">Kategori</Label>
                <select
                  id="new-category"
                  className="w-full h-10 px-3 border rounded-md"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-title">Başlık</Label>
                <Input
                  id="new-title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-description">Açıklama</Label>
                <Textarea
                  id="new-description"
                  rows={2}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-image">Resim</Label>
                <Input
                  id="new-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, false);
                  }}
                />
                {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
                {newItem.image_url && (
                  <div className="relative w-40 h-28 mt-2">
                    <Image src={newItem.image_url} alt="Preview" fill className="object-cover rounded" />
                  </div>
                )}
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
              <Button onClick={handleAdd} disabled={isDemo || saving || uploading}>
                {saving ? 'Kaydediliyor...' : 'Resmi Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-4 flex gap-2">
        <Button
          variant={filterCategory === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('')}
        >
          Tümü ({items.length})
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filterCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory(cat)}
          >
            {cat} ({items.filter(i => i.category === cat).length})
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-4">
              {editingItem?.id === item.id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <select
                      className="w-full h-10 px-3 border rounded-md"
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama</Label>
                    <Textarea
                      rows={2}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resim</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, true);
                      }}
                    />
                    {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
                    {editingItem.image_url && (
                      <div className="relative w-full h-32 mt-2">
                        <Image src={editingItem.image_url} alt="Preview" fill className="object-cover rounded" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(editingItem)} disabled={isDemo || saving || uploading} size="sm">
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {item.image_url && (
                    <div className="relative w-full h-40 mb-3">
                      <Image src={item.image_url} alt={item.title || 'Galeri'} fill className="object-cover rounded" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">{item.category}</span>
                  </div>
                  {item.title && <h3 className="font-semibold text-sm">{item.title}</h3>}
                  {item.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>}
                  <div className="flex gap-2 mt-3">
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

        {filteredItems.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="py-8 text-center text-gray-500">
              {filterCategory ? `${filterCategory} kategorisinde resim yok` : 'Henüz resim eklenmemiş'}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
