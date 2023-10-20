import {Link} from "react-router-dom";
import {getDirectors} from "../../helper_functions/helper_functions";
function Directors ({data}) {

    if (data === null || data.length === 0){
        return (<></>)
    }
    const directorArr = getDirectors(data)
    if (directorArr === null || directorArr.length === 0){
        return (<></>)
    }
    const director = directorArr[0]

    return (
        <div>
            <Link className = "text-decoration-none m-0 p-0" to = {`/actors/actor/${director.id}`}>
                <p className = "white-font">{director.name}</p>
            </Link>
        </div>
    )
}
export default Directors