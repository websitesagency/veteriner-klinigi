'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  education: string;
  bio: string;
  image_url: string;
  sort_order: number;
}

const defaultMember: Omit<TeamMember, 'id'> = {
  name: '',
  title: '',
  specialty: '',
  experience: '',
  education: '',
  bio: '',
  image_url: '',
  sort_order: 0,
};

export default function EkipPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>(defaultMember);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  async function fetchTeam() {
    try {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeam(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File, isEditing: boolean) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'team');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        if (isEditing && editingMember) {
          setEditingMember({ ...editingMember, image_url: data.url });
        } else {
          setNewMember({ ...newMember, image_url: data.url });
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
    setSaving(true);
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (response.ok) {
        setMessage('Ekip üyesi başarıyla eklendi');
        setNewMember(defaultMember);
        setShowAddForm(false);
        fetchTeam();
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      setMessage('Ekip üyesi eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(member: TeamMember) {
    setSaving(true);
    try {
      const response = await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      if (response.ok) {
        setMessage('Ekip üyesi başarıyla güncellendi');
        setEditingMember(null);
        fetchTeam();
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      setMessage('Ekip üyesi güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/team?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Ekip üyesi başarıyla silindi');
        fetchTeam();
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage('Ekip üyesi silinirken hata oluştu');
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
        <h1 className="text-2xl font-bold text-gray-900">Ekip Yönetimi</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Üye Ekle'}
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
            <CardTitle>Yeni Ekip Üyesi Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Ad Soyad</Label>
                <Input
                  id="new-name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-title">Unvan</Label>
                <Input
                  id="new-title"
                  value={newMember.title}
                  onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                  placeholder="Veteriner Hekim"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-specialty">Uzmanlık Alanı</Label>
                <Input
                  id="new-specialty"
                  value={newMember.specialty}
                  onChange={(e) => setNewMember({ ...newMember, specialty: e.target.value })}
                  placeholder="Küçük Hayvan Cerrahisi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-experience">Deneyim</Label>
                <Input
                  id="new-experience"
                  value={newMember.experience}
                  onChange={(e) => setNewMember({ ...newMember, experience: e.target.value })}
                  placeholder="15 Yıl"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-education">Eğitim</Label>
                <Input
                  id="new-education"
                  value={newMember.education}
                  onChange={(e) => setNewMember({ ...newMember, education: e.target.value })}
                  placeholder="Ankara Üniversitesi Veterinerlik Fakültesi"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-bio">Biyografi</Label>
                <Textarea
                  id="new-bio"
                  rows={3}
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-image">Fotoğraf</Label>
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
                {newMember.image_url && (
                  <div className="relative w-20 h-20 mt-2">
                    <Image src={newMember.image_url} alt="Preview" fill className="object-cover rounded" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-sort">Sıralama</Label>
                <Input
                  id="new-sort"
                  type="number"
                  value={newMember.sort_order}
                  onChange={(e) => setNewMember({ ...newMember, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving || uploading}>
                {saving ? 'Kaydediliyor...' : 'Üyeyi Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {team.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              {editingMember?.id === member.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ad Soyad</Label>
                    <Input
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unvan</Label>
                    <Input
                      value={editingMember.title}
                      onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Uzmanlık Alanı</Label>
                    <Input
                      value={editingMember.specialty}
                      onChange={(e) => setEditingMember({ ...editingMember, specialty: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deneyim</Label>
                    <Input
                      value={editingMember.experience}
                      onChange={(e) => setEditingMember({ ...editingMember, experience: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Eğitim</Label>
                    <Input
                      value={editingMember.education}
                      onChange={(e) => setEditingMember({ ...editingMember, education: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Biyografi</Label>
                    <Textarea
                      rows={3}
                      value={editingMember.bio}
                      onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fotoğraf</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, true);
                      }}
                    />
                    {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
                    {editingMember.image_url && (
                      <div className="relative w-20 h-20 mt-2">
                        <Image src={editingMember.image_url} alt="Preview" fill className="object-cover rounded" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Sıralama</Label>
                    <Input
                      type="number"
                      value={editingMember.sort_order}
                      onChange={(e) => setEditingMember({ ...editingMember, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={() => handleUpdate(editingMember)} disabled={isDemo || saving || uploading}>
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingMember(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {member.image_url && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image src={member.image_url} alt={member.name} fill className="object-cover rounded-full" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary font-medium">{member.title}</p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                      {member.specialty && <span>{member.specialty}</span>}
                      {member.experience && <span>{member.experience} Deneyim</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingMember(member)}>
                      Düzenle
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(member.id)}>
                      Sil
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {team.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Henüz ekip üyesi eklenmemiş
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
