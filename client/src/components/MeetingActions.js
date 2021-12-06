import React from "react";
import styled from "styled-components";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddCommentIcon from "@mui/icons-material/AddComment";
// import { FaRegComment } from "react-icons/fa";
// import { BsArrowLeftRight } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
// import { FiShare } from "react-icons/fi";
// import { FcLike } from "react-icons/fc";

const MeetingActions = ({ meeting }) => {
  //   const [numOfLikes, setNumOfLikes] = useState(null);

  //   const [isLiked, setIsLiked] = useState(false);

  //   const handleToggleLike = () => {
  //     setIsLiked(!isLiked);
  //     setNumOfLikes((n) => (isLiked ? n - 1 : n + 1));
  //   };

  return (
    // <DivAction>
    //   <Button>
    //     {/* <FaRegComment /> */}
    //   </Button>
    //   <Button>
    //     {/* <BsArrowLeftRight /> */}
    //   </Button>
    //   {/* <Button onClick={handleToggleLike}>
    //     {!isLiked ? <AiOutlineHeart /> : <FcLike />} {numOfLikes} */}
    //   </Button>
    //   <Button>
    //     {/* <FiShare /> */}
    //   </Button>
    // </DivAction>
    <Wrapper>
      <Button>
        <HowToRegIcon />
        {meeting.players}
      </Button>
      <Button>
        <AddCommentIcon />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default MeetingActions;

const Button = styled.button`
  cursor: pointer;
  margin: 5px;
`;

// const DivAction = styled.div`
//   margin-top: 10px;
//   margin-left: 125px;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   border: none;
//   background-color: transparent;
//   font-size: 20px;
//   margin-right: 100px;
//   cursor: pointer;
// `;
