import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-black/10 bg-white px-6 py-16 text-black/60 transition-colors duration-300 dark:border-white/10 dark:bg-black dark:text-gray-400 md:px-16">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-black md:text-7xl dark:text-white">Wanderlast</h1>
        <p className="mt-4 max-w-xl leading-7">Your gateway to extraordinary travel experiences around the world.</p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <h3 className="mb-3 tracking-wide text-black dark:text-white">NEWSLETTER</h3>
          <p className="mb-4 text-sm">Subscribe for exclusive travel deals and inspiration.</p>
          <div className="flex items-center border border-black/10 bg-black/5 px-4 py-3 dark:border-white/10 dark:bg-white/10">
            <input type="email" placeholder="Enter email" className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black/45 dark:text-white dark:placeholder:text-[#91aaa7]" />
            <span className="text-lg text-black dark:text-white">↗</span>
          </div>
        </div>
        <div>
          <h3 className="mb-3 tracking-wide text-black dark:text-white">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="transition-colors hover:text-[#0f9f9a]" href="/">Home</Link></li>
            <li><Link className="transition-colors hover:text-[#0f9f9a]" href="/destinations">Destinations</Link></li>
            <li><Link className="transition-colors hover:text-[#0f9f9a]" href="/my-bookings">My Bookings</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 tracking-wide text-black dark:text-white">SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#0f9f9a]">Help Center</li>
            <li className="hover:text-[#0f9f9a]">Terms of Service</li>
            <li className="hover:text-[#0f9f9a]">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 tracking-wide text-black dark:text-white">CONTACT US</h3>
          <ul className="space-y-2 text-sm"><li>786 901 1622</li><li>info@wandarland.com</li></ul>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between border-t border-black/10 pt-6 dark:border-white/10 md:flex-row">
        <p className="text-sm">© 2026 Wanderlast. All rights reserved.</p>
        <div className="mt-4 flex gap-5 text-lg text-black dark:text-white md:mt-0"><span>X</span><span>in</span><span>◎</span></div>
      </div>
    </div>
  </footer>
);

export default Footer;
