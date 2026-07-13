import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { DashboardMockup } from '../components/landing/DashboardMockup';
import { TrustedClients } from '../components/landing/TrustedClients';
import { FeaturesBento } from '../components/landing/FeaturesBento';
import { StepsSection } from '../components/landing/StepsSection';
import { LargeDashboardFeature } from '../components/landing/LargeDashboardFeature';
import { PricingPreview } from '../components/landing/PricingPreview';
import { CustomerStories } from '../components/landing/CustomerStories';
import { FinalCTA } from '../components/landing/FinalCTA';
import { SeoAbout } from '../components/landing/SeoAbout';
import { FaqSection } from '../components/landing/FaqSection';
import { ScrollReveal } from '../components/landing/ScrollReveal';

export const Home: React.FC = () => {
  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      <ScrollReveal direction="down"><HeroSection /></ScrollReveal>
      <ScrollReveal><DashboardMockup /></ScrollReveal>
      <ScrollReveal><TrustedClients /></ScrollReveal>
      <ScrollReveal><FeaturesBento /></ScrollReveal>
      <ScrollReveal><StepsSection /></ScrollReveal>
      <ScrollReveal><LargeDashboardFeature /></ScrollReveal>
      <ScrollReveal><PricingPreview /></ScrollReveal>
      <ScrollReveal><CustomerStories /></ScrollReveal>
      <ScrollReveal><FinalCTA /></ScrollReveal>
      <ScrollReveal><SeoAbout /></ScrollReveal>
      <ScrollReveal><FaqSection /></ScrollReveal>
    </div>
  );
};
