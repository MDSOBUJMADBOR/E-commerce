import Link from "next/link";
import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  LifebuoyIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const LeftSideSignUp = () => {
  return (
    <div className="w-full lg:w-1/2 min-h-full overflow-hidden bg-[#004d3c] text-white flex flex-col justify-between relative p-6 sm:p-8 lg:p-12 ">
      {/* Background Glow Circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-emerald-400/10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[330px] w-[330px] rounded-full border border-emerald-400/10" />

      {/* Background Dots */}
      <div className="pointer-events-none absolute bottom-3 left-3 grid grid-cols-6 gap-2 opacity-50">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#00c878]" />
        ))}
      </div>

      {/* Top Section: Logo (Desktop only) & Text */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Logo */}
        <div className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00bd68] to-[#008c4c] shadow-lg">
              <ShoppingBagIcon className="h-7 w-7 text-white" />
            </div>
            <span className="text-[30px] font-extrabold tracking-tight italic">
              Shop<span className="text-[#00c878]">Easy</span>
            </span>
          </Link>
        </div>

        {/* Hero Text */}
        <div className="mt-2 lg:mt-8 max-w-[380px]">
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight">
            Shop Smarter, <br />
            <span className="text-[#00c878]">Live Better.</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-white/90">
            Create your account and enjoy exclusive deals, fast delivery, and more.
          </p>
        </div>

        {/* Features (Desktop Only) */}
        <div className="hidden lg:block mt-6 space-y-3">
          <FeatureItem icon={<TagIcon />} title="Best Prices" description="Get the best prices on top quality products." />
          <FeatureItem icon={<ShieldCheckIcon />} title="Secure Shopping" description="Your data is safe with our top security." />
          <FeatureItem icon={<TruckIcon />} title="Fast Delivery" description="Quick delivery at your doorstep." />
          <FeatureItem icon={<LifebuoyIcon />} title="24/7 Support" description="We're here to help you anytime." />
        </div>

        {/* Illustration Banner */}
        <div className="relative mt-4 lg:mt-auto flex justify-end lg:justify-center items-end">
          <div className="relative flex h-[120px] sm:h-[160px] w-[200px] sm:w-[260px] items-end justify-center">
            {/* Plant */}
            <div className="absolute bottom-[35px] right-[20px] sm:right-[30px] z-20 scale-75 sm:scale-100">
              <div className="relative h-[70px] w-[55px]">
                <div className="absolute bottom-4 left-1/2 h-10 w-1 -translate-x-1/2 rotate-[8deg] bg-green-700 rounded-full" />
                <span className="absolute left-4 top-4 h-4 w-8 -rotate-[35deg] rounded-full bg-[#58a53b]" />
                <span className="absolute left-6 top-1 h-4 w-7 rotate-[25deg] rounded-full bg-[#78b941]" />
                <div className="absolute bottom-0 left-1/2 h-7 w-10 -translate-x-1/2 rounded-b-md bg-[#b87a3e]" />
              </div>
            </div>

            {/* Shopping Bag */}
            <div className="absolute bottom-[30px] left-[20px] sm:left-[40px] z-10 scale-75 sm:scale-100">
              <div className="relative h-[85px] w-[70px] bg-[#b8e6c5] shadow-md rounded-sm">
                <div className="absolute -top-7 left-1/2 h-9 w-9 -translate-x-1/2 rounded-t-full border-[4px] border-b-0 border-[#163f36]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">S</span>
                </div>
              </div>
            </div>

            {/* Boxes */}
            <div className="absolute bottom-[25px] right-[45px] sm:right-[60px] z-10 scale-75 sm:scale-100">
              <div className="h-9 w-14 rotate-[3deg] rounded-sm border border-[#aa7b42] bg-[#d6a75c]">
                <div className="mx-auto h-full w-1 bg-[#bd8c4a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideSignUp;

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08785d]">
        <div className="h-5 w-5 text-white">{icon}</div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-white">{title}</h3>
        <p className="text-[11px] text-white/80">{description}</p>
      </div>
    </div>
  );
}