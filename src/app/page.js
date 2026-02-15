// main page

import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/layout';
import ResearchSection from '@/components/main/main-research-section';
import PublicationsSection from '@/components/main/main-publications-section';
import NewsSection from '@/components/main/main-news-section';
import ProjectSection from '@/components/main/main-project-section';
import HeroSection from '@/components/main/main-hero-section';

export default function Home() {

  return (
    <Layout>
      <>
        <HeroSection />
      </>

      {/* Welcome Section */}
      <section className="relative z-10 px-6 md:px-20 lg:px-72 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto text-left">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3">Welcome to the AIDAS Lab!</h2>
          <p className="text-base sm:text-lg text-muted leading-snug">
          The AIDAS Lab conducts cutting-edge research in Artificial Intelligence (Machine Learning, Deep Learning, and Generative AI) with a focus on fundamental model architectures, data-intensive systems, and embodied agents. What distinguishes our lab is our integrated approach: we connect innovation in AI model design with system-level optimization and impactful real-world applications. Our research is deeply grounded in practical deployment, with a particular emphasis on transformative applications in the medical and industrial domains. Led by Professor Jaeyoung Do, the AIDAS Lab is committed to pushing the boundaries of what is possible in AI through interdisciplinary and forward-thinking research.
          </p>
        </div>
      </section>
      
      <>
        <ResearchSection />
        <PublicationsSection />
        <NewsSection />
      </>
    </Layout>
  );
}
