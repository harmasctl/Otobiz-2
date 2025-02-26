import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
}
