import Link from "next/link";

export default function NotFound() {
  return (
    <div className="global w-screen h-screen flex flex-col justify-center items-center">
      <h2 className={"mb-4 text-4xl tracking-tight font-extrabold text-white"}>
        404
      </h2>
      <p>Could not find requested resource</p>
      <Link className={"underline"} href={"/"}>
        Click to redirect home page
      </Link>
    </div>
  );
}
