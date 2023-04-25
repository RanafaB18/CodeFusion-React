import {AiOutlineQuestionCircle, AiOutlineMail, AiOutlineTwitter} from "react-icons/ai"
import {FiChevronRight} from "react-icons/fi"
import Layout from "../components/Layout"
import { IconContext } from "react-icons"

const Contact = () => {
    return (
        <Layout>
            <main>
                <section className="relative mb-56">
                    <div className="bg-blackish text-center flex flex-col flex-1 pb-28">
                        <h1 className="text-5xl text-whitish font-extrabold">Contact</h1>
                        <p className="text-2xl text-gray-400 pt-2">Get in touch with us</p>
                    </div>
                    <div className="text-gray-600 absolute -bottom-full w-full left-0 right-0 mx-auto">
                        <IconContext.Provider value={{size: "32px"}}>

                        <div className="bg-white max-w-md mx-auto flex flex-col border rounded-lg shadow-sm">
                            <button className=" flex items-center
                            hover:text-orangish  cursor-pointer py-5
                            border rounded-tl rounded-tr
                            justify-evenly border-l-2 border-l-orangish">
                                <AiOutlineQuestionCircle className="opacity-75"/>

                                <div className="pl-4 pr-10 text-left">
                                    <strong>Need help with something</strong>
                                    <div className="opacity-75">Open a support ticket</div>
                                </div>
                                <FiChevronRight />
                            </button>
                            <button className="hover:text-purple-600
                            cursor-pointer flex items-center py-5 border justify-evenly
                            border-l-2 border-l-purple-600">
                                <AiOutlineMail className="opacity-75"/>
                                <div className="pl-4 pr-10 text-left">
                                    <strong>Got a suggestion?</strong>
                                    <p>Email us at team@room.sh</p>
                                </div>
                                <FiChevronRight />
                            </button>
                            <button className="hover:text-green-500
                            cursor-pointer flex items-center py-5 border rounded-br rounded-bl
                            justify-evenly border-l-2 border-l-green-500">
                                <AiOutlineTwitter className="opacity-75"/>
                                <div className="pl-4 pr-10 text-left">
                                    <strong>Just want to banter?</strong>
                                    <p>Send us memes on Twitter</p>
                                </div>
                                <FiChevronRight />
                            </button>

                        </div>
                        </IconContext.Provider>
                    </div>
                </section>
            </main>
        </Layout>
    )
}


export default Contact
