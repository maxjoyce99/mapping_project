import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";
import NewUser from '../components/NewUserForm';
import  example_image1 from '../images/example_image1.jpg';
import  example_image2 from '../images/example_image2.jpg';
import  example_image3 from '../images/example_image3.jpg';
import  example_image4 from '../images/example_image4.jpg';
import  example_image5 from '../images/example_image5.jpg';
import  example_image6 from '../images/example_image6.jpg';
import  example_image7 from '../images/example_image7.jpg';
import  example_image8 from '../images/example_image8.jpg';
import  example_map from '../images/example_map.png';


const Home = () => {

    return (
      <div className="home">

        <div className='home_words'>
          <h3>Where Have I Been</h3> 
          <p>Thanks for visiting WhereHaveIBeen.com. Feel free to use the 
            site in any way you like! To see an example of how
              I imagined this site being used click the button to see my map.
              Below is an example of what a map could look like. With points of interest marked
              and when you click on them you can get a series of photos from that location.
          </p>

          <button>Click to see my map.</button>
        </div>

        <div className='example_images'>
          <img src={example_image1} className="example_image" alt="icons" ></img>
          <img src={example_image2} className="example_image" alt="icons" ></img>
          <img src={example_image3} className="example_image" alt="icons" ></img>
          <img src={example_image4} className="example_image" alt="icons" ></img>
          <img src={example_image5} className="example_image" alt="icons" ></img>
          <img src={example_image6} className="example_image" alt="icons" ></img>
          <img src={example_image7} className="example_image" alt="icons" ></img>
          <img src={example_image8} className="example_image" alt="icons" ></img>
        </div>
        <img className="example_map" src={example_map}></img>
      </div>
            
        )
    

}

export default Home;