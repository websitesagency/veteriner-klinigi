'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Service {
  id: string;
  name: string;
  description: string;
  details: string;
  price: string;
  duration: string;
  icon: string;
  is_emergency: boolean;
  show_on_home: boolean;
  sort_order: number;
}

const defaultService: Omit<Service, 'id'> = {
  name: '',
  description: '',
  details: '',
  price: '',
  duration: '',
  icon: 'Stethoscope',
  is_emergency: false,
  show_on_home: true,
  sort_order: 0,
};

const iconOptions = [
  'Stethoscope', 'Syringe', 'Scissors', 'Heart', 'Activity',
  'Thermometer', 'Microscope', 'Pill', 'Bone', 'Paw'
];

export default function HizmetlerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>(defaultService);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    setSaving(true);
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (response.ok) {
        setMessage('Hizmet başarıyla eklendi');
        setNewService(defaultService);
        setShowAddForm(false);
        fetchServices();
      }
    } catch (error) {
      console.error('Error adding service:', error);
      setMessage('Hizmet eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(service: Service) {
    setSaving(true);
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      if (response.ok) {
        setMessage('Hizmet başarıyla güncellendi');
        setEditingService(null);
        fetchServices();
      }
    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Hizmet güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Hizmet başarıyla silindi');
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setMessage('Hizmet silinirken hata oluştu');
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
        <h1 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Hizmet Ekle'}
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
            <CardTitle>Yeni Hizmet Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Hizmet Adı</Label>
                <Input
                  id="new-name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-price">Fiyat</Label>
                <Input
                  id="new-price"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="150 TL'den başlayan fiyatlar"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-description">Kısa Açıklama</Label>
                <Input
                  id="new-description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-details">Detaylı Açıklama</Label>
                <Textarea
                  id="new-details"
                  rows={3}
                  value={newService.details}
                  onChange={(e) => setNewService({ ...newService, details: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-duration">Süre</Label>
                <Input
                  id="new-duration"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  placeholder="30-60 dakika"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-icon">İkon</Label>
                <select
                  id="new-icon"
                  className="w-full h-10 px-3 border rounded-md"
                  value={newService.icon}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newService.is_emergency}
                    onChange={(e) => setNewService({ ...newService, is_emergency: e.target.checked })}
                  />
                  Acil Servis
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newService.show_on_home}
                    onChange={(e) => setNewService({ ...newService, show_on_home: e.target.checked })}
                  />
                  Ana Sayfada Göster
                </label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-sort">Sıralama</Label>
                <Input
                  id="new-sort"
                  type="number"
                  value={newService.sort_order}
                  onChange={(e) => setNewService({ ...newService, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving}>
                {saving ? 'Kaydediliyor...' : 'Hizmeti Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              {editingService?.id === service.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hizmet Adı</Label>
                    <Input
                      value={editingService.name}
                      onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fiyat</Label>
                    <Input
                      value={editingService.price}
                      onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Kısa Açıklama</Label>
                    <Input
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Detaylı Açıklama</Label>
                    <Textarea
                      rows={3}
                      value={editingService.details}
                      onChange={(e) => setEditingService({ ...editingService, details: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Süre</Label>
                    <Input
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>İkon</Label>
                    <select
                      className="w-full h-10 px-3 border rounded-md"
                      value={editingService.icon}
                      onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingService.is_emergency}
                        onChange={(e) => setEditingService({ ...editingService, is_emergency: e.target.checked })}
                      />
                      Acil Servis
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingService.show_on_home}
                        onChange={(e) => setEditingService({ ...editingService, show_on_home: e.target.checked })}
                      />
                      Ana Sayfada Göster
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label>Sıralama</Label>
                    <Input
                      type="number"
                      value={editingService.sort_order}
                      onChange={(e) => setEditingService({ ...editingService, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={() => handleUpdate(editingService)} disabled={isDemo || saving}>
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingService(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-primary font-medium">{service.price}</span>
                      {service.duration && <span className="text-gray-400">{service.duration}</span>}
                      {service.is_emergency && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">Acil</span>}
                      {service.show_on_home && <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">Ana Sayfa</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingService(service)}>
                      Düzenle
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(service.id)}>
                      Sil
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Henüz hizmet eklenmemiş
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
