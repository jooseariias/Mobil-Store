import icons from '../../assets/icons-footer/icons.JS'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-300 mt-3 text-slate-900 dark:bg-[#17202A] dark:text-slate-100">
      <div className="container flex flex-col p-4 mx-auto md:p-2 lg:flex-row divide-gray-400">

        <ul className="self-center py-6  text-xl space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-8 lg:flex-1 lg:justify-start">
          <Link to={"/"}><li className="hover:underline">Home</li></Link>
			    <Link to={"/Store"}><li className="hover:underline">Store</li></Link>
          <Link to={"/About"}><li className="hover:underline">About</li></Link>
        </ul>

        <div className="flex flex-col justify-center pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4">

            <a
              rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=100091299622616&is_tour_dismissed=true"
              title="Facebook"
              className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-400 text-gray-900"
            >
              <img src={icons.img2} className="transform hover:scale-110 rounded-full shadow-xl shadow-slate-700" alt="" />
            </a>

            <a
              rel="noopener noreferrer"
              href="https://instagram.com/phone._.zone?igshid=OTJhZDVkZWE="
              title="Instagram"
              className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-400 text-gray-900"
            >
              <img src={icons.img1} className="transform hover:scale-110 rounded-full shadow-xl shadow-slate-700" alt="" />
            </a>

        
          </div>
        </div>
      </div>
    </footer>
  );
}