import Link from "next/link";

const Banner = () => (
  <section className="relative overflow-hidden bg-gray-900 text-white">
    <div className="absolute inset-0 bg-[url('/assets/Banner.png')] bg-cover bg-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
    <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-16 sm:px-6 sm:py-20 md:min-h-[660px] lg:px-8">
      <div className="max-w-3xl drop-shadow-lg">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-white">Travel further. Feel more.</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">Discover your next adventure</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.</p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/destinations" className="group rounded-full bg-[#0f9f9a] px-6 py-3.5 text-center font-bold text-black shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#08726f] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7">
            <span className="inline-flex items-center gap-2">Explore destinations <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
          </Link>
          <Link href="/signup" className="group rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-center font-bold backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#0f9f9a] hover:text-black hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-7">
            <span className="inline-flex items-center gap-2">Start planning <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
          </Link>
        </div>
      </div>
    </div>
    <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px border-t border-white/25 bg-black/35 backdrop-blur-sm md:grid-cols-4">
      {[["01", "Curated escapes", "Handpicked places worth remembering"], ["24/7", "Travel support", "Help whenever your journey needs it"], ["100%", "Secure booking", "A smoother way to plan with confidence"], ["∞", "New memories", "Your next story starts here"]].map(([value, title, description]) => (
        <div key={title} className="p-4 sm:p-5 md:p-7">
          <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
          <h2 className="mt-2 text-sm font-bold sm:text-base">{title}</h2>
          <p className="mt-1 hidden text-sm leading-5 text-white/60 sm:block">{description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Banner;
