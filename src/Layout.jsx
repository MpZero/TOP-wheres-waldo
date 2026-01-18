import { Outlet, Link } from "react-router";

export default function Layout() {
  return (
    <>
      <main className="p-0.5">
        <Outlet />
      </main>
      <footer className=" p-0.5text-center bg-white border-double border-12 border-red-500 lg:col-start-1 col-end-7  ">
        © 2025 Coded by
        <a
          href="https://github.com/MpZero"
          className="text-red-500 hover:text-red-300"
        >
          {" "}
          Gonzalo Gomez
        </a>
      </footer>
    </>
  );
}
