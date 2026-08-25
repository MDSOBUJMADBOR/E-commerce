import Image from "next/image";
import Link from "next/link";

export default function LeftSide() {
  return (
    <Link href="/" className="shrink-0">
      <div className="flex items-center gap-2">
        <Image
          src="/images/icons.png"
          alt="ShopEase Logo"
          width={50}
          height={50}
          priority
        />

        <h2 className="italic text-2xl lg:text-3xl  xl:text-4xl font-bold  text-green-600 ">
         ‍<span className="text-black">Shop</span>Easy
        </h2>
      </div>
    </Link>
  );
}
