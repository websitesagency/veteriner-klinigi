import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAuth } from '@/lib/auth/require-auth';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('about_content')
      .select('*');

    if (error) throw error;

    // Convert array to object by section
    const content: Record<string, typeof data[0]> = {};
    data?.forEach((item) => {
      content[item.section] = item;
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { section, ...updates } = body;
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('about_content')
      .upsert({ section, ...updates, updated_at: new Date().toISOString() }, { onConflict: 'section' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
}
