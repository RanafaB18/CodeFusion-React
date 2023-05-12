import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Form, redirect } from "react-router-dom";
import Features from "./components/Features";
import Layout from "./components/Layout";
import axiosUtil from "./services";
import { io } from "socket.io-client";
import Button from "./components/Button";


export async function action({ request, params }) {
  console.log("Params  id", params.id)
  const data = await axiosUtil.getRoomID(params.id);
  socket.emit("join_room", data.roomLink);
  return redirect(`/go/${data.roomLink}`);
}

export const socket = io("http://localhost:3004");
export default function Home() {
  const [room, setRoom] = useState("");
  return (
    <HelmetProvider>
      <Layout>
        <div className="bg-blackish pt-5 w-full h-full">
          <Helmet>
            <title>codefusion</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <main className="mt-28">
            <section className="flex flex-col lg:flex-row">
              <div
                className="flex flex-col items-center
           max-w-md mx-auto sm:max-w-xl lg:items-start
           lg:mx-20"
              >
                <div
                  className="flex justify-around text-white
            text-sm items-center w-60 border rounded-3xl py-1
            border-orangish"
                >
                  <div className="border border-orangish rounded-3xl px-2 bg-orangish">
                    <p>NEW</p>
                  </div>
                  <p>Business Plans are here! →</p>
                </div>
                <div className="mt-2 text-center lg:text-left">
                  <h1 className="mb-4 text-7xl font-bold text-whitish">
                    The Better Way to Meeting
                  </h1>
                  <h2 className="mb-4 text-3xl text-grayish">
                    Get your team on the same page inside online meeting rooms
                    with collaborative productivity tools.
                  </h2>
                </div>
                <div className="w-full">
                  <Form
                    method="post"
                    action={`/go/${room}`}
                    className="max-w-xs mx-auto flex flex-col mt-4 lg:mx-0"
                  >
                    <input
                      className="border-2 focus:outline-none focus:ring
                focus:ring-activeblue text-lg p-3 rounded-md"
                      type="text"
                      placeholder="Enter a name for your room"
                      value={room}
                      required
                      onChange={(event) => setRoom(event.target.value)}
                    />

                    <Button text={"Get A Room →"} />
                  </Form>
                </div>
              </div>
              <div
                href="#document"
                className="hidden lg:flex lg:justify-center lg:items-center lg:flex-1"
              >
                <div className="relative cursor-pointer">
                  <img
                    className="rounded-lg h-auto"
                    src={"/svg-export/logo2.svg"}
                    height={200}
                    width={170}
                    alt=""
                  />
                  <a
                    href="#document"
                    className="cursor-pointer absolute -top-40 -left-52 hover:scale-105 transition duration-300"
                  >
                    <div className="relative">
                      <img
                        className="rounded-lg h-auto"
                        src={"/svg-export/document-icon.svg"}
                        height={200}
                        width={170}
                        alt=""
                      />
                    </div>
                    <div className="absolute -right-40 -bottom-7 left-20 w-full drop-shadow-lg">
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
                        <p className="px-2 text-pink-600 font-bold">Document</p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#code"
                    className="cursor-pointer absolute -bottom-40  hover:scale-105 transition duration-300"
                  >
                    <div className="relative">
                      <img
                        className="rounded-lg h-auto  border-2 border-white"
                        src={"/svg-export/code-icon.svg"}
                        height={200}
                        width={170}
                        alt=""
                      />
                    </div>
                    <div className="absolute -right-40 -bottom-7 left-20 w-full drop-shadow-lg">
                      <div className="flex px-2 py-2 items-center rounded-full bg-green-200 w-28">
                        <div className="rounded-full bg-white p-2">
                          <img
                            className="h-auto"
                            src={"/svg-export/tag.svg"}
                            height={20}
                            width={20}
                            alt=""
                          />
                        </div>
                        <p className="px-2 text-green-700 font-bold">Code</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#video"
                    className="cursor-pointer absolute -top-40 -right-36 hover:scale-105 transition duration-300"
                  >
                    <div className="relative">
                      <div className="relative">
                        <img
                          className="rounded-lg h-auto  border-2 border-white"
                          src={"/svg-export/video.svg"}
                          height={200}
                          width={170}
                          alt=""
                        />
                      </div>
                      <div className="absolute top-20 -right-28">
                        <div className="relative">
                          <img
                            className="rounded-lg h-auto"
                            src={"/svg-export/vidmale.svg"}
                            height={200}
                            width={170}
                            alt=""
                          />
                        </div>
                        <div className="absolute -bottom-4 -left-14 flex px-2 py-2 items-center rounded-full bg-blue-200">
                          <div className="rounded-full bg-white p-2">
                            <img
                              className="h-auto"
                              src={"/svg-export/cam.svg"}
                              height={20}
                              width={20}
                              alt=""
                            />
                          </div>
                          <p className="px-2 text-bluish font-bold">Video</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
            <div
              className="mt-14 flex flex-col
          max-w-lg mx-auto sm:max-w-sm md:max-w-xl"
            >
              <img
                className="w-auto"
                src={"/svg-export/plateau.svg"}
                height={200}
                width={120}
                alt=""
              />
            </div>
            <Features />
          </main>
        </div>
      </Layout>
    </HelmetProvider>
  );
}