import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAuth } from '@/lib/auth/require-auth';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;

    // Convert array to object for easier access
    const settings: Record<string, string> = {};
    data?.forEach((item) => {
      settings[item.key] = item.value;
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value: value as string, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
