import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * FounderVision — "संस्थापक का विज़न" section based on the client's PDF (pages 2 & 3).
 * A dark editorial layout with the founder's portrait, pull-quote, full vision
 * statement, and the "मेरा एक वाक्य में Vision" summary box.
 */
const CONTENT = {
  hi: {
    eyebrow: "संस्थापक का विज़न",
    name: "श्री वज़भाई पटेल",
    role: "संस्थापक · Balavan Agro Seeds",
    pullQuote: "मैं किसान का बेटा हूँ... और शायद यही मेरी सबसे बड़ी पहचान है।",
    paragraphs: [
      "मैंने बचपन से किसान को मिट्टी में पसीना बहाते देखा है। सुबह सूरज निकलने से पहले खेत में पहुँचना और शाम ढलने के बाद घर लौटना देखा है।",
      "मैंने देखा है कि किसान सिर्फ खेत में बीज नहीं बोता... वह उसमें अपने बच्चों के सपने, अपने परिवार की उम्मीद और अपने पूरे साल की मेहनत बोता है। एक किसान जब अपने हाथ में बीज लेता है, तो वह केवल एक दाना नहीं देखता — वह उसमें अपनी फसल, अपने परिवार की खुशियाँ और अपने आने वाले कल का सपना देखता है।",
      "इसीलिए मेरे लिए बीज कोई साधारण उत्पाद नहीं है। बीज किसान का विश्वास है। बीज किसान की उम्मीद है। बीज उसके भविष्य की पहली नींव है।",
      "यही भावना Balavan Agro Seeds की शुरुआत का कारण बनी। मेरा सपना कभी सिर्फ एक बड़ी कंपनी बनाने का नहीं था। मेरा सपना था कि किसान जब हमारे बीज को अपने खेत में बोए, तो उसके मन में एक विश्वास हो — \u201cBalavan मेरे साथ है।\u201d",
      "मैं चाहता हूँ कि किसान को अच्छी गुणवत्ता के बीज के लिए भटकना न पड़े। उसे शुद्ध, विश्वसनीय और बेहतर गुणवत्ता वाला बियान सही समय पर मिले। और जब वह अपनी फसल को खेत में लहलहाता हुआ देखे, तो उसके चेहरे की मुस्कान में हमारी मेहनत भी दिखाई दे।",
    ],
    summaryLabel: "मेरा एक वाक्य में Vision",
    summaryLines: [
      "किसान की मेहनत",
      "हमारी जिम्मेदारी,",
      "किसान की मुस्कान",
      "हमारी सबसे बड़ी सफलता।",
    ],
    detailedTitle: "मेरा Vision, मेरा संकल्प",
    detailed: [
      "Balavan Agro Seeds मेरे लिए सिर्फ एक कंपनी नहीं है। यह एक किसान के बेटे का सपना है। एक ऐसा सपना, जिसमें किसान की तरक्की ही हमारी सबसे बड़ी सफलता है।",
      "हम दिन-रात इसलिए मेहनत करते हैं कि किसान की मेहनत कभी कमजोर न पड़े। हम गुणवत्ता के लिए इसलिए प्रतिबद्ध हैं क्योंकि हमें पता है कि हमारे बीज के साथ किसान की पूरी उम्मीद जुड़ी होती है।",
    ],
    beliefChain: [
      "अगर किसान मजबूत है, तो खेत मजबूत है।",
      "अगर खेत मजबूत है, तो गाँव मजबूत है।",
      "अगर गाँव मजबूत है, तो भारत मजबूत है।",
    ],
    closing: [
      "इसलिए मेरा लक्ष्य Balavan Agro Seeds को केवल एक सफल Seed Company बनाना नहीं है। मेरा सपना है कि Balavan Agro Seeds देश के करोड़ों किसानों के विश्वास का नाम बने।",
      "एक ऐसी कंपनी... जो किसान की भाषा समझे। जो किसान की जरूरत समझे। जो किसान के दर्द को महसूस करे। जो किसान के साथ अच्छे समय में ही नहीं, हर परिस्थिति में खड़ी रहे।",
    ],
    finalLine: "यही मेरा Vision है। यही मेरा संकल्प है। और यही Balavan Agro Seeds की आत्मा है।",
    imgAlt: "श्री वज़भाई पटेल — संस्थापक, Balavan Agro",
  },
  en: {
    eyebrow: "Founder's Vision",
    name: "Shri Vajabhai Patel",
    role: "Founder · Balavan Agro Seeds",
    pullQuote: "I am a farmer's son... and perhaps that is my greatest identity.",
    paragraphs: [
      "Since childhood I have watched farmers pour their sweat into the soil — reaching the fields before sunrise and returning home only after dusk.",
      "I have seen that a farmer does not merely sow a seed in the field... he sows his children's dreams, his family's hopes and an entire year's labour. When a farmer holds a seed in his hand, he does not see just a grain — he sees his harvest, his family's happiness and the dream of his tomorrow.",
      "That is why a seed is no ordinary product to me. A seed is a farmer's trust. A seed is a farmer's hope. A seed is the first foundation of his future.",
      "This very sentiment became the reason Balavan Agro Seeds began. My dream was never merely to build a big company. My dream was that when a farmer sows our seed, a conviction stirs in his heart — \u201cBalavan stands with me.\u201d",
      "I want no farmer to wander in search of quality seed. He deserves pure, reliable, superior seed at the right time. And when he sees his crop flourishing in the field, the smile on his face should reflect our labour too.",
    ],
    summaryLabel: "My Vision in One Sentence",
    summaryLines: [
      "The farmer's effort,",
      "our responsibility;",
      "the farmer's smile,",
      "our greatest success.",
    ],
    detailedTitle: "My Vision, My Pledge",
    detailed: [
      "Balavan Agro Seeds is not just a company to me. It is the dream of a farmer's son — a dream in which the farmer's progress is our greatest success.",
      "We work day and night so that the farmer's labour never falters. We are committed to quality because we know that a farmer's entire hope is tied to our seed.",
    ],
    beliefChain: [
      "If the farmer is strong, the field is strong.",
      "If the field is strong, the village is strong.",
      "If the village is strong, India is strong.",
    ],
    closing: [
      "Therefore my goal is not merely to make Balavan Agro Seeds a successful seed company. My dream is that Balavan Agro Seeds becomes the name of trust for millions of farmers across the country.",
      "A company... that understands the farmer's language. That understands the farmer's needs. That feels the farmer's pain. That stands by the farmer not only in good times, but in every circumstance.",
    ],
    finalLine: "This is my vision. This is my pledge. And this is the soul of Balavan Agro Seeds.",
    imgAlt: "Shri Vajabhai Patel — Founder, Balavan Agro",
  },
};

