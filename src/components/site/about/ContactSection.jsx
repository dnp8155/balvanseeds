import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { site, whatsappLink, images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ContactSectionForm from "./ContactSectionForm";

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function ContactSection() {
  const { tc } = useLanguage();
  const vp = { once: true, margin: "-80px" };
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* ── Main editorial composition ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* LEFT — Message + contact methods + office */}
          <div className="lg:col-span-4">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0)}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-gold">{tc("Get in Touch")}</span>
              </div>
            </motion.div>

            <motion.h2 initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.1)}
              className="mt-5 font-heading text-4xl font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.2rem] text-balance">
              {tc("Let's Grow")}<br />
              <span className="text-leaf">{tc("Together")}</span>
            </motion.h2>

            <motion.p initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.2)}
              className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {tc("Have a question, need guidance, or looking for the right seeds? We're here to help. Connect with our team and let's build a brighter tomorrow, together.")}
            </motion.p>

            {/* Contact methods — one elegant directory */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.3)} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="sm:pr-5 sm:border-r sm:border-border pb-5 sm:pb-0">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-leaf" strokeWidth={1.5} />
                    <span className="text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc("Call Us")}</span>
                  </div>
                  <a href={`tel:${site.phoneHref}`} className="mt-2 block text-sm font-600 text-foreground transition hover:text-primary">{site.phone}</a>
                </div>
                <div className="sm:px-5 sm:border-r sm:border-border pb-5 sm:pb-0 pt-5 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-leaf" strokeWidth={1.5} />
                    <span className="text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc("WhatsApp")}</span>
                  </div>
                  <a href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-600 text-foreground transition hover:text-primary">{tc("Chat with our team")}</a>
                </div>
                <div className="sm:pl-5 pt-5 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-leaf" strokeWidth={1.5} />
                    <span className="text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc("Email Us")}</span>
                  </div>
                  <a href={`mailto:${site.email}`} className="mt-2 block text-sm font-600 text-foreground transition hover:text-primary break-words">{site.email}</a>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Office visit */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.4)}>
              <p className="text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc("Or Visit Our Office")}</p>
              <p className="mt-3 font-heading text-lg font-400 text-foreground">{site.name} Seeds Pvt. Ltd.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{site.address}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                {tc("Get Directions")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>

              <div className="mt-6 flex items-start gap-2 border-t border-border pt-4">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc("Office Hours")}</p>
                  <p className="mt-1 text-sm text-foreground">{site.hours}</p>
                </div>
              </div>
            </motion.div>

            {/* Handwritten note */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.5)} className="mt-8">
              <p className="font-heading text-base italic text-leaf">{tc("Good Seeds. Brighter Futures.")}</p>
              <svg width="100" height="8" viewBox="0 0 100 8" fill="none" className="mt-1 text-gold">
                <path d="M2 5 Q 25 1, 50 4 T 98 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </motion.div>
          </div>

          {/* CENTER — Arched agricultural image */}
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.15)}
            className="relative overflow-hidden rounded-t-[4rem] rounded-b-2xl lg:col-span-3 lg:-my-4">
            <Image
              src={images.fieldTexture}
              alt="A farmer's hand tending to young seedlings in natural soil"
              className="aspect-[3/4] w-full object-cover"
              fittingType="fill"
              focalPointX={0.5}
              focalPointY={0.4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
            <div className="absolute bottom-6 left-5 right-5">
              <span className="font-heading text-3xl leading-none text-gold">&ldquo;</span>
              <p className="mt-1 font-heading text-lg italic leading-tight text-white sm:text-xl">
                {tc("We're just a message away")}<br />
                {tc("to support your journey.")}
              </p>
              <p className="mt-3 text-[10px] font-600 uppercase tracking-[0.15em] text-white/70">— {tc("Team Balavan Agro")}</p>
            </div>
          </motion.div>

          {/* RIGHT — Contact form */}
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.2)} className="lg:col-span-5 lg:border-l lg:border-border lg:pl-8">
            <p className="text-[10px] font-600 uppercase tracking-[0.2em] text-gold">{tc("Send Us a Message")}</p>
            <h3 className="mt-3 font-heading text-2xl font-400 text-foreground sm:text-3xl">{tc("We'd Love to Hear from You")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tc("Fill in the details and our team will get back to you soon.")}</p>
            <div className="mt-6">
              <ContactSectionForm />
            </div>
          </motion.div>
        </div>

        {/* ── Map ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.1)} className="mt-16 lg:mt-20">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-[11px] font-600 uppercase tracking-[0.15em] text-foreground">{tc("Find Us on Map")}</span>
            </div>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-xs font-600 text-primary transition hover:gap-2.5">
              {tc("View Larger Map")} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative mt-4 overflow-hidden border border-border rounded-md bg-card">
            {!mapLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="mt-2 font-heading text-lg text-foreground">{site.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{tc("Verified Location")}</p>
                <p className="mt-1 max-w-xs text-xs text-muted-foreground">{site.addressShort}</p>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                  {tc("View on Google Maps")} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
            <iframe
              title="Balavan Agro Seeds location map"
              src={mapSrc}
              className={`relative h-[360px] w-full border-0 transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onLoad={() => setMapLoaded(true)}
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}