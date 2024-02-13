import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    let timer = null;

    timer = setTimeout(() => {
      router.push(`/library`);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="global w-screen h-screen flex flex-col justify-center items-center">
      <h2 className={"mb-4 text-4xl tracking-tight font-extrabold text-white"}>
        404
      </h2>
      <p>Could not find requested resource</p>
      <p>You'll redirect to home page.</p>
    </div>
  );
}
