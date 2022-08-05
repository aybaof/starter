import "./card.scss";
import React from "react";
import img1 from "../../assets/template/model1.jpg";
import {FcLike} from "react-icons/fc";

const Card = () => {
  return (
    <div className="card_wrapper">
      <div className="img_wrapper">
        <img src={img1}></img>
      </div>
      <div className="text_wrapper">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          congue metus et felis scelerisque sagittis. Aliquam erat volutpat. In
          aliquet augue eget accumsan eleifend. Nulla felis sem, lobortis ut
          libero feugiat, gravida pellentesque neque. In condimentum viverra
          porttitor. Proin tempus risus non enim iaculis, ut consectetur tortor
          fringilla. Fusce ut ultricies felis. Pellentesque in ipsum at metus
          accumsan tempor non sit amet nibh. Nam mattis pretium sodales. Nulla
          fermentum nulla velit, a faucibus tellus iaculis a. Sed eu felis
          feugiat, mattis mi ut, dapibus diam. Aliquam at accumsan lectus. Nam
          vel libero congue, dignissim velit ut, congue elit. Nullam sagittis.
        </p>
      </div>
      <div className="action_wrapper">
        <div className="button_wrapper">
            <button><FcLike></FcLike></button>
        </div>
      </div>
    </div>
  );
};

export default Card;
