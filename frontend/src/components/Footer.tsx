import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <div className=" bg-amber-200 flex flex-col items-center justify-between w-full p-5 space-y-5">
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-x-14 items-center">
          {/* logo */}
          <span>
            <p className="text-5xl font-bold">skrappr</p>
          </span>

          {/*  */}
          <div className="flex flex-col space-y-3">
            <Link to={"/"} className="hover:scale-110 transition-all hover:font-bold">
              Home
            </Link>
            <Link to={"/how-to-use"} className="hover:scale-110 transition-all hover:font-bold">
              How to Use
            </Link>
            <Link to={"/about"} className="hover:scale-110 transition-all hover:font-bold">
              About
            </Link>
          </div>
        </div>

        <hr className="border w-full" />
        <span>
          <p className="text-base italic">not for production use</p>
        </span>
      </div>
    </>
  );
}
