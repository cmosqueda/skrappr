import { Link } from "react-router";
// import { FaSun } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div className="sticky top-0 bg-amber-300 flex flex-row items-center justify-between w-full px-10 py-5">
        <span>
          <p className="font-bold text-2xl">skrappr</p>
        </span>

        <div className="flex flex-row space-x-10 items-center">
          {/* <a href="">Home</a>
          <a href="">How to Use</a>
          <a href="">About</a> */}
          <Link to={"/"} className="hover:scale-110 transition-all hover:font-bold">
            Home
          </Link>
          <Link to={"/how-to-use"} className="hover:scale-110 transition-all hover:font-bold">
            How to Use
          </Link>
          <Link to={"/about"} className="hover:scale-110 transition-all hover:font-bold">
            About
          </Link>

          {/* <button className="text-3xl">
            <FaSun></FaSun>
          </button> */}
        </div>
      </div>
    </>
  );
}
