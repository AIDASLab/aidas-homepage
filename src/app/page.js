import Head from 'next/head';
import Layout from '../../components/layout';

export default function Home() {
  return (
    <Layout>

        <video
          className="absolute top-0 left-0 w-screen h-screen object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/background/medical-robot-video-temp.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Hero Section with Background Image */}
        <header className="relative h-screen w-full flex items-center justify-center text-center">


          {/* Overlay for better text readability */}
          <div className="absolute inset-0  bg-opacity-0"></div>

          {/* Content */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h2 className="text-5xl sm:text-6xl font-black mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              SNU AIDAS Lab
            </h2>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto font-semibold drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
              We conduct pioneering research on AI (ML/DL/GenAI) technologies from fundamental algorithmic, big data-driven system, and healthcare application perspectives.
            </p>
          </div>

        </header>



        {/* Research Areas Section */}
        <section className="relative z-10 px-6 md:px-20 lg:px-80 py-24 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-12">Research</h2>

            {/* CoreAI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              {/* Image */}
              <div className="order-1 md:order-none">
                <img src="/background/random_figure2.png" alt="CoreAI Research" className="w-full rounded-lg shadow-lg" />
              </div>
              {/* Text */}
              <div className="text-left md:text-right">
                <h3 className="text-3xl font-bold mb-4">CoreAI</h3>
                <p className="text-gray-700">
                  Focuses on cutting-edge generative AI algorithms, including text-based LLMs, vision-text LVLMs, and multi-modal LMs, pushing advancements in the latest AI models.
                </p>
              </div>
            </div>

            {/* SysAI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              {/* Text */}
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-4">SysAI</h3>
                <p className="text-gray-700">
                  Explores AI integration into big data systems (from SW/HW perspectives), applying AI to various components, and designing systems for accelerating AI models, driving innovation in system architecture and efficiency.
                </p>
              </div>
              {/* Image */}
              <div>
                <img src="/background/random_figure2.png" alt="SysAI Research" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>

            {/* MedAI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="order-1 md:order-none">
                <img src="/background/random_figure2.png" alt="MedAI Research" className="w-full rounded-lg shadow-lg" />
              </div>
              {/* Text */}
              <div className="text-left md:text-right">
                <h3 className="text-3xl font-bold mb-4">MedAI</h3>
                <p className="text-gray-700">
                  Leverages AI to analyze real-world healthcare data, aiming to enhance diagnostics, treatment, and patient outcomes through innovative AI-driven solutions in medical applications.
                </p>
              </div>
            </div>

          </div>
        </section>



    </Layout>
  );
}
