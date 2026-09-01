import React from "react";
import { images, site } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo {...seoConfig["/privacy-policy"]} />
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How Balavan Agro collects, uses and protects your information." image={images.fieldTexture} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]} />
      </div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-sm text-muted-foreground">Last updated: 1 January 2026</p>
        <div className="mt-8 space-y-8">
          <Section title="1. Introduction">
            <p>This Privacy Policy explains how {site.name} ("we", "us", "our") collects, uses, stores and protects information when you visit our website or contact us. By using this website, you agree to the practices described here.</p>
          </Section>
          <Section title="2. Information We Collect">
            <p>We may collect information you provide directly — such as your name, mobile number, email address, location and message — when you fill out our contact form or otherwise communicate with us. We may also collect basic technical information such as browser type and pages visited, through standard analytics.</p>
          </Section>
          <Section title="3. How We Use Your Information">
            <p>We use the information collected to respond to your enquiries, provide agronomy and product guidance, share updates you have requested, improve our website and services, and comply with legal obligations. We do not sell your personal information to third parties.</p>
          </Section>
          <Section title="4. Data Storage & Security">
            <p>We take reasonable technical and organisational measures to protect your information against unauthorised access, alteration or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
          </Section>
          <Section title="5. Cookies">
            <p>Our website may use cookies and similar technologies to improve your browsing experience. You can control or disable cookies through your browser settings. Disabling cookies may affect some functionality.</p>
          </Section>
          <Section title="6. Third-Party Links">
            <p>This website may contain links to third-party websites (such as social media or video platforms). We are not responsible for the privacy practices or content of those websites and encourage you to review their policies.</p>
          </Section>
          <Section title="7. Your Rights">
            <p>You may request access to, correction of, or deletion of your personal information held by us. To exercise these rights, please contact us using the details below.</p>
          </Section>
          <Section title="8. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised last-updated date. We encourage you to review this page periodically.</p>
          </Section>
          <Section title="9. Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us at {site.email} or {site.phone}.</p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-600 text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}