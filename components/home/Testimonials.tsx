import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: '1',
    name: 'Zeynep K.',
    pet: 'Pamuk (Kedi)',
    rating: 5,
    text: 'Kedim Pamuk\'un ameliyatı başarıyla gerçekleştirildi. Dr. Ayşe Hanım ve ekibi çok ilgili ve profesyoneldi. Kesinlikle tavsiye ediyorum!',
  },
  {
    id: '2',
    name: 'Ahmet Y.',
    pet: 'Max (Köpek)',
    rating: 5,
    text: 'Max\'in düzenli check-up\'larını burada yaptırıyoruz. Aşılama takvimini takip etmeleri ve hatırlatmaları çok faydalı. Güler yüzlü bir ekip.',
  },
  {
    id: '3',
    name: 'Fatma S.',
    pet: 'Çiko (Papağan)',
    rating: 5,
    text: 'Egzotik hayvan konusunda uzman bulmak zor ama VetKlinik\'te Dr. Elif Hanım papağanımla çok iyi ilgilendi. Minnettarım!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mutlu Müşterilerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hayvan sahiplerinin deneyimlerini okuyun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.pet}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
