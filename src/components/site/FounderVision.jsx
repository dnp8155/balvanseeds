import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTENT = {
  hi: {
    eyebrow: "संस्थापक का विज़न",
    name: "श्री वज़भाई पटेल",
    role: "संस्थापक · Balavan Agro Seeds",
    pullQuote: "मैं किसान का बेटा हूँ — और शायद यही मेरी सबसे बड़ी पहचान है।",
    paragraphs: [
      "मैंने देखा है कि किसान सिर्फ खेत में बीज नहीं बोता — वह उसमें अपने बच्चों के सपने, अपने परिवार की उम्मीद और अपने पूरे साल की मेहनत बोता है।",
      "इसीलिए मेरे लिए बीज कोई साधारण उत्पाद नहीं है। बीज किसान का विश्वास है, उम्मीद है, उसके भविष्य की पहली नींव है।",
    ],
    pledgeTitle: "मेरा Vision, मेरा संकल्प",
    pledge: "मेरा सपना कभी सिर्फ एक बड़ी कंपनी बनाने का नहीं था। मेरा सपना है कि किसान जब हमारे बीज को बोए, तो उसके मन में एक विश्वास हो — \u201cBalavan मेरे साथ है।\u201d",
    imgAlt: "श्री वज़भाई पटेल — संस्थापक, Balavan Agro",
  },
  en: {
    eyebrow: "Founder's Vision",
    name: "Shri Vajabhai Patel",
    role: "Founder · Balavan Agro Seeds",
    pullQuote: "I am a farmer's son — and perhaps that is my greatest identity.",
    paragraphs: [
      "I have seen that a farmer does not merely sow a seed in the field — he sows his children's dreams, his family's hopes and an entire year's labour.",
      "That is why a seed is no ordinary product to me. A seed is a farmer's trust. A seed is his hope. A seed is the first foundation of his future.",
    ],
    pledgeTitle: "My Vision, My Pledge",
    pledge: "My dream was never merely to build a big company. My dream was that when a farmer sows our seed, a conviction stirs in his heart — \u201cBalavan stands with me.\u201d",
    imgAlt: "Shri Vajabhai Patel — Founder, Balavan Agro",
  },
  gu: {
    eyebrow: "સ્થાપકનું વિઝન",
    name: "શ્રી વજભાઈ પટેલ",
    role: "સ્થાપક · Balavan Agro Seeds",
    pullQuote: "હું ખેડૂતનો દીકરો છું — અને કદાચ એ જ મારી સૌથી મોટી ઓળખ છે.",
    paragraphs: [
      "મેં જોયું છે કે ખેડૂત માત્ર ખેતરમાં બીજ નથી વાવતો — તે તેમાં પોતાના બાળકોના સપના, પોતાના પરિવારની આશા અને આખા વર્ષની મહેનત વાવે છે.",
      "એટલે જ મારા માટે બીજ સાધારણ ઉત્પાદન નથી. બીજ ખેડૂતનો વિશ્વાસ છે. બીજ તેની આશા છે. બીજ તેના ભવિષ્યનો પહેલો પાયો છે.",
    ],
    pledgeTitle: "મારું વિઝન, મારો સંકલ્પ",
    pledge: "મારું સપનું કદી માત્ર મોટી કંપની બનવાનું નહોતું. મારું સપનું કે ખેડૂત જ્યારે અમારું બીજ વાવે, ત્યારે તેના મનમાં વિશ્વાસ જાગે — \u201cબલવન મારી સાથે છે.\u201d",
    imgAlt: "શ્રી વજભાઈ પટેલ — સ્થાપક, Balavan Agro",
  },
};

export default function FounderVision() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.en;

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden">
              <Image
                src={images.farmer}
                alt={c.imgAlt}
                className="aspect-[4/5] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.35}
              />
            </div>
          </div>

          {/* Vision content — concise */}
          <div className="lg:col-span-7">
            <blockquote>
              <p className="font-heading text-3xl font-400 leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
                {c.pullQuote}
              </p>
            </blockquote>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70 sm:text-lg">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Pledge */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="font-heading text-xl font-400 text-gold sm:text-2xl">{c.pledgeTitle}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{c.pledge}</p>
            </div>

            {/* Signature */}
            <div className="mt-10">
              <p className="font-heading text-lg font-400 italic text-white">{c.name}</p>
              <p className="text-sm text-white/50">{c.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}