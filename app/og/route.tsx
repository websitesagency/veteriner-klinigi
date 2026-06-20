import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #d1fae5 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Arka plan daire */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(34,197,94,0.08)', display: 'flex' }} />

        {/* Demo badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#orange', backgroundColor: '#f97316', color: 'white', padding: '8px 20px', borderRadius: 999, fontSize: 18, fontWeight: 700, marginBottom: 32 }}>
          ✦ Demo Site
        </div>

        {/* Logo & İsim */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 36, fontWeight: 900 }}>
            VK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 56, fontWeight: 900, color: '#15803d', lineHeight: 1 }}>VetKlinik</span>
            <span style={{ fontSize: 22, color: '#4b5563', marginTop: 4 }}>Veteriner Kliniği</span>
          </div>
        </div>

        {/* Alt yazı */}
        <div style={{ fontSize: 26, color: '#374151', textAlign: 'center', maxWidth: 700, lineHeight: 1.4, marginBottom: 40 }}>
          Evcil dostlarınız için profesyonel veteriner hizmetleri
        </div>

        {/* Özellik badge'leri */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['7/24 Acil Servis', 'Online Randevu', 'Aşı Takvimi', 'Hasta Takibi'].map((f) => (
            <div key={f} style={{ background: 'white', border: '2px solid #bbf7d0', borderRadius: 12, padding: '10px 20px', fontSize: 18, color: '#15803d', fontWeight: 600 }}>
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', alignItems: 'center', gap: 12, background: '#f97316', color: 'white', padding: '14px 28px', borderRadius: 14, fontSize: 20, fontWeight: 700 }}>
          Bu Siteyi Satın Al →
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 48, left: 60, fontSize: 18, color: '#9ca3af' }}>
          veteriner-klinigi.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
