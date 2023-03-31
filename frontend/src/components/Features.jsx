const Features = () => {
    return (
        <section
              id="features"
              className="pt-24 flex flex-col bg-white items-center lg:flex-row lg:items-baseline lg:justify-evenly"
            >
              <div id="code" className="max-w-xs flex flex-col items-center">
                <div className="flex px-2 py-2 items-center rounded-full bg-green-200">
                  <div className="rounded-full bg-white p-2">
                    <img
                      className="h-auto"
                      src={"/svg-export/tag.svg"}
                      height={20}
                      width={20}
                      alt=""
                    />
                  </div>
                  <p className="px-2 text-lg text-green-700 font-bold">Code</p>
                </div>
                <div className="max-w-xs mt-4 text-center text-5xl font-extrabold">
                  <h1>Hack It Out In Code</h1>
                </div>
                <div className="mt-4 text-center text-xl text-blacklike">
                  <div>
                    Jump into the code editor to pair program or help a friend
                    to debug some code.
                  </div>
                  <div
                    className="mt-4 uppercase text-sm font-semibold
             text-green-700 flex flex-col items-center"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        className="h-auto"
                        src={"/svg-export/syntax.svg"}
                        height={20}
                        width={17}
                        alt=""
                      />
                      <p className="px-3 py-2">Syntax Highlighting </p>
                    </div>
                    <div className="pl-6 flex flex-row">
                      <img
                        className="h-auto"
                        src={"/svg-export/execute.svg"}
                        height={10}
                        width={15}
                        alt=""
                      />
                      <p className="px-3">Execute Code In-Browser</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="video"
                className="max-w-xs mt-24 flex flex-col items-center"
              >
                <div className="flex px-2 py-2 items-center rounded-full bg-blue-200">
                  <div className="rounded-full bg-white p-2">
                    <img
                      className="h-auto"
                      src={"/svg-export/cam.svg"}
                      height={20}
                      width={20}
                      alt=""
                    />
                  </div>
                  <p className="px-2 text-lg text-bluish font-bold">Video</p>
                </div>
                <div className="mt-4 text-center text-5xl font-extrabold">
                  <h1>Feel Like You are in the Room</h1>
                </div>
                <div className="mt-4 text-center text-xl text-blacklike">
                  <div>
                    Hop on a video call to hash things out and talk about what
                    you are working on.
                  </div>
                </div>
              </div>

              <div
                id="document"
                className="max-w-xs mt-24 flex flex-col items-center"
              >
                <div className="flex px-2 py-2 items-center rounded-full bg-pink-200">
                  <div className="rounded-full bg-white p-2">
                    <img
                      className="h-auto"
                      src={"/svg-export/file-icon.svg"}
                      height={20}
                      width={20}
                      alt=""
                    />
                  </div>
                  <p className="px-2 text-lg text-pink-600 font-bold">
                    Document
                  </p>
                </div>
                <div className="mt-4 text-center text-5xl font-extrabold">
                  <h1>Take Notes or Write Long-Form</h1>
                </div>
                <div className="mt-4 text-center text-xl text-blacklike">
                  <div>
                    For all communication that does not require a call, chat has
                    you covered.
                  </div>
                </div>
                <div
                  className="mt-4 uppercase text-sm font-semibold
              text-pink-600 flex flex-col items-center"
                >
                  <div className="flex flex-row items-center">
                    <img
                      className="h-auto"
                      src={"/svg-export/write.svg"}
                      height={20}
                      width={17}
                      alt=""
                    />
                    <p className="px-3 py-2">Write & Edit Together</p>
                  </div>
                  <div className="pl-6 flex flex-row">
                    <img
                      className="h-auto"
                      src={"/svg-export/save.svg"}
                      height={10}
                      width={15}
                      alt=""
                    />
                    <p className="px-3">Saves Automatically</p>
                  </div>
                </div>
              </div>
            </section>
    )
}

export default Features
