import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const schoolId = String(body?.schoolId || '').trim();

    if (!name || !email || !schoolId) {
      return NextResponse.json({ error: 'name, email, and schoolId are required' }, { status: 400 });
    }

    // MVP: no database wired up. Log server-side so you can see submissions in dev.
    console.log('[lead]', { name, email, schoolId, ts: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
