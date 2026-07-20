export function Hero() {
    return (
        <section className="flex items-center justify-center h-[80vh] border">
            <div className="container">
                <div className="flex flex-col gap-4 lg:max-w-[45%]">
                  <div>
                    <h1>Speak naturally.</h1>
                    <h1 className="text-(--primary)">Reply Intelligently.</h1>
                  </div>
                  <p>Record your messy thoughts, and turn them into polished replies in seconds. Effortlessly brigde the gap between thinking and communicating.</p>
                  <button className="btn-primary w-fit py-2 px-4 my-2">Sign in</button>
                </div>
            </div>
        </section>
    )
}