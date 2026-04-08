const LikeButton = (props) => {
        console.log(props);
        const LikeToggler = () => {
        props.ToggleYouLike(!props.youLike);
  };

  
  return  <button onClick = {LikeToggler} >   {props.youLike ? "❤️ Liked" : "🤍 Like"}</button>



}
export default LikeButton