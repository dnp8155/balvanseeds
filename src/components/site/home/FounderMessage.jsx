import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTENT = {
  hi: {
    eyebrow: "संस्थापक का संदेश",
    pullQuote: "मैं किसान का बेटा हूँ — और शायद यही मेरी सबसे बड़ी पहचान है।",
    body1:
      "बीज कोई साधारण उत्पाद नहीं। बीज किसान का विश्वास है, उम्मीद है — उसके भविष्य की पहली नींव है। जब कोई किसान बीज बोता है, तो वह अपनी मेहनत, अपने सपने और अपने परिवार का कल उस एक बीज में सौंप देता है।",
    body2:
      "मेरा सपना बस इतना है — जब किसान Balavan का बीज बोए, तो उसके मन में एक विश्वास हो:",
    belief: "Balavan मेरे साथ है।",
    chainLabel: "मेरा दृष्टिकोण",
    chain: [
      { word: "किसान", sub: "मजबूत" },
      { word: "खेत", sub: "मजबूत" },
      { word: "गाँव", sub: "मजबूत" },
      { word: "भारत", sub: "मजबूत" },
    ],
    vision:
      "किसान के घर से निकला हूँ, इसलिए किसान के सपनों को समझता हूँ। मेरा जीवन का उद्देश्य है कि हर किसान को ऐसा बीज और ऐसा भरोसा मिले, जिससे उसकी मेहनत एक बेहतर भविष्य में बदल सके।",
    name: "श्री वज़भाई पटेल",
    role: "संस्थापक · Balavan Agro Seeds",
    imgAlt: "श्री वज़भाई पटेल — संस्थापक, Balavan Agro",
  },
  en: {
    eyebrow: "Founder's Message",
    pullQuote: "I am a farmer's son — and perhaps that is my greatest identity.",
    body1:
      "A seed is no ordinary product. A seed is a farmer's trust, his hope — the first foundation of his future. When a farmer sows a seed, he entrusts his labour, his dreams and his family's tomorrow to that single seed.",
    body2: "My dream is simply this — when a farmer sows Balavan's seed, a conviction should stir in his heart:",
    belief: "Balavan stands with me.",
    chainLabel: "My Conviction",
    chain: [
      { word: "Farmer", sub: "strong" },
      { word: "Field", sub: "strong" },
      { word: "Village", sub: "strong" },
      { word: "India", sub: "strong" },
    ],
    vision:
      "I come from a farmer's home, so I understand a farmer's dreams. My life's purpose is that every farmer receives such seed and such trust that his labour transforms into a better future.",
    name: "Shri Vajabhai Patel",
    role: "Founder · Balavan Agro Seeds",
    imgAlt: "Shri Vajabhai Patel — Founder, Balavan Agro",
  },
};

export default function FounderMessage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.hi;

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      {/* subtle warm texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, hsl(var(--gold)) 0%, transparent 38%), radial-gradient(circle at 88% 82%, hsl(var(--leaf)) 0%, transparent 42%)",
        }}
        aria-hidden
      />

      {/* large decorative quotation mark */}
      <span
        className="pointer-events-none absolute left-4 top-6 select-none font-heading text-[12rem] leading-none text-white/[0.03] sm:text-[16rem] lg:left-8 lg:top-10"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait column */}
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

          {/* Message column */}
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
              <p>{c.body1}</p>
              <p>
                {c.body2}{" "}
                <span className="font-600 text-gold">{c.belief}</span>
              </p>
            </div>

            {/* The chain — किसान → खेत → गाँव → भारत */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40">{c.chainLabel}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
                {c.chain.map((item, i) => (
                  <React.Fragment key={item.word}>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-xl font-600 text-white sm:text-2xl">{item.word}</span>
                      <span className="font-heading text-xl font-600 text-gold sm:text-2xl">{item.sub}</span>
                    </div>
                    {i < c.chain.length - 1 && (
                      <span className="text-lg text-gold/45" aria-hidden>
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-6 max-w-xl border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-white/55 sm:text-[0.95rem]">
                {c.vision}
              </p>
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