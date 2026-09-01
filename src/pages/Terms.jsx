import React from "react";
import { images, site } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function Terms() {
  return (
    <>
      <Seo {...seoConfig["/terms"]} />
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="The terms governing your use of the Balavan Agro website." image={images.fieldTexture} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]} />
      </div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-sm text-muted-foreground">Last updated: 1 January 2026</p>
        <div className="mt-8 space-y-8">
          <Section title="1. Acceptance of Terms">
            <p>By accessing and using this website operated by {site.name} ("we", "us", "our"), you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the website.</p>
          </Section>
          <Section title="2. Use of the Website">
            <p>This website provides information about our company, seed varieties, certifications and related content. You agree to use the website lawfully and not to misuse, disrupt or attempt to gain unauthorised access to any part of it.</p>
          </Section>
          <Section title="3. Intellectual Property">
            <p>All content on this website — including text, images, logos, variety names, brochures and design — is the property of {site.name} or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute or exploit any content without prior written permission.</p>
          </Section>
          <Section title="4. Product Information">
            <p>Information about seed varieties, characteristics, yields and agronomy is provided in good faith based on our research and field observations. Actual performance may vary depending on soil, climate, management and other factors. We recommend consulting our agronomy team for guidance specific to your conditions.</p>
          </Section>
          <Section title="5. No E-Commerce">
            <p>This website is an informational corporate portfolio. It does not offer online purchase, cart, payment, or order-tracking functionality. For seed availability and enquiries, please contact us directly.</p>
          </Section>
          <Section title="6. Third-Party Links & Content">
            <p>The website may link to or embed third-party content (such as video platforms). We are not responsible for the accuracy or availability of such third-party content.</p>
          </Section>
          <Section title="7. Limitation of Liability">
            <p>To the fullest extent permitted by law, {site.name} shall not be liable for any direct, indirect, incidental or consequential damages arising from your use of, or inability to use, this website or reliance on any information provided here.</p>
          </Section>
          <Section title="8. Changes to Terms">
            <p>We may update these Terms & Conditions at any time. Continued use of the website after changes constitutes acceptance of the revised terms.</p>
          </Section>
          <Section title="9. Governing Law">
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at Ahmedabad, Gujarat.</p>
          </Section>
          <Section title="10. Contact">
            <p>For questions about these Terms & Conditions, please contact us at {site.email} or {site.phone}.</p>
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