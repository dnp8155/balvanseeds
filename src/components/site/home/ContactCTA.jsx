import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/siteData";

export default function ContactCTA() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-600 uppercase tracking-[0.2em] text-gold">Get in Touch</p>
            <h2 className="mt-3 font-heading text-3xl font-600 leading-tight sm:text-4xl text-balance">
              Let's find the right seed for your field.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Reach out for varietal selection guidance, agronomy support or partnership enquiries. Our team responds within one business day.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3.5 text-sm font-600 text-primary shadow-lift transition hover:brightness-95 focus-ring"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-5 transition hover:bg-primary-foreground/10 focus-ring">
              <MessageCircle className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs text-primary-foreground/70">WhatsApp</p>
                <p className="text-sm font-600">Chat with us</p>
              </div>
            </a>
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-5 transition hover:bg-primary-foreground/10 focus-ring">
              <Phone className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs text-primary-foreground/70">Call</p>
                <p className="text-sm font-600">{site.phone}</p>
              </div>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-5 transition hover:bg-primary-foreground/10 focus-ring sm:col-span-2">
              <Mail className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs text-primary-foreground/70">Email</p>
                <p className="text-sm font-600">{site.email}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}