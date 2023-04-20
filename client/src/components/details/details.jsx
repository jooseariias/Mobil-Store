import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCapacity, getDetail, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./details.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import atras from "../../assets/atras.png"
import { Reviews } from "../Reviews/Reviews";
import { CreateReviews } from "../Reviews/CreateReviews";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { postReviews } from '../../redux/actions';
import swal from "sweetalert2";

import '../Reviews/reviews.css'




function Details(){

  const [details] = useSelector((state) => state.details);
  console.log(details);

  const User= useSelector(state=>state.User)
  const msg= useSelector(state=>state.message)
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { productId } = useParams();
  const product= useSelector(state=>state.Phones).filter(p=>p.id==productId)

  const [error, setError] = useState({});

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleBlurComment = () => {
    if (!comment.trim()) {
      setError((prevErrors) => ({
        ...prevErrors,
        comment: 'Comment is required',
      }));
    } else {
      setError((prevErrors) => ({ ...prevErrors, comment: null }));
    }
  };

const handleSubmit = async (event) => {
event.preventDefault();
if (!rating || !comment) {
  swal.fire({
    title: "Error",
    text: "You must complete all fields",
    icon: "warning",
    buttons: "Ok",
  });
} else {
  const FormData = {
    score: parseInt(rating),
    comment: comment,
    idUser: User.data_user.id,
  };

  dispatch(postReviews(productId, FormData)).then((response) => {
    console.log("response es: ", response)
    swal.fire({
      title: "Message",
      text: response.data,
      icon: "success",
      buttons: "Ok",
    })
  } )
  .catch((error) => {
    // console.log("error es: ", error)
    swal.fire({
      title: "Message",
      text: error.response.data,
      icon: "error",
      buttons: "Ok",
    })
  })      
  
  setRating("");
  setComment("");
  
}
};

const handleSubmit2 = (event) => {
  event.preventDefault();
 if( !rating || !comment){
  swal.fire({
    title: "Error",
    text: "You must complete all fields",
    icon: "warning",
    buttons: "Ok",
  });
 }
 else{
   const FormData = {
     score: parseInt(rating),
     comment:comment,
     idUser: User.data_user.id
   };
  dispatch(postReviews(productId,FormData)) 
  console.log("msg es:", msg)
  swal.fire({
    title: "Message",
    text: "Review",
    icon: "success", 
    buttons: "Ok",
  });
  
  setRating("");
  setComment("");
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}
};








  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  return(

    <div className="bg-gray-100 dark:bg-gray-800">

      <Header />

    <section class="text-gray-700 body-font overflow-hidden bg-gray-100 dark:bg-gray-800">

    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-400" src={details?.image} />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">{details?.brand.name}</h2>
          <h1 class="text-gray-900 dark:text-slate-100 text-3xl title-font font-medium mb-1 mt-3 uppercase">{details?.name}</h1>
          <div class="flex mb-4 mt-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-60 dark:text-gray-300 ml-3">12 Reviews</span>
          </span>
          
        </div>
        <p class="leading-relaxed dark:text-slate-100 mt-4">{details?.description}</p>
      
        <div class="flex">
          <span class="title-font font-medium text-4xl mt-48 text-gray-900 dark:text-slate-100">${details?.price}.00</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="flex flex-col gap-y-4 mb-8">
        <Reviews />
        
        <div className='contenedorReview'>
      <div className='Product'>
       {
        product?.map(p=>{
         return(
          <>
          <img className='imgProduct' src={p.image} />
           < p key={p.id} className='productName'>{p.name}</p>
          </>
         )
        })
       }
      </div>
     
      <form className='form-review'  onSubmit={handleSubmit}>
        <label htmlFor="" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>Score</label>
        <div className="rating">
        <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange} />
        <label htmlFor="star5"><FaStar /></label>
        <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange}/>
        <label htmlFor="star4"><FaStar /></label>
        <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange} />
        <label htmlFor="star3"><FaStar /></label>
        <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange}/>
        <label htmlFor="star2"><FaStar /></label>
        <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange} />
        <label htmlFor="star1"><FaStar /></label>
       </div>
      
       {error.rating && <p className="error">{error.rating}</p>}
        <label htmlFor="" className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name'>Comment</label>
        <textarea onBlur={handleBlurComment} className='rounded text-pink-500'  cols="30" rows="10" value={comment}  onChange={(event) => setComment(event.target.value)}></textarea>
        {error.comment && <p style={{ color: "red",  }}>{error.comment}</p>}
        <button className='send' >Send</button>
      </form>
    </div>
      </div>

      <Footer />

    </div>
    
  );
}

export default Details;
