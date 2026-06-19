import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAuth } from '@/lib/auth/require-auth';
import path from 'path';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FOLDERS = new Set(['galeri', 'ekip', 'blog', 'hakkimizda', 'uploads']);

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string | null) ?? 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'Dosya gereklidir' }, { status: 400 });
    }

    // Boyut kontrolü
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Dosya 5 MB limitini aşıyor' }, { status: 400 });
    }

    // MIME tipi kontrolü
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Sadece JPEG, PNG, WebP ve GIF desteklenir' }, { status: 400 });
    }

    // Klasör whitelist — path traversal'ı engelle
    const safeFolder = path.basename(folder);
    if (!ALLOWED_FOLDERS.has(safeFolder)) {
      return NextResponse.json({ error: 'Geçersiz klasör' }, { status: 400 });
    }

    // Uzantıyı dosya adından değil MIME tipinden al
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    const ext = mimeToExt[file.type];
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'Geçersiz dosya tipi' }, { status: 400 });
    }

    // Benzersiz dosya adı — tahmin edilemez
    const { randomBytes } = await import('crypto');
    const filename = `${safeFolder}/${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);

    return NextResponse.json({ success: true, url: urlData.publicUrl, path: data.path });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    return NextResponse.json({ error: 'Dosya yüklenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Dosya yolu gereklidir' }, { status: 400 });
    }

    // Path traversal kontrolü — yalnızca izin verilen klasörlerden silme
    const topFolder = filePath.split('/')[0];
    if (!ALLOWED_FOLDERS.has(topFolder)) {
      return NextResponse.json({ error: 'Geçersiz dosya yolu' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.storage.from('media').remove([filePath]);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Dosya silme hatası:', error);
    return NextResponse.json({ error: 'Dosya silinemedi' }, { status: 500 });
  }
}
