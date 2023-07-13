import NavigationSidebar from "../navigation";
import MovieBox from "../movie_box";
function Home() {

    return (
        <>
            <div className="row p-0 m-0">
                <NavigationSidebar/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                        <div className="col-sm">
                            <MovieBox/>
                        </div>
                    </div>
                </div>


                yoyo


            </div>
        </>
    );
}

export default Home;