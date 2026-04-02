"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

type Props = {
  initialBrands: any[];
};

export default function HeaderClient({ initialBrands }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header>
      <AnnouncementBanner />
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
      <BottomNav Menu={menuOpen} OpenMenu={(open) => setMenuOpen(Boolean(open))} initialBrands={initialBrands} />
    </header>
  );
}

