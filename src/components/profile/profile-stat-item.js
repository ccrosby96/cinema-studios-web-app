function ProfileStatItem ({label, number}) {
    return (
        <div className = "container text-center">
            <h4 className = "white-font mb-0">{number}</h4>
            <p className = "grey-text mt-0"> {label}</p>
        </div>
    )
}
export default ProfileStatItem