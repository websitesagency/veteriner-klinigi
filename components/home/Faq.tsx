import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Randevu nasıl alabilirim?',
    answer:
      'Web sitemiz üzerinden online randevu formunu doldurabilir, telefonla arayabilir veya WhatsApp üzerinden bize ulaşabilirsiniz. Aynı gün randevu imkanımız da bulunmaktadır.',
  },
  {
    question: 'Acil durumlarda ne yapmalıyım?',
    answer:
      '7/24 acil hattımızı arayabilirsiniz: 0555 ACL XXXX. Nöbetçi veterinerimiz her zaman hazırdır. Acil durumlarda hemen kliniğimize gelebilirsiniz.',
  },
  {
    question: 'Hangi hayvan türlerine hizmet veriyorsunuz?',
    answer:
      'Köpek, kedi, kuş, tavşan, hamster, balık, sürüngenler ve egzotik hayvanlar dahil tüm evcil hayvanlara hizmet vermekteyiz.',
  },
  {
    question: 'Aşı takvimini nasıl takip edebilirim?',
    answer:
      'Tüm hastalarımızın aşı takvimlerini sistem üzerinden takip ediyoruz. Aşı zamanı geldiğinde SMS ve e-posta ile hatırlatma gönderiyoruz.',
  },
  {
    question: 'Ödeme seçenekleriniz nelerdir?',
    answer:
      'Nakit, kredi kartı ve banka kartı ile ödeme alıyoruz. Ayrıca taksitli ödeme imkanımız da bulunmaktadır.',
  },
];

export default function Faq() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Merak ettiğiniz soruların cevapları
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                className="bg-white rounded-lg px-6 border"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
