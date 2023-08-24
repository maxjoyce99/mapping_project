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
import { useNavigate } from 'react-router';


const Home = () => {

    const navigate = useNavigate();

    const myMapClicked = () => {
      console.log("MyMapClicked");
      navigate("/map", {state: {userId: "64e653532e7d4c3970cb3dd1"}});
    }

    return (
      <div className="home">

        <div className='home_words'>
          <h3>Where Have I Been</h3> 
          <p>Thanks for visiting WhereHaveIBeen.com, a location based pictures sharing
            website. Make an account and add LocationDetails and pictures, and share this with
            your friends on the site. To see an example of how
              I imagined this site being used click the button to see my map.
              Below is an example of what a map could look like. With points of interest marked.
              When you click on them you get a series of photos from that location.
          </p>

          <button onClick={myMapClicked}>My Map</button>
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