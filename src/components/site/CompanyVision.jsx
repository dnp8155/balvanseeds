import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * CompanyVision — "संस्था का विज़न" section based on the client's PDF (page 4).
 * A light, card-based layout with the main vision statement and three
 * sub-sections: हमारा सपना, हमारा मूल संकल्प, हमारी पहचान.
 */
const CONTENT = {
  hi: {
    eyebrow: "वैश्विक दृष्टि",
    title: "संस्था का विज़न",
    visionQuote:
      "\u201cभारत की समृद्ध कृषि विरासत और किसानों की मेहनत को अपनी ताकत बनाकर, गुणवत्ता, नवाचार और विश्वसनीयता के माध्यम से भारतीय कृषि को नई ऊँचाइयों तक पहुँचाना तथा भारत की कृषि शक्ति को विश्व के हर कोने तक पहुँचाने वाला एक विश्वसनीय वैश्विक ब्रांड बनना।\u201d",
    paragraphs: [
      "Balavan Agro Seeds Pvt. Ltd. एक भारतीय कंपनी के रूप में भारत की उपजाऊ मिट्टी, मेहनती किसानों और कृषि की सदियों पुरानी परंपरा को अपनी पहचान मानती है।",
      "हमारा उद्देश्य केवल गुणवत्तापूर्ण बीज और कृषि उत्पाद उपलब्ध कराना नहीं, बल्कि भारतीय किसानों की समृद्धि बढ़ाना, भारतीय कृषि की गुणवत्ता को विश्व स्तर तक पहुँचाना और \u201cMade in India\u201d की पहचान को वैश्विक बाजार में मजबूत बनाना है।",
      "हम गुणवत्ता, शुद्धता, अनुसंधान, नवाचार और ईमानदार व्यापार के सिद्धांतों के साथ आगे बढ़ते हुए ऐसी कंपनी का निर्माण करना चाहते हैं, जिस पर किसान भारत में भरोसा करें और ग्राहक दुनिया भर में विश्वास करें।",
    ],
    pillars: [
      {
        label: "हमारा सपना",
        text: "भारत की मिट्टी से निकली गुणवत्ता दुनिया के खेतों तक पहुँचे और Balavan Agro Seeds भारत की कृषि शक्ति का एक गौरवपूर्ण वैश्विक प्रतिनिधि बने।",
      },
      {
        label: "हमारा मूल संकल्प",
        text: "भारतीय मिट्टी से विश्व बाजार तक – गुणवत्ता, विश्वास और किसान की समृद्धि के साथ।",
      },
      {
        label: "हमारी पहचान",
        text: "भारतीय मूल · किसान-केंद्रित सोच · विश्वस्तरीय नवाचार · वैश्विक दृष्टिकोण",
      },
    ],
  },
  en: {
    eyebrow: "Global Outlook",
    title: "Company Vision",
    visionQuote:
      "\u201cBy drawing strength from India's rich agricultural heritage and the dedication of our farmers, we aim to elevate Indian agriculture to new heights through quality, innovation and reliability — and to become a trusted global brand that carries India's agricultural prowess to every corner of the world.\u201d",
    paragraphs: [
      "As an Indian company, Balavan Agro Seeds Pvt. Ltd. considers India's fertile soil, hardworking farmers and centuries-old farming tradition as its identity.",
      "Our purpose is not merely to provide quality seeds and agricultural products, but to enhance the prosperity of Indian farmers, elevate the quality of Indian agriculture to a global standard, and strengthen the \u201cMade in India\u201d identity in the world market.",
      "We advance with the principles of quality, purity, research, innovation and honest trade to build a company that farmers across India trust and customers around the world believe in.",
    ],
    pillars: [
      {
        label: "Our Dream",
        text: "The quality born of Indian soil should reach fields across the world, and Balavan Agro Seeds should become a proud global representative of India's agricultural strength.",
      },
      {
        label: "Our Core Resolution",
        text: "From Indian soil to the world market — with quality, trust and the farmer's prosperity.",
      },
      {
        label: "Our Identity",
        text: "Indian roots · Farmer-centric thinking · World-class innovation · Global outlook",
      },
    ],
  },
};

export default function CompanyVision() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.hi;

  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Image accent */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <Image
                src={images.fieldTexture}
                alt="Rows of green sprouts in fertile soil"
                className="aspect-[4/5] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.4}
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-gold" />
              {c.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-700 leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {c.title}
            </h2>

            <blockquote className="mt-6 rounded-xl border-l-4 border-primary bg-card p-6 shadow-soft">
              <p className="font-heading text-lg font-500 leading-relaxed text-foreground/90 sm:text-xl text-balance">
                {c.visionQuote}
              </p>
            </blockquote>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Three pillars */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {c.pillars.map((p) => (
                <div key={p.label} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-heading text-lg font-700 text-primary">{p.label}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}