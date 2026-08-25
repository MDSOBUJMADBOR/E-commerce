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

        <h2 className="text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">
          ShopEasy
        </h2>
      </div>
    </Link>
  );
}
