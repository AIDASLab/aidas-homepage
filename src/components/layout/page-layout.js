import Layout from "./layout";

export default function PageLayout({ title, children, widthClass = "max-w-5xl" }) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 md:pt-36 lg:pt-[8vh]">
          <div className={`${widthClass} mx-auto`}>
            <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10 sm:mb-12">{title}</h1>
            {children}
          </div>
        </div>
      </Layout>
    );
  }
