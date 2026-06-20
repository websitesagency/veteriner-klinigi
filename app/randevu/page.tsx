'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const petTypes = [
  { id: 'kopek', name: 'Köpek', icon: '🐕' },
  { id: 'kedi', name: 'Kedi', icon: '🐈' },
  { id: 'kus', name: 'Kuş', icon: '🐦' },
  { id: 'tavsan', name: 'Tavşan', icon: '🐰' },
  { id: 'hamster', name: 'Hamster', icon: '🐹' },
  { id: 'egzotik', name: 'Egzotik', icon: '🦎' },
];

const services = [
  { id: '1', name: 'Genel Muayene', price: '500 TL' },
  { id: '2', name: 'Aşılama', price: '300-800 TL' },
  { id: '3', name: 'Diş Tedavisi', price: '800-3000 TL' },
  { id: '4', name: 'Ultrason / Röntgen', price: '400-1000 TL' },
  { id: '5', name: 'Laboratuvar', price: '200-1500 TL' },
  { id: '6', name: 'Kısırlaştırma', price: '1500-4000 TL' },
  { id: '7', name: 'Diğer', price: 'Değişken' },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export default function RandevuPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    petType: '',
    petName: '',
    petBreed: '',
    petAge: '',
    service: '',
    date: '',
    time: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    symptoms: '',
    isEmergency: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Randevunuz Alındı!</h2>
            <p className="text-gray-600 mb-6">
              Randevu talebiniz başarıyla oluşturuldu. Onay için sizinle iletişime geçeceğiz.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Hasta:</span>
                  <span className="font-medium">{formData.petName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hizmet:</span>
                  <span className="font-medium">{services.find(s => s.id === formData.service)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tarih:</span>
                  <span className="font-medium">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saat:</span>
                  <span className="font-medium">{formData.time}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => window.location.reload()}>Yeni Randevu Al</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Online Randevu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            5 kolay adımda randevunuzu oluşturun. Onay için sizinle iletişime geçeceğiz.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                    s === step
                      ? 'bg-primary text-white'
                      : s < step
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {s < step ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && 'Hayvan Bilgileri'}
                {step === 2 && 'Hizmet Seçimi'}
                {step === 3 && 'Tarih & Saat'}
                {step === 4 && 'Sahip Bilgileri'}
                {step === 5 && 'Özet & Onay'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Pet Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Hayvan Türü</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {petTypes.map((pet) => (
                        <button
                          key={pet.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, petType: pet.id })}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            formData.petType === pet.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          <div className="text-2xl mb-1">{pet.icon}</div>
                          <div className="text-sm font-medium">{pet.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="petName">Hayvan Adı</Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        placeholder="Örnek: Pamuk"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="petBreed">Irk</Label>
                      <Input
                        id="petBreed"
                        value={formData.petBreed}
                        onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                        placeholder="Örnek: Golden Retriever"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petAge">Yaş (Ay/Yıl)</Label>
                    <Input
                      id="petAge"
                      value={formData.petAge}
                      onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                      placeholder="Örnek: 2 yıl"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Service */}
              {step === 2 && (
                <div className="space-y-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, service: service.id })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all flex justify-between items-center ${
                        formData.service === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <span className="font-medium">{service.name}</span>
                      <span className="text-primary">{service.price}</span>
                    </button>
                  ))}
                  <div className="pt-4">
                    <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-red-200 bg-red-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isEmergency}
                        onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                        className="w-5 h-5 text-red-600"
                      />
                      <div>
                        <span className="font-medium text-red-600">Acil Durum</span>
                        <p className="text-sm text-red-500">Acil müdahale gerektiren bir durum mu?</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Tarih Seçin</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">Saat Seçin</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.time === time
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 hover:border-primary'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Owner Info */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Ad Soyad</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerPhone">Telefon</Label>
                      <Input
                        id="ownerPhone"
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail">E-posta</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Şikayetler / Notlar</Label>
                    <Textarea
                      id="symptoms"
                      rows={4}
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      placeholder="Hayvanınızın şikayetlerini veya özel durumlarını belirtin..."
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Randevu Özeti</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Hayvan:</span>
                        <p className="font-medium">{formData.petName} ({petTypes.find(p => p.id === formData.petType)?.name})</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Irk:</span>
                        <p className="font-medium">{formData.petBreed || '-'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Hizmet:</span>
                        <p className="font-medium">{services.find(s => s.id === formData.service)?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Tarih & Saat:</span>
                        <p className="font-medium">{formData.date} - {formData.time}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Sahip:</span>
                        <p className="font-medium">{formData.ownerName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Telefon:</span>
                        <p className="font-medium">{formData.ownerPhone}</p>
                      </div>
                    </div>
                    {formData.symptoms && (
                      <div>
                        <span className="text-gray-500 text-sm">Şikayetler:</span>
                        <p className="text-sm mt-1">{formData.symptoms}</p>
                      </div>
                    )}
                    {formData.isEmergency && (
                      <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium">
                        Acil Durum Olarak İşaretlendi
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    Geri
                  </Button>
                ) : (
                  <div />
                )}
                {step < 5 ? (
                  <Button onClick={nextStep}>
                    Devam
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Gönderiliyor...' : 'Randevuyu Onayla'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
