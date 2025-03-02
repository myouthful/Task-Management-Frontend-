import mdclogo from '../assets/mdclogo.png'

function Header() {
    return(
        <header className="flex items-center w-full py-4 bg-lime-400 justify-between px-[40px] ">
           <div className='flex items-center gap-5 w-fit '>
                <img className='w-[25px] h-[25px] ' src={mdclogo} alt="mvc logo" />
                <p className='font-semibold text-[18px] text-white '>Task Management Platform</p>
           </div>


           <p className='font-medium text-[15px] text-white '>Welcome</p>
        </header>
    )
}



export default Header;