import style from "../../styles/card-hover.css"
function ProfileFavoriteItem({favorite}) {
    const url = "https://image.tmdb.org/t/p/w500";
    let poster_path = favorite.posterPic
        ? url +  favorite.posterPic
        : "https://media.istockphoto.com/id/1039351052/vector/movie-and-film-festival-poster-template-design-modern-retro-vintage-style.jpg?s=612x612&w=0&k=20&c=aPVSLX7VlJj7DYBZ8afyj9ca15qoZEeZkLj_1exaUfE="
    const title = favorite.movieTitle;

    return (

        <div className="hover-card-container">
            <img
                src= {poster_path}
                alt="Not Found"
                className = "rounded-3 img-fluid"/>
            <div className = " p-2 m-0 rounded-bottom-3">
                <span className="title a1-font-16px mb-0 pb-0 white-font">{title}</span>
            </div>
        </div>
    );
}
export default ProfileFavoriteItem;
