function CurrentSeasonOverview (season) {

    if (season.season === null || season.season.overview.length === 0) {
        return (<></>)
    }
    return (
        <div className="row">
            <h5 className = "">Season {season.season.season_number} Overview: </h5>
            <p className = "full-column-paragraph">{season.season.overview}</p>
        </div>
    )
}
export default CurrentSeasonOverview;