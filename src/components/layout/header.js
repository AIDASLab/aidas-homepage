
import TopBar from './topbar';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function Header() {

  // Menu items array
  const menuItems = [
    { name: 'Publications', href: '/publications' },
    { name: 'People', href: '/people' },
    { name: 'News', href: '/news' },
    { name: 'Seminar', href: '/seminar' },
    { name: 'Project', href: '/project' },
    { name: 'Contact', href: '/contact' },
    { name: 'Join', href: '/join' },
  ];

  return (
    <>
      {/* Top bar */}
      <TopBar />

      {/* Header */}
      {/* show DesktopHeader on md+ only */}
      <div className="hidden md:block">
        <DesktopHeader menuItems={menuItems}/>
      </div>

      {/* show MobileHeader below md only */}
      <div className="block md:hidden">
        <MobileHeader menuItems={menuItems}/>
      </div>
    </>
  );
}
