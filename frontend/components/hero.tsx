export function Hero() {
    return (
        <section className="flex items-center justify-center h-[80vh] bg-(--surface-muted)">
            <div className="container flex justify-between items-center">
                <div className="flex flex-col gap-4 lg:max-w-[45%]">
                  <div>
                    <h1>Speak naturally.</h1>
                    <h1 className="text-(--primary)!">Reply Intelligently.</h1>
                  </div>
                  <p>Record your messy thoughts, and turn them into polished replies in seconds. Effortlessly brigde the gap between thinking and communicating.</p>
                  <button className="btn-primary w-fit py-2 px-4 my-2">Sign in</button>
                </div>
                <div className="flex flex-col gap-4 lg:max-w-[45%]">
                  <div>
                    <div className=" border-(--border) rounded-lg p-4 shadow-2xl bg-(--surface) w-fit">
                      <div className="flex items-center gap-2">
                        <div className="size-3 bg-(--error) rounded-full animate-pulse"></div>
                        <small>Recording voice memo...0:42</small>
                      </div>
                      <div className="line my-2"></div>

                      <div className="border border-(--border) rounded-lg p-4 bg-background">
                        <small className="italic">&quot;Um, so tell Sarah that I got the report but the numbers in the Q3 column look a bit weird, maybe ask if she can double check the sources? Also thanks for the coffee.&quot;</small>
                      </div>

                      <div className="flex my-4 items-center">
                        <div className="line"></div>
                        <small className="w-[70%] text-center">AI ANALYSIS</small>
                        <div className="line"></div>
                      </div>

                      <div className="shadow border-(--border) rounded-lg p-4 bg-background">
                        <small className="italic">Hi Sarah, thank you for sending over the report. I’ve reviewed the document, but I noticed some discrepancies in the Q3 figures. Could you please verify the primary data sources for that section? Much appreciated!</small>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </section>
    )
}