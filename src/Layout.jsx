import { Outlet, Link } from "react-router";
import { useNavigate } from "react-router";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh p-0.5 flex flex-col bg-sky-400 text-nowrap text-xs md:text-xl lg:text-2xl xl:text-4xl">
      <main className="flex flex-1 flex-col">
        <Outlet context={{ navigate }} />
      </main>
      <footer className="flex justify-center py-0.5 gap-1 bg-white border-double border-12 border-red-500">
        <p>© 2026 Coded by</p>
        <a
          href="https://github.com/MpZero"
          className="text-red-500 hover:text-red-400"
        >
          Gonzalo Gomez
        </a>
      </footer>
    </div>
  );
}
