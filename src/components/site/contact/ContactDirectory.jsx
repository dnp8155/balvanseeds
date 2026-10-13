import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function ContactDirectory() {
  const { tc } = useLanguage();
  const directory = [
    { icon: Phone, label: "Call", value: site.phone, href: `tel:${site.phoneHref}` },
    { icon: MessageCircle, label: "WhatsApp", value: tc("Chat with our team"), href: whatsappLink("Hello, I would like to know more about Balvanagro Seeds."), external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Visit", value: site.address }, { icon: Clock, label: "Business Hours", value: site.hours },
  ];
  return <div><h2 className="font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">{tc("We're here to help your crop succeed.")}</h2><p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{tc("From variety selection and cultivation guidance to dealership and certification queries — the Balvanagro team is ready to assist.")}</p>
    <ul className="mt-10 border-t border-border">{directory.map(({ icon: Icon, label, value, href, external }) => <li key={label} className="border-b border-border py-4">{React.createElement(href ? "a" : "div", { href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined, className: "group flex items-start gap-4 transition hover:text-primary" }, <><Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><p className="text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc(label)}</p><p className="mt-1 text-sm font-500 text-foreground">{value}</p></div>{external && <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground" />}</>)}</li>)}</ul>
  </div>;
}