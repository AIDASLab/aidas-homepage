import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Header />
      <main className="pt-[132px] sm:pt-[148px] lg:pt-[168px] pb-24 sm:pb-32 md:pb-40 lg:pb-44">
        {children}
      </main>
      <Footer className/>
    </div>
  );
}
