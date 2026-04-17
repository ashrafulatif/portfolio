export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-navy/5  backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl text-navy">
            Ashraful Haque<span className="text-teal">.</span>
          </h3>
          <p className="text-slate/50 text-[10px] font-bold uppercase tracking-widest">
            Full Stack Web Developer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4 pt-4 border-t border-navy/5 w-full md:w-auto justify-center md:justify-end">
            <p className="text-[10px] font-bold uppercase tracking-widest text-teal/80">
               Developed by Ashraful Haque | Copyright © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}