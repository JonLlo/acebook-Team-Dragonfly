// const LikeButton = (props) => {
//         console.log(props);
//         const LikeToggler = () => {
//         props.ToggleYouLike(!props.youLike);
//   };

  
//   return  <button onClick = {LikeToggler} >   {props.youLike ? "❤️ Liked" : "🤍 Like"}</button>



// }


// LikeButton.jsx
const LikeButton = ({ youLike, ToggleYouLike }) => {
  return (
    <button onClick={() => ToggleYouLike(!youLike)}>
      {youLike ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
};

export default LikeButton