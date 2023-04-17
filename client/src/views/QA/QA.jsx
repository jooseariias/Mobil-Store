import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function QA(){
  return (

    <div className='bg-gray-100'>
      <Header />

      <section className="dark:bg-gray-800 dark:text-gray-100 h-[calc(100vh-7.5rem)]">

	      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
		      <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">PHONEZONE</p>
		      <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>


		      <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">

			      <div>
				      <h3 className="font-semibold">¿Qué ventajas tengo al crearme una cuenta?</h3>
				      <p className="mt-1 dark:text-gray-400">Al crear una cuenta en <span className='text-blue-500'>PHONEZONE</span>, se tendrá acceso a una lista de favoritos personal, así como la acción de poder hacer compras.</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">¿Cómo ingreso a mi cuenta?</h3>
				      <p className="mt-1 dark:text-gray-400">Siempre que ingreses a <span className='text-blue-500'>PHONEZONE</span>, puedes acceder a tu cuenta haciendo click en "Iniciar sesión".
              Ingresa tu correo y contraseña o, si lo prefieres, conéctate con nosotros a través de Google+.</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">¿Qué es y para qué sirven las reseñas?</h3>
				      <p className="mt-1 dark:text-gray-400">Son comentarios que los usuarios han realizado sobre los productos que han comprado. Son totalmente confiables,
              ya que cada usuario expresa libremente su experiencia de compra en <span className='text-blue-500'>PHONEZONE</span>.
              Calificar la calidad de los productos nos permite tener una retroalimentación efectiva.</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">¿Quién puede escribir las reseñas?</h3>
				      <p className="mt-1 dark:text-gray-400">Solo los usuarios validados y que previamente hayan comprado el producto podrán hacer una reseña del mismo.</p>
			      </div>

            <div>
				      <h3 className="font-semibold">¿Qué métodos de pago maneja la página?</h3>
				      <p className="mt-1 dark:text-gray-400">De momento, <span className='text-blue-500'>PHONEZONE</span> solo maneja pagos a través de MercadoPago a través de cuentas de prueba.</p>
			      </div>

            <div>
				      <h3 className="font-semibold">¿Para qué sirve la ruta de Contacto?</h3>
				      <p className="mt-1 dark:text-gray-400">A través de la ruta de Contacto nos podrás informar sobre un problema que tengas con el funcionamiento de la página: ya sea un problema con pagos, BUGS, fallas
              visuales y demás.</p>
			      </div>



		      </div>
	      </div>
    </section>   

    <Footer />
  </div>
  )
}
