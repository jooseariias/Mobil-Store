import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Contact(){

    const handleSubmit = () => {
       
    }

  return(
    <div className='bg-gray-100 dark:bg-gray-800'>

        <Header />

        <section className="dark:text-gray-100 h-[calc(100vh-7.5rem)]">

            <div className="container flex flex-col justify-center p-4 md:p-8">
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">PHONEZONE</p>
		        <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Let's talk!</h2>

                <form onClick={() => handleSubmit()}action="#" class="space-y-8">
                
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" class="shadow-sm bg-gray-50 border
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
                          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                    </div>

                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                        border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Let us know how we can help you" required />
                    </div>

                    <div class="sm:col-span-2">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border
                         border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment...">
                        </textarea>
                    </div>

                    <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500
                        sm:w-48 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Send message
                    </button>

                </form>
            </div>
        </section>

        <Footer />
    </div>
  )
}
