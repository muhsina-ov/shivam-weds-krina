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
              <p className="mt-1 font-display text-base text-foreground/85">
                (MD Radiodiagnosis)
              </p>
              <div className="mx-auto my-4 w-12 gold-rule" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Son of</p>
              <p className="mt-1 font-display text-xl text-foreground">
                Mrs Sharvari Mehta <span className="text-gold-soft">&amp;</span> Mr Amul Mehta
              </p>
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
              <p className="mt-1 font-display text-base text-foreground/85">
                (MD Radiodiagnosis)
              </p>
              <div className="mx-auto my-4 w-12 gold-rule" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Daughter of</p>
              <p className="mt-1 font-display text-xl text-foreground">
                Mrs Jyoti Morabia <span className="text-gold-soft">&amp;</span> Mr Nitin Morabia
              </p>
            </div>
          </Reveal>
        </div>

        {/* Blessings & Love from Family */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Grandparents' Blessings — ivory shade */}
          <Reveal delay={250}>
            <div className="h-full rounded-2xl border border-gold/50 bg-[oklch(0.94_0.05_85_/_0.97)] p-6 text-center shadow-xl backdrop-blur-sm paper">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.42_0.15_30_/_0.45)] bg-[oklch(0.42_0.15_30_/_0.1)] text-[oklch(0.42_0.15_30)]">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[oklch(0.45_0.14_33_/_0.85)]">
                With the Blessings of
              </p>
              <h4 className="mt-2 font-display text-2xl text-[oklch(0.42_0.15_30)]">
                Mr Niranjan Mehta <span className="text-[oklch(0.55_0.14_45_/_0.7)]">&amp;</span> Mrs Asha Mehta
              </h4>
              <p className="mt-2 text-xs italic text-[oklch(0.45_0.1_30_/_0.8)]">
                Grandfather &amp; Grandmother of the Groom
              </p>
            </div>
          </Reveal>

          {/* Sister & Brother-in-law — deep rose shade */}
          <Reveal delay={350}>
            <div className="h-full rounded-2xl border border-gold/35 bg-[oklch(0.37_0.14_28_/_0.95)] p-6 text-center backdrop-blur-sm paper">
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

          {/* Little Ones — deep green shade */}
          <Reveal delay={450}>
            <div className="h-full rounded-2xl border border-[oklch(0.7_0.1_150_/_0.45)] bg-[oklch(0.3_0.07_160_/_0.95)] p-6 text-center backdrop-blur-sm paper sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
                <Star className="h-4 w-4" />
              </div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[oklch(0.9_0.06_120_/_0.85)]">
                Excited to Celebrate
              </p>
              <h4 className="mt-2 font-display text-2xl text-gold-soft">
                Aarush Patel <span className="text-gold/50">&amp;</span> Raavika Patel
              </h4>
              <p className="mt-2 text-xs italic text-[oklch(0.88_0.05_130_/_0.8)]">
                Nephew &amp; Niece — Excited to celebrate the wedding of their Mama! ❤️
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
