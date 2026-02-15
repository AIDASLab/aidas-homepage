// main page

import Layout from '@/components/layout/layout';
import ResearchSection from '@/components/main/main-research-section';
import PublicationsSection from '@/components/main/main-publications-section';
import NewsSection from '@/components/main/main-news-section';
import HeroSection from '@/components/main/main-hero-section';

export default function Home() {

  return (
    <Layout>
      <>
        <HeroSection />
      </>

      {/* Welcome Section */}
      <section className="relative z-10 px-5 py-12 sm:px-8 sm:py-14 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Welcome</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl">AIDAS Lab</h2>
            </div>
            <div className="border-l-2 border-slate-200 pl-5">
              <p className="mt-2 text-base leading-relaxed text-slate-700 sm:text-lg">
                The AIDAS Lab conducts cutting-edge research in Artificial Intelligence with a focus on fundamental model architectures, data-intensive systems, and embodied agents. What distinguishes our lab is our integrated approach: we connect innovation in AI model design with system-level optimization and impactful real-world applications. Our research is deeply grounded in practical deployment, with a particular emphasis on transformative applications in the medical and industrial domains. Led by Professor Jaeyoung Do, the AIDAS Lab is committed to pushing the boundaries of what is possible in AI through interdisciplinary and forward-thinking research.
              </p>
            </div>
          </div>
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
