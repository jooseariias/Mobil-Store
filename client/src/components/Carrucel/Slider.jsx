import Card from './Card'
import Slider from 'react-slick'

export default function Slider2({data, tittle}){

    const settings = {
        arrows: false,
        Infinite: false,
        speeed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpped: 5000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }


  return (

      <div className='max-w-full mx-4'>

        <div>
            <h1 className="text-2xl mb-4 mt-10 ml-4 font-extrabold leading-none text-left text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">{tittle}</h1>
      
            <Slider {...settings}>
                {data.map((el,index) => <Card key={index} id={el.id} img={el.img} name={el.name} price={el.price} genre={el.genre} calification={el.calification} />)}
            </Slider>
         </div>



        </div>
  )
}