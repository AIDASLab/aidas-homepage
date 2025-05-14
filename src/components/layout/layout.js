import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Header />
      <main className="pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-36 sm:pb-44 md:pb-52 lg:pb-60">
        {children}
      </main>
      <Footer className/>
    </div>
  );
}
