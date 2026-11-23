import { Frame } from "@/components/frame";

export default function CinemaPage() {
  return (
    <Frame>
      <main className="bg-cinema text-fg min-h-screen">
        <header className="bg-cinema px-5 py-16 text-fg md:py-20 border-b border-fg/20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.18em] text-fg uppercase font-mono">Film and musical</p>
            <h1 className="font-display mt-3 text-5xl leading-[0.95] md:text-7xl">Cinema</h1>
            <p className="mt-5 max-w-2xl text-fg text-base">
              Two shelves. Film holds series such as Faith. Musical is the place for scored or staged pieces.
            </p>
          </div>
        </header>
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-12">
          <section>
            <p className="text-xs tracking-[0.16em] text-fg uppercase font-mono">Film</p>
            <h2 className="font-display mt-2 text-3xl">Faith — Episode 1</h2>
            <p className="mt-3 max-w-2xl text-fg">
              First episode of the Faith series. More episodes will follow.
            </p>
            <div className="mt-6 aspect-video w-full overflow-hidden border border-fg/30 bg-black shadow-lg">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/4fofzvvu4N0?start=12"
                title="Faith — Episode 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
          <section className="border-t border-fg/25 pt-10">
            <p className="text-xs tracking-[0.16em] text-fg uppercase font-mono">Musical</p>
            <h2 className="font-display mt-2 text-3xl">Nothing listed yet</h2>
            <p className="mt-3 max-w-2xl text-fg">
              Scored or staged work goes here, separate from the film series. A title and a link can be added
              in the CMS Studio.
            </p>
          </section>
        </div>
      </main>
    </Frame>
  );
}
