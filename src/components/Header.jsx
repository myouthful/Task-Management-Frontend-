import mdclogo from '../assets/mdclogo.png'

function Header() {
    return(
        <header className="fixed top-0  flex items-center w-full h-[90px] py-4 bg-blue-600 justify-between px-[40px] ">
           <div className='flex items-center gap-3 w-fit '>
                <img className='bg-white w-[30px] h-[30px] ' src={mdclogo} alt="mvc logo" />
                <p className='font-montserrat font-semibold text-[19px] text-white '>Task Management Platform</p>
           </div>


           <p className='font-medium font-montserrat text-[14px] italic text-white '>"simplify task management" </p>
        </header>
    )
}



export default Header;