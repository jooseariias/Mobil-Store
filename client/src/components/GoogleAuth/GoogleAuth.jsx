import {BsGoogle} from 'react-icons/bs'

export default function Auth() {
    
    const handleClick =  () => {
        window.open(`http://localhost:3001/auth/google`, '_self');
    }

    return (
        <div className="w-full h-5 text-gray-400 text-center">
            <button  className="w-5 h-8" onClick={() => handleClick()}>
              <div className='button-google  block rounded-lg p-2 block rounded-lg  text-white font-medium w-4/5 bg-gradient-to-r from-red-500 to-blue-900 text-white font-medium w-4/5 bg-gradient-to-r from-red-500 to-blue-900'> <BsGoogle size={30} style={{margin: '0px 7px'}}/> <p>Sing in Google</p></div> 
            </button>
        </div>
    )
}