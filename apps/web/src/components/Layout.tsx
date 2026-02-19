import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import EventCircularModal from "./EventCircularModal";
import RegistrationBanner from "./RegistrationBanner";
import RegistrationFAB from "./RegistrationFAB";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EBE3D5" }}>
      <EventCircularModal />
      <RegistrationBanner />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50"
      >
        Pular para o conteúdo principal
      </a>
      <Header />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <RegistrationFAB />
      <Footer />
    </div>
  );
}
