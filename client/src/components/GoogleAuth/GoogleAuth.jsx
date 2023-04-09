import {BsGoogle} from 'react-icons/bs'

export default function Auth() {
    
    const google = () => { window.open(`http://localhost:3001/auth/google`, '_self') }

    return (
        <div className="w-full h-5 text-slate-500 dark:text-slate-500">
            <button className="w-5 h-8" onClick={google}>
                <BsGoogle size={30} style={{margin: '0px 7px'}}/>
            </button>
        </div>
    )
}