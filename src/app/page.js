import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/layout';
import ResearchSection from '@/components/main/main-research-section';
import PublicationsSection from '@/components/main/main-publications-section';
import NewsSection from '@/components/main/main-news-section';
import ProjectSection from '@/components/main/main-project-section';

export default function Home() {

  return (
    <Layout>

      <div className="relative w-full h-[50vh] mt-12 sm:mt-16 md:mt-20">
        <Image
          src="/background/snu-night.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

        {/* Welcome Section */}
        <section className="relative z-10 px-6 md:px-20 lg:px-80 py-24">
          <div className="max-w-6xl mx-auto text-left">
            <h2 className="text-4xl font-extrabold mb-6">Welcome to the AIDAS Lab!</h2>
            <p className="text-base sm:text-lg md:text-l lg:text-xl text-themegray-100 leading-relaxed">
            We conduct pioneering research on AI (ML/DL/GenAI) technologies from fundamental algorithmic, big data-driven system, and healthcare application perspectives. We are dedicated to advancing these fields through innovative approaches that push the boundaries of what’s possible.
            </p>

          </div>
        </section>

        <>
          <ResearchSection />
          <PublicationsSection />
          <ProjectSection />
          <NewsSection />
        </>


    </Layout>
  );
}
