'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isDemoMode } from '@/lib/demo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  is_published: boolean;
  read_time: string;
  created_at: string;
}

const defaultPost: Omit<BlogPost, 'id' | 'created_at'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'Genel',
  image_url: '',
  is_published: false,
  read_time: '5 dk',
};

const categories = ['Genel', 'Sağlık', 'Beslenme', 'Bakım', 'Eğitim', 'Hastalıklar'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const isDemo = isDemoMode();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Omit<BlogPost, 'id' | 'created_at'>>(defaultPost);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('/api/blog?all=true');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async function handleImageUpload(file: File, isEditing: boolean) {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        if (isEditing && editingPost) {
          setEditingPost({ ...editingPost, image_url: data.url });
        } else {
          setNewPost({ ...newPost, image_url: data.url });
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
    const postData = {
      ...newPost,
      slug: newPost.slug || generateSlug(newPost.title),
    };
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        setMessage('Yazı başarıyla eklendi');
        setNewPost(defaultPost);
        setShowAddForm(false);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error adding post:', error);
      setMessage('Yazı eklenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(post: BlogPost) {
    setSaving(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        setMessage('Yazı başarıyla güncellendi');
        setEditingPost(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage('Yazı güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Yazı başarıyla silindi');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Yazı silinirken hata oluştu');
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
        <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'İptal' : 'Yeni Yazı Ekle'}
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
            <CardTitle>Yeni Blog Yazısı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-title">Başlık</Label>
                <Input
                  id="new-title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({
                      ...newPost,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-slug">URL (Slug)</Label>
                <Input
                  id="new-slug"
                  value={newPost.slug}
                  onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-category">Kategori</Label>
                <select
                  id="new-category"
                  className="w-full h-10 px-3 border rounded-md"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-excerpt">Özet</Label>
                <Textarea
                  id="new-excerpt"
                  rows={2}
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-content">İçerik</Label>
                <Textarea
                  id="new-content"
                  rows={10}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-image">Kapak Resmi</Label>
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
                {newPost.image_url && (
                  <div className="relative w-40 h-24 mt-2">
                    <Image src={newPost.image_url} alt="Preview" fill className="object-cover rounded" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-read-time">Okuma Süresi</Label>
                <Input
                  id="new-read-time"
                  value={newPost.read_time}
                  onChange={(e) => setNewPost({ ...newPost, read_time: e.target.value })}
                  placeholder="5 dk"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="new-published"
                  checked={newPost.is_published}
                  onChange={(e) => setNewPost({ ...newPost, is_published: e.target.checked })}
                />
                <Label htmlFor="new-published">Yayınla</Label>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={isDemo || saving || uploading}>
                {saving ? 'Kaydediliyor...' : 'Yazıyı Ekle'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className={!post.is_published ? 'opacity-60' : ''}>
            <CardContent className="pt-6">
              {editingPost?.id === post.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Başlık</Label>
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL (Slug)</Label>
                    <Input
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <select
                      className="w-full h-10 px-3 border rounded-md"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Özet</Label>
                    <Textarea
                      rows={2}
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>İçerik</Label>
                    <Textarea
                      rows={10}
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kapak Resmi</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, true);
                      }}
                    />
                    {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
                    {editingPost.image_url && (
                      <div className="relative w-40 h-24 mt-2">
                        <Image src={editingPost.image_url} alt="Preview" fill className="object-cover rounded" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Okuma Süresi</Label>
                    <Input
                      value={editingPost.read_time}
                      onChange={(e) => setEditingPost({ ...editingPost, read_time: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingPost.is_published}
                      onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
                    />
                    <Label>Yayınla</Label>
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={() => handleUpdate(editingPost)} disabled={isDemo || saving || uploading}>
                      {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPost(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {post.image_url && (
                    <div className="relative w-32 h-20 flex-shrink-0">
                      <Image src={post.image_url} alt={post.title} fill className="object-cover rounded" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">{post.category}</span>
                      {!post.is_published && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded">Taslak</span>
                      )}
                      <span className="text-xs text-gray-400">{post.read_time}</span>
                    </div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-1">{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                      Düzenle
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" disabled={isDemo} onClick={() => handleDelete(post.id)}>
                      Sil
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Henüz blog yazısı eklenmemiş
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
