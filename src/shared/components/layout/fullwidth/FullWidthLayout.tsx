import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  subheader?: React.ReactNode;
};

export default function FullWidthLayout({ children, subheader }: Props) {
  return (
    <div>
      <header className="bg-bsn">
        <Header />
        {subheader}
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