export default function FounderVision() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.hi;

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, hsl(var(--gold)) 0%, transparent 38%), radial-gradient(circle at 88% 82%, hsl(var(--leaf)) 0%, transparent 42%)",
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-4 top-6 select-none font-heading text-[12rem] leading-none text-white/[0.03] sm:text-[16rem] lg:left-8 lg:top-10"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-2.5 rounded-sm border border-gold/25" aria-hidden />
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src={images.farmer}
                  alt={c.imgAlt}
                  className="aspect-[4/5] w-full"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.32}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent p-5 pt-20">
                  <p className="font-heading text-lg font-600 text-white">{c.name}</p>
                  <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-gold">{c.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision content */}
          <div className="lg:col-span-7 lg:pt-2">
            <p className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.25em] text-gold">
              <span className="h-px w-10 bg-gold/50" />
              {c.eyebrow}
            </p>

            <blockquote className="mt-6">
              <p className="font-heading text-2xl font-500 leading-snug text-white sm:text-3xl lg:text-[2.15rem] text-balance">
                {c.pullQuote}
              </p>
            </blockquote>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-white/75 sm:text-[1.05rem]">
              {c.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Summary box — मेरा एक वाक्य में Vision */}
            <div className="mt-8 rounded-xl border border-gold/25 bg-white/[0.04] p-6">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold/70">{c.summaryLabel}</p>
              <div className="mt-3 space-y-1">
                {c.summaryLines.map((line, i) => (
                  <p key={i} className="font-heading text-lg font-600 text-white sm:text-xl">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Detailed vision */}
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="font-heading text-xl font-600 text-gold sm:text-2xl">{c.detailedTitle}</h3>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-white/75 sm:text-[1.05rem]">
                {c.detailed.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-5 space-y-2 border-l-2 border-gold/40 pl-4">
                {c.beliefChain.map((line, i) => (
                  <p key={i} className="font-600 text-white/85">{line}</p>
                ))}
              </div>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-white/75 sm:text-[1.05rem]">
                {c.closing.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-5 font-heading text-lg font-600 text-gold sm:text-xl">{c.finalLine}</p>
            </div>

            {/* Signature */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gold/50" />
              <div>
                <p className="font-heading text-lg font-600 text-white">{c.name}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/50">{c.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}