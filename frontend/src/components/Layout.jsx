import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero.jsx";

export default function Layout({children}) {

    return (
        <>
            <Header/>
            <Hero/>
            <main className={"xl:max-w-screen-2xl mx-auto"}>{children}</main>
            <Footer/>
        </>
    )
}
