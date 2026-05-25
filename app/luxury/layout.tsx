// Minimal layout for the /luxury preview — bypasses the (store) layout's
// Navbar + Footer so InvisibleHeader and AtelierFooter render alone.
export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
