import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { HeartHandshake, Sprout, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

const CONTENT = {
  en: {
    eyebrow: "Founder & Owner's Vision",
    name: "Shri Vajabhai Patel",
    role: "Founder · Balvan Agro Seeds",
    pullQuote: "“I am a farmer's son... and perhaps that is my greatest identity.”",
    section1: {
      badge: "SECTION 01",
      title: "The Sacred Trust of a Seed",
      p1: "Since childhood, I have watched farmers pour their sweat and soul into the soil—reaching the fields long before sunrise and returning home only after dusk has fallen.",
      p2: "I learned early on that a farmer does not merely sow a seed in the ground; he sows his children's dreams, his family's hopes, and an entire year of tireless labour.",
      p3: "When a farmer cradles a seed in his hand, he does not see merely a single grain... he sees his standing harvest, the happiness of his family, and the dream of his tomorrow.",
      pillarsTitle: "That is why, to me, a seed is never an ordinary product:",
      pillars: [
        "A seed is the farmer's trust.",
        "A seed is the farmer's hope.",
        "A seed is the very first foundation of his future."
      ]
    },
    section2: {
      badge: "SECTION 02",
      title: "The Genesis of Balvan & Our Eternal Pledge",
      p1: "This very sentiment became the driving purpose behind the birth of Balvan Agro Seeds. My dream was never simply to build a big company.",
      pledgeContext: "My true dream has always been that whenever a farmer sows our seeds in his field, an unwavering conviction stirs in his heart:",
      pledge: "“Balvan stands with me.”",
      p2: "I resolve that no farmer should ever have to wander or struggle in search of high-quality seeds. He must receive pure, dependable, and superior-grade seeds at the right time.",
      closing: "And when he watches his lush green crops sway across the field, the proud smile on his face should reflect our shared dedication and hard work."
    },
    imgAlt: "Shri Vajabhai Patel — Founder, Balvan Agro Seeds"
  },
  hi: {
    eyebrow: "संस्थापक का विज़न",
    name: "श्री वजाभाई पटेल",
    role: "संस्थापक · Balvan Agro Seeds",
    pullQuote: "“मैं किसान का बेटा हूँ... और शायद यही मेरी सबसे बड़ी पहचान है।”",
    section1: {
      badge: "सेक्शन 01",
      title: "बीज किसान का विश्वास है",
      p1: "मैंने बचपन से किसान को मिट्टी में पसीना बहाते देखा है। सुबह सूरज निकलने से पहले खेत में पहुँचना और शाम ढलने के बाद घर लौटना देखा है।",
      p2: "मैंने देखा है कि किसान सिर्फ खेत में बीज नहीं बोता वह उसमें अपने बच्चों के सपने, अपने परिवार की उम्मीद और अपने पूरे साल की मेहनत बोता है।",
      p3: "एक किसान जब अपने हाथ में बीज लेता है, तो वह केवल एक दाना नहीं देखता... वह उसमें अपनी फसल, अपने परिवार की खुशियाँ और अपने आने वाले कल का सपना देखता है।",
      pillarsTitle: "इसीलिए मेरे लिए बीज कोई साधारण उत्पाद नहीं है:",
      pillars: [
        "बीज किसान का विश्वास है।",
        "बीज किसान की उम्मीद है।",
        "बीज उसके भविष्य की पहली नींव है।"
      ]
    },
    section2: {
      badge: "सेक्शन 02",
      title: "बलवान एग्रो की शुरुआत और हमारा संकल्प",
      p1: "यही भावना बलवान एग्रो सीड्स की शुरुआत का कारण बनी। मेरा सपना कभी सिर्फ एक बड़ी कंपनी बनाने का नहीं था।",
      pledgeContext: "मेरा सपना था कि किसान जब हमारे बीज को अपने खेत में बोए, तो उसके मन में एक विश्वास हो –",
      pledge: "“बलवान मेरे साथ है।”",
      p2: "मैं चाहता हूँ कि किसान को अच्छी गुणवत्ता के बीज के लिए भटकना न पड़े। उसे शुद्ध, विश्वसनीय और बेहतर गुणवत्ता वाला बीज सही समय पर मिले।",
      closing: "और जब वह अपनी फसल को खेत में लहलहाता हुआ देखे, तो उसके चेहरे की मुस्कान में हमारी मेहनत भी दिखाई दे।"
    },
    imgAlt: "श्री वजाभाई पटेल — संस्थापक, Balvan Agro Seeds"
  },
  gu: {
    eyebrow: "સ્થાપકનું વિઝન",
    name: "શ્રી વજભાઈ પટેલ",
    role: "સ્થાપક · Balvan Agro Seeds",
    pullQuote: "“હું ખેડૂતનો દીકરો છું... અને કદાચ એ જ મારી સૌથી મોટી ઓળખ છે.”",
    section1: {
      badge: "વિભાગ 01",
      title: "બીજ ખેડૂતનો પવિત્ર વિશ્વાસ",
      p1: "મેં બાળપણથી જ ખેડૂતને માટીમાં પરસેવો પાડતા જોયો છે. સવારે સૂર્ય ઊગતા પહેલા ખેતરે પહોંચવું અને સાંજ પડ્યા પછી ઘેર પાછા ફરવું જોયું છે.",
      p2: "મેં જોયું છે કે ખેડૂત માત્ર ખેતરમાં બીજ નથી વાવતો — તે તેમાં પોતાના બાળકોના સપના, પોતાના પરિવારની આશા અને આખા વર્ષની મહેનત વાવે છે.",
      p3: "એક ખેડૂત જ્યારે હાથમાં બીજ લે છે, ત્યારે તે માત્ર એક દાણો નથી જોતો... તે તેમાં પોતાના પાક, પરિવારની ખુશીઓ અને આવતીકાલનું સપનું જુએ છે.",
      pillarsTitle: "એટલે જ મારા માટે બીજ કોઈ સાધારણ ઉત્પાદન નથી:",
      pillars: [
        "બીજ ખેડૂતનો વિશ્વાસ છે.",
        "બીજ ખેડૂતની આશા છે.",
        "બીજ તેના ભવિષ્યનો પહેલો પાયો છે."
      ]
    },
    section2: {
      badge: "વિભાગ 02",
      title: "બલવનની શરૂઆત અને અમારો અખંડ સંકલ્પ",
      p1: "આ જ ભાવના બલવન એગ્રો સીડ્સની શરૂઆતનું કારણ બની. મારું સપનું કદી માત્ર એક મોટી કંપની બનવાનું નહોતું.",
      pledgeContext: "મારું સપનું હતું કે ખેડૂત જ્યારે અમારું બીજ પોતાના ખેતરમાં વાવે, ત્યારે તેના મનમાં એક અડગ વિશ્વાસ જાગે –",
      pledge: "“બલવન મારી સાથે છે.”",
      p2: "હું ઈચ્છું છું કે ખેડૂતને સારી ગુણવત્તાના બીજ માટે ભટકવું ન પડે. તેને શુદ્ધ, વિશ્વસનીય અને શ્રેષ્ઠ ગુણવત્તાવાળા બીજ યોગ્ય સમયે મળે.",
      closing: "અને જ્યારે તે પોતાના પાકને ખેતરમાં લહેરાતો જુએ, ત્યારે તેના ચહેરાનું સ્મિત અમારી સહિયારી મહેનતને પણ સાર્થક કરે."
    },
    imgAlt: "શ્રી વજભાઈ પટેલ — સ્થાપક, Balvan Agro Seeds"
  }
};

export default function FounderVision() {
  const { lang } = useLanguage();
  const c = CONTENT[lang] || CONTENT.en;

  return (
    <section id="owner-vision" className="relative overflow-hidden bg-[#0e1713] text-white py-20 lg:py-28 border-t border-b border-white/5">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Founder Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-600 uppercase tracking-widest text-gold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span>{c.eyebrow}</span>
          </div>

          <h2 className="mt-4 font-heading text-2xl font-600 tracking-wide text-white sm:text-3xl lg:text-4xl">
            {c.name}
          </h2>
          <p className="mt-1 text-sm font-500 uppercase tracking-wider text-emerald-400">
            {c.role}
          </p>

          {/* Main Pull Quote Banner */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/60 via-charcoal to-emerald-950/60 p-6 sm:p-8 shadow-xl">
            <div className="absolute -left-2 -top-4 font-heading text-7xl font-700 text-gold/15 select-none leading-none">
              “
            </div>
            <p className="relative z-10 font-heading text-xl font-500 italic leading-relaxed text-gold sm:text-2xl lg:text-3xl text-balance">
              {c.pullQuote}
            </p>
          </div>
        </div>

        {/* 2-Section Grid with Center Founder Portrait */}
        <div className="mt-12 lg:mt-16 grid gap-8 lg:grid-cols-12 lg:gap-6 items-stretch">
          
          {/* ══════ SECTION 1 ══════ */}
          <div className="lg:col-span-4 relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/[0.04] shadow-lg">
            <div className="absolute top-0 left-8 -translate-y-1/2 rounded-full border border-gold/40 bg-[#16251c] px-3.5 py-1 text-[11px] font-700 uppercase tracking-widest text-gold shadow-md flex items-center gap-1.5">
              <Sprout className="h-3.5 w-3.5" />
              <span>{c.section1.badge}</span>
            </div>

            <div>
              <h3 className="mt-2 font-heading text-xl font-600 text-white sm:text-2xl leading-snug">
                {c.section1.title}
              </h3>

              <div className="mt-5 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-white/80">
                <p>{c.section1.p1}</p>
                <p>{c.section1.p2}</p>
                <p>{c.section1.p3}</p>
              </div>

              {/* Pillars Box */}
              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-600 uppercase tracking-wider text-gold">
                  {c.section1.pillarsTitle}
                </p>
                <ul className="mt-3 space-y-2">
                  {c.section1.pillars.map((pillar, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-500 text-white/95">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="font-600 uppercase tracking-wider">Foundation</span>
              <span>100% Farmer-Centric</span>
            </div>
          </div>

          {/* ══════ FOUNDER PORTRAIT (CENTER) ══════ */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-between rounded-2xl border-2 border-gold/40 bg-gradient-to-b from-[#182a20] via-charcoal to-[#0e1713] p-6 shadow-2xl text-center overflow-hidden">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-2 border-gold/50 shadow-xl">
              <img
                src="/images/founder.jpg"
                alt={c.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="inline-block rounded-full bg-gold px-3.5 py-1 text-[11px] font-700 uppercase tracking-widest text-charcoal shadow-md">
                  Founder & Visionary
                </span>
              </div>
            </div>

            <div className="mt-5 w-full">
              <h3 className="font-heading text-2xl font-600 text-white sm:text-3xl">
                {c.name}
              </h3>
              <p className="text-xs sm:text-sm font-500 uppercase tracking-wider text-emerald-400 mt-1">
                {c.role}
              </p>
              <p className="text-xs text-white/60 mt-1">
                Tharad, Banaskantha, Gujarat
              </p>

              <div className="mt-4 border-t border-white/10 pt-4 text-xs italic text-gold/90 leading-relaxed">
                {c.pullQuote}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-white/50">
              <span className="font-600">Pure Seeds</span>
              <span className="text-gold font-600">Farmer's Trust</span>
              <span className="font-600">Nation's Pride</span>
            </div>
          </div>

          {/* ══════ SECTION 2 ══════ */}
          <div className="lg:col-span-4 relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.04] shadow-lg">
            <div className="absolute top-0 left-8 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-[#16251c] px-3.5 py-1 text-[11px] font-700 uppercase tracking-widest text-emerald-400 shadow-md flex items-center gap-1.5">
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>{c.section2.badge}</span>
            </div>

            <div>
              <h3 className="mt-2 font-heading text-xl font-600 text-white sm:text-2xl leading-snug">
                {c.section2.title}
              </h3>

              <div className="mt-5 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-white/80">
                <p>{c.section2.p1}</p>
                <p className="text-white/70 italic text-xs sm:text-sm">{c.section2.pledgeContext}</p>
              </div>

              {/* Highlighted Pledge Banner */}
              <div className="my-5 rounded-xl border-2 border-gold/40 bg-gradient-to-r from-gold/10 via-emerald-950/40 to-gold/10 p-4 text-center shadow-md">
                <p className="font-heading text-xl sm:text-2xl font-700 tracking-wide text-gold">
                  {c.section2.pledge}
                </p>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-white/80">
                <p>{c.section2.p2}</p>
                <p className="font-500 text-emerald-300/90 text-xs sm:text-sm">{c.section2.closing}</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="font-600 uppercase tracking-wider">Quality · Purity</span>
              <span className="text-gold font-600">Our Eternal Promise</span>
            </div>
          </div>

        </div>

        {/* Bottom Founder Signature & Credibility Badge */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold shadow-md">
              <Image
                src={images.farmer}
                alt={c.imgAlt}
                className="h-full w-full object-cover"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.35}
              />
            </div>
            <div>
              <p className="font-heading text-lg font-600 text-white sm:text-xl">
                {c.name}
              </p>
              <p className="text-xs sm:text-sm text-gold font-500">
                {c.role}
              </p>
              <p className="text-xs text-white/50 mt-0.5">
                Tharad, Banaskantha, Gujarat · Serving Farmers Across India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/70 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
            <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
            <span>Pure Seeds · Strong Farmers · Prosperous Nation</span>
          </div>
        </div>

      </div>
    </section>
  );
}