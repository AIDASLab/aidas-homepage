import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[132px] sm:pt-[148px] lg:pt-[168px] pb-12 sm:pb-14 md:pb-16 lg:pb-16">
        {children}
      </main>
      <Footer className/>
    </div>
  );
}
