import Layout from "./layout";

export default function PageLayout({ title, children }) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-40 md:pt-60 lg:pt-[10vh]">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-20">{title}</h1>
            {children}
          </div>
        </div>
      </Layout>
    );
  }