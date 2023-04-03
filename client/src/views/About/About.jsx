import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import {data} from '../../assets/icons-about/photos.js'
import {icons} from '../../assets/icons-about/icons.js'

export default function About(){

  
  return (
    <div class="bg-cover bg-no-repeat" >

        <div>
            <Header />
        </div>


		<div className='flex w-full h-full'>

            

            <section className="py-1 text-gray-100 w-full">
	            <div className="container p-4 mx-auto space-y-16 sm:p-10">
		<div className="space-y-4">
			<h1 className="text-4xl font-bold leading-none text-center sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
				The talented people behind the scenes
			</h1>
            
			
		</div>

		<div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
			{
				data?.map((element) => {
					return(
						<div className="space-y-4">
							<img alt="img1" className="object-cover h-56 w-52 shadow-xl shadow-slate-500 mx-auto mb-4 bg-center rounded-sm bg-gray-500" src={element.image} />
							<div className="flex flex-col items-center">
							<h4 className="text-xl font-semibold text-slate-100">{element.name}</h4>
							<p className="text-md font-medium text-slate-200">Full Stack Developer</p>
							<div className="flex mt-2 space-x-2 w-14">
								<a rel="noopener noreferrer" href={element.Linkedin} title="LinkedIn" className="text-gray-400">
									<img src={icons.Linkedin} alt="" />
								</a>
								<a rel="noopener noreferrer" href={element.GitHub} title="GitHub" className="text-gray-400">
									<img src={icons.GitHub} alt="" />
								</a>
							</div>
						</div>
						</div>
					)})
			}
		</div>
	</div>
</section>

        
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}