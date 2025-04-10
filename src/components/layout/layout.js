import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Header />
      <main className="pt-[140px] sm:pt-[160px] lg:pt-[180px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
