
const NavBar = () => {
    return (
        <div
            className='absolute z-20 text-whitish bg-blacklike
                flex flex-col py-2 right-0 w-60 font-semibold
                text-md rounded-md lg:flex-row lg:relative lg:w-full
                lg:bg-blackish lg:align-middle'
        >
            <a className='nav-link' href={"/#features"}>Features</a>
            {/* <a className='nav-a' href={"/"}>Pricing</a>
            <a className='nav-a' href={"/"}>FAQ</a> */}
            <a className='nav-link' href={"/contact"}>Contact</a>
            <a className='nav-link' href={"/"}>Login</a>
            <a href={"/"}
                className='nav-link bg-whitelike text-blacklike rounded-md
                   mt-1 mx-2 px-3 hover:bg-whitehover lg:mt-0
                  text-center'
            >
                Sign Up
            </a>
        </div>
    )
}

export default NavBar
