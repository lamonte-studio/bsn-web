import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  subheader?: React.ReactNode;
  hideNavBorder?: boolean;
};

export default function FullWidthLayout({
  children,
  subheader,
  hideNavBorder = false,
}: Props) {
  return (
    <div>
      <header className="bg-bsn">
        <Header hideNavBorder={hideNavBorder} />
        {subheader}
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
