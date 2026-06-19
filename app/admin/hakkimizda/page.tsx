'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface AboutSection {
  id: string;
  section: string;
  title: string;
  content: string;
  image_url: string;
}

interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}

const defaultFacility: Omit<Facility, 'id'> = {
  name: '',
  description: '',
  icon: 'Check',
  sort_order: 0,
};

const iconOptions = ['Check', 'Shield', 'Heart', 'Star', 'Award', 'Zap', 'Clock', 'Users'];

export default function HakkimizdaPage() {
  const [aboutContent, setAboutContent] = useState<AboutSection[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [newFacility, setNewFacility] = useState<Omit<Facility, 'id'>>(defaultFacility);
  const [showAddFacility, setShowAddFacility] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [aboutRes, facilitiesRes] = await Promise.all([
        fetch('/api/about'),
        fetch('/api/facilities'),
      ]);
      const aboutData = await aboutRes.json();
      const facilitiesData = await facilitiesRes.json();
      setAboutContent(Array.isArray(aboutData) ? aboutData : []);
      setFacilities(Array.isArray(facilitiesData) ? facilitiesData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File, sectionId: string) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'about');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        setAboutContent(prev =>
          prev.map(section =>
            section.id === sectionId
              ? { ...section, image_url: data.url }
              : section
          )
        );
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Resim yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  }

  async function handleUpdateAbout(section: AboutSection) {
    setSaving(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      if (response.ok) {
        setMessage('İçerik başarıyla güncellendi');
      }
    } catch (error) {
      console.error('Error updating about:', error);
      setMessage('İçerik güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleAddFacility() {
    setSaving(true);
    try {
      const response = await fetch('/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFacility),
      });
      if (response.ok) {
        setMessage('Olanak başarıyla eklendi');
        setNewFacility(defaultFacility);
        setShowAddFacility(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error adding facility:', error);
      setMessage('Olanak eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateFacility(facility: Facility) {
    setSaving(true);
    try {
      const response = await fetch('/api/facilities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facility),
      });
      if (response.ok) {
        setMessage('Olanak başarıyla güncellendi');
        setEditingFacility(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating facility:', error);
      setMessage('Olanak güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteFacility(id: string) {
    if (!confirm('Bu olanağı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/facilities?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Olanak başarıyla silindi');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
      setMessage('Olanak silinirken hata oluştu');
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hakkımızda Sayfası</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('başarı') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {aboutContent.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.section === 'main' ? 'Ana İçerik' : section.section === 'values' ? 'Değerlerimiz' : section.section}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Başlık</Label>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    setAboutContent(prev =>
                      prev.map(s => s.id === section.id ? { ...s, title: e.target.value } : s)
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>İçerik</Label>
                <Textarea
                  rows={6}
                  value={section.content}
                  onChange={(e) =>
                    setAboutContent(prev =>
                      prev.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Resim</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, section.id);
                  }}
                />
                {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
                {section.image_url && (
                  <div className="relative w-40 h-28 mt-2">
                    <Image src={section.image_url} alt="Preview" fill className="object-cover rounded" />
                  </div>
                )}
              </div>
              <Button onClick={() => handleUpdateAbout(section)} disabled={isDemo || saving}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Klinik Olanakları</CardTitle>
            <Button size="sm" onClick={() => setShowAddFacility(!showAddFacility)}>
              {showAddFacility ? 'İptal' : 'Yeni Ekle'}
            </Button>
          </CardHeader>
          <CardContent>
            {showAddFacility && (
              <div className="mb-6 p-4 border rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Ad</Label>
                    <Input
                      value={newFacility.name}
                      onChange={(e) => setNewFacility({ ...newFacility, name: e.target.value })}
                      placeholder="Modern Ameliyathane"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>İkon</Label>
                    <select
                      className="w-full h-10 px-3 border rounded-md"
                      value={newFacility.icon}
                      onChange={(e) => setNewFacility({ ...newFacility, icon: e.target.value })}
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sıralama</Label>
                    <Input
                      type="number"
                      value={newFacility.sort_order}
                      onChange={(e) => setNewFacility({ ...newFacility, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Açıklama</Label>
                  <Textarea
                    rows={2}
                    value={newFacility.description}
                    onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddFacility} disabled={isDemo || saving}>
                  {saving ? 'Kaydediliyor...' : 'Ekle'}
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {facilities.map((facility) => (
                <div key={facility.id} className="border-b pb-4 last:border-0">
                  {editingFacility?.id === facility.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Ad</Label>
                          <Input
                            value={editingFacility.name}
                            onChange={(e) => setEditingFacility({ ...editingFacility, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>İkon</Label>
                          <select
                            className="w-full h-10 px-3 border rounded-md"
                            value={editingFacility.icon}
                            onChange={(e) => setEditingFacility({ ...editingFacility, icon: e.target.value })}
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Sıralama</Label>
                          <Input
                            type="number"
                            value={editingFacility.sort_order}
                            onChange={(e) => setEditingFacility({ ...editingFacility, sort_order: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Açıklama</Label>
                        <Textarea
                          rows={2}
                          value={editingFacility.description}
                          onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleUpdateFacility(editingFacility)} disabled={isDemo || saving} size="sm">
                          {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingFacility(null)}>
                          İptal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{facility.name}</h4>
                        <p className="text-sm text-gray-500">{facility.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingFacility(facility)}>
                          Düzenle
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDeleteFacility(facility.id)}>
                          Sil
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {facilities.length === 0 && (
                <div className="py-4 text-center text-gray-500">
                  Henüz olanak eklenmemiş
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
