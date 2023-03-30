import icons from '../../assets/icons-header/icons.js'

export default function Header(){
  return (
    <header className="p-4 bg-slate-300 text-gray-100 shadow-md shadow-slate-900">

		<div className=" flex justify-between h-12 mx-auto w-full">

			<div className=' flex h-full mt-2 text-xl text-black'>
				<h1>MOBILE STORE</h1>
			</div>
	
			<div className="items-center flex-shrink-0 hidden lg:flex">
				<img src={icons.favoritos} className="h-8 w-8 mr-4" alt="" />
				<img src={icons.carrito} className="h-8 w-8 mr-5" alt="" />
				<img src={icons.usuario} className="h-8 w-8 mr-2" alt="" />
			</div>
		</div>
		
	</header>
  )
}
