const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="pt-32 pb-10">
                <hr />
                <div className="py-20">
                    <div className="text-center max-w-sm mx-auto sm:max-w-none">
                        <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-colorFrom via-colorVia to-colorTo">Communication + Collaboration = Awesome</h2>
                        <p className="text-3xl mt-3">Start working together better - remotely</p>
                        <button className="mt-8 rounded px-10 py-3 text-lg font-semibold bg-buttonBlue text-white">Try Room For Free</button>
                    </div>
                </div>
            </div>
            <div className="relative bg-blackish ">
                <div className="absolute z-10 w-14 right-0 left-0 mx-auto -top-7 ">
                    <div className=" bg-blackish rounded-full p-3">

                        <img className="h-auto" src={"/svg-export/logo2.svg"} height={30} width={35} alt="" />
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="py-16 flex flex-col items-center md:flex-row md:items-stretch">
                        <div className="mt-12 flex flex-col items-center w-full">
                            <p className="text-white pb-3 font-semibold uppercase">General</p>
                            <a className="nav-a w-3/4 text-center text-gray-400" href='/'>Home</a>
                            <a className="nav-a w-3/4 text-center text-gray-400" href='/contact'>Contact</a>
                        </div>
                        <div className="mt-12 flex flex-col items-center w-full">
                            <p className="text-white pb-3 font-semibold uppercase">Product</p>
                            <a className="nav-a w-3/4 text-center text-gray-400" href='/'>Features</a>
                        </div>
                        <div className="mt-12 flex flex-col items-center w-full">
                            <p className="text-white pb-3 font-semibold uppercase">Legal</p>
                            <a className="nav-a w-3/4 text-center text-gray-400" href='/'>Terms of Use</a>
                            <a className="nav-a w-3/4 text-center text-gray-400" href='/'>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
