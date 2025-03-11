import mdclogo from '../assets/mdclogo.png'

function Header() {
    return(
        <header className="flex items-center w-full h-[90px] py-4 bg-gray-900 justify-between px-[40px] ">
           <div className='flex items-center gap-5 w-fit '>
                <img className='w-[25px] h-[25px] ' src={mdclogo} alt="mvc logo" />
                <p className='font-montserrat font-semibold text-[18px] text-white '>Task Management Platform</p>
           </div>


           <p className='font-medium font-montserrat text-[14px]  text-white '>"Our better way to manage task" </p>
        </header>
    )
}



export default Header;