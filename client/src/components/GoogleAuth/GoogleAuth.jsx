import {BsGoogle} from 'react-icons/bs'

export default function Auth() {
    
    const handleClick =  () => {
        window.open(`http://localhost:3001/auth/google`, '_self');
    }

    return (
        <div className="w-full h-5 text-gray-400 text-center">
            <button  className="w-5 h-8" onClick={() => handleClick()}>
                <BsGoogle size={30} style={{margin: '0px 7px'}}/>
            </button>
        </div>
    )
}