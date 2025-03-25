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

          </div>
        </section>
        



    </Layout>
  );
}
