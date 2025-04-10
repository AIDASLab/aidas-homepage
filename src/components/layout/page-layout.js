import Layout from "./layout";


export default function PageLayout({ title, children }) {
    return (
        <Layout className>
            <div className="min-h-screen flex flex-col">
                <div className="relative flex justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-40 md:pt-60 lg:pt-[10vh]">
                    <div className="w-full max-w-5xl">
                        <h1 className="text-4xl font-bold text-center mb-20">{title}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
