import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[200px_1fr] grid-rows-[auto_1fr_auto] min-h-screen">
      <header className="sticky z-10 top-0 border-b bg-background/20 backdrop-blur-xs col-span-2 p-2">
        <Navbar />
      </header>
      <aside className="border-r p-4 hidden md:block">
        <section className="sticky top-12">
          <Sidebar />
        </section>
      </aside>
      <main className="p-4">{children}</main>
      <footer className="col-span-2 border-t py-10 px-4 h-fit">
        <section className="container mx-auto">here goes the footer</section>
      </footer>
    </section>
  );
}
