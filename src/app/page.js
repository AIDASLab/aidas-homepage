import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';

export default function Home() {

  return (
    <Layout>

      <div className="relative w-full h-[30vh] mt-40 sm:mt-44 md:mt-38">
        <Image
          src="/background/snu-night.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>



        {/* Research Areas Section */}
        <section className="relative z-10 px-6 md:px-20 lg:px-80 py-24 bg-white">
          <div className="max-w-6xl mx-auto text-left">
            <h2 className="text-4xl font-extrabold mb-6">Welcome to the AIDAS Lab!</h2>
            <p className='text-gray-700'>
            We conduct pioneering research on AI (ML/DL/GenAI) technologies from fundamental algorithmic, big data-driven system, and healthcare application perspectives. We are dedicated to advancing these fields through innovative approaches that push the boundaries of what’s possible.
            </p>

            {/* CoreAI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 mt-20">
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
