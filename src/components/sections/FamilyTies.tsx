import { Heart, Sparkles, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function FamilyTies() {
  return (
    <section data-section="family" className="relative px-6 py-28 overflow-hidden">
      {/* Subtle gold glow behind */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-full max-w-4xl bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.12_84/0.1),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="With Gratitude & Love"
          title="The Families & Blessings"
          className="mx-auto max-w-2xl text-center"
        />

        {/* Groom & Bride Couple Card */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Groom's Side */}
          <Reveal delay={100}>
            <div className="relative rounded-2xl border border-gold/35 bg-card/60 p-8 text-center backdrop-blur-sm shadow-xl paper transition-all hover:border-gold/60">
              <span className="text-[0.62rem] uppercase tracking-[0.35em] text-gold-soft/80">
                Groom
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl gold-text">
                Dr Shivam Mehta
              </h3>
              <div className="mx-auto my-4 w-12 gold-rule" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Son of</p>
              <p className="mt-1 font-display text-xl text-foreground">
                Mr Amul Mehta <span className="text-gold-soft">&amp;</span> Mrs Sharvari Mehta
              </p>
              <div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 py-2 px-3 text-xs text-gold-soft/90">
                Groom's Family
              </div>
            </div>
          </Reveal>

          {/* Bride's Side */}
          <Reveal delay={200}>
            <div className="relative rounded-2xl border border-gold/35 bg-card/60 p-8 text-center backdrop-blur-sm shadow-xl paper transition-all hover:border-gold/60">
              <span className="text-[0.62rem] uppercase tracking-[0.35em] text-gold-soft/80">
                Bride
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl gold-text">
                Dr Krina Morabia
              </h3>
              <div className="mx-auto my-4 w-12 gold-rule" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Daughter of</p>
              <p className="mt-1 font-display text-xl text-foreground">
                Mr Nitin Morabia <span className="text-gold-soft">&amp;</span> Mrs Jyoti Morabia
              </p>
              <div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 py-2 px-3 text-xs text-gold-soft/90">
                Bride's Family
              </div>
            </div>
          </Reveal>
        </div>

        {/* Blessings & Love from Family */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Grandparents' Blessings */}
          <Reveal delay={250}>
            <div className="h-full rounded-2xl border border-gold/25 bg-card/40 p-6 text-center backdrop-blur-sm paper">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft/75">
                With the Blessings of
              </p>
              <h4 className="mt-2 font-display text-2xl text-gold-soft">
                Mr Niranjan Mehta <span className="text-gold/50">&amp;</span> Mrs Asha Mehta
              </h4>
              <p className="mt-2 text-xs italic text-muted-foreground">
                Grandfather &amp; Grandmother of the Groom
              </p>
            </div>
          </Reveal>

          {/* Sister & Brother-in-law */}
          <Reveal delay={350}>
            <div className="h-full rounded-2xl border border-gold/25 bg-card/40 p-6 text-center backdrop-blur-sm paper">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
                <Heart className="h-4 w-4" />
              </div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft/75">
                With Love From
              </p>
              <h4 className="mt-2 font-display text-2xl text-gold-soft">
                Mrs Tanvi Patel <span className="text-gold/50">&amp;</span> Mr Parthav Patel
              </h4>
              <p className="mt-2 text-xs italic text-muted-foreground">
                Sister &amp; Brother-in-law of the Groom
              </p>
            </div>
          </Reveal>

          {/* Little Ones */}
          <Reveal delay={450}>
            <div className="h-full rounded-2xl border border-gold/25 bg-card/40 p-6 text-center backdrop-blur-sm paper sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
                <Star className="h-4 w-4" />
              </div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold-soft/75">
                Excited to Celebrate
              </p>
              <h4 className="mt-2 font-display text-2xl text-gold-soft">
                Aarush Patel <span className="text-gold/50">&amp;</span> Raavika Patel
              </h4>
              <p className="mt-2 text-xs italic text-muted-foreground">
                Nephew &amp; Niece — Excited to celebrate the wedding of their Mama! ❤️
              </p>
            </div>
          </Reveal>
        </div>

        {/* Mameru Family Tribute */}
        <Reveal delay={500}>
          <div className="mt-8 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/5 via-card/50 to-gold/5 p-6 sm:p-8 text-center backdrop-blur-sm">
            <span className="text-[0.62rem] uppercase tracking-[0.35em] text-gold-soft">
              Traditional Mameru Blessings
            </span>
            <p className="mt-2 font-display text-lg sm:text-xl italic text-foreground/90">
              “For our beloved Mama &amp; Mami and Masi &amp; Masaji — a little tradition, a lot of
              love, and memories to cherish forever.” ❤️
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gold-soft">✦</span>
                <span className="font-display text-lg text-foreground">
                  Mr Himanshu Purohit &amp; Mrs Vandana Purohit
                </span>
                <span className="text-xs text-gold-soft/80 italic">(Mama &amp; Mami)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold-soft">✦</span>
                <span className="font-display text-lg text-foreground">
                  Mr Kumar Trivedi &amp; Mrs Aparna Trivedi
                </span>
                <span className="text-xs text-gold-soft/80 italic">(Masi &amp; Masaji)</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
