

function WatchProviders(
    data = {
        "link": "https://www.themoviedb.org/movie/713704-evil-dead-rise/watch?locale=US",
        "flatrate": [
            {
                "logo_path": "/6Q3ZYUNA9Hsgj6iWnVsw2gR5V6z.jpg",
                "provider_id": 1899,
                "provider_name": "Max",
                "display_priority": 7
            },
            {
                "logo_path": "/7TVfqxyWGqaJZM715IPHTwtgcXo.jpg",
                "provider_id": 1825,
                "provider_name": "Max Amazon Channel",
                "display_priority": 8
            },
            {
                "logo_path": "/xL9SUR63qrEjFZAhtsipskeAMR7.jpg",
                "provider_id": 358,
                "provider_name": "DIRECTV",
                "display_priority": 57
            }
        ],
        "rent": [
            {
                "logo_path": "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
                "provider_id": 2,
                "provider_name": "Apple TV",
                "display_priority": 5
            },
            {
                "logo_path": "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
                "provider_id": 10,
                "provider_name": "Amazon Video",
                "display_priority": 12
            },
            {
                "logo_path": "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
                "provider_id": 3,
                "provider_name": "Google Play Movies",
                "display_priority": 13
            },
            {
                "logo_path": "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
                "provider_id": 192,
                "provider_name": "YouTube",
                "display_priority": 14
            },
            {
                "logo_path": "/21dEscfO8n1tL35k4DANixhffsR.jpg",
                "provider_id": 7,
                "provider_name": "Vudu",
                "display_priority": 41
            },
            {
                "logo_path": "/shq88b09gTBYC4hA7K7MUL8Q4zP.jpg",
                "provider_id": 68,
                "provider_name": "Microsoft Store",
                "display_priority": 52
            },
            {
                "logo_path": "/gbyLHzl4eYP0oP9oJZ2oKbpkhND.jpg",
                "provider_id": 279,
                "provider_name": "Redbox",
                "display_priority": 53
            },
            {
                "logo_path": "/xL9SUR63qrEjFZAhtsipskeAMR7.jpg",
                "provider_id": 358,
                "provider_name": "DIRECTV",
                "display_priority": 57
            },
            {
                "logo_path": "/1tLCqSH5xiViDxMiTVWl6DmE8hd.jpg",
                "provider_id": 486,
                "provider_name": "Spectrum On Demand",
                "display_priority": 170
            }
        ]
    }
) {
    console.log("provider data: ", data )
    const url = "http://image.tmdb.org/t/p/w500";
    let streamers = data.data.flatrate;
    let renters = data.data.rent;
    console.log("streamers: ", streamers)
    console.log("renters: ", renters)



    return (
        <>
           <div className = "col-6 d-flex me-3">
               <div className = "me-5">
                   <img className = "movies-circle-img" src={url + streamers[1].logo_path} alt = "Not found" />
                   <p className = "a1-font-size-12px"> {streamers[1].provider_name}</p>
               </div>
               <div>
                   <img className = "movies-circle-img" src={url + streamers[2].logo_path} alt = "Not found" />
                   <p className = "a1-font-size-12px"> {streamers[2].provider_name}</p>
               </div>
           </div>

            <div className="col-6 d-flex">
                <div  className = "me-5">
                    <img className = "movies-circle-img" src={url + renters[3].logo_path} alt = "Not found" />
                    <p className = "a1-font-size-12px">  {renters[3].provider_name}</p>
                </div>
                <div>
                    <img className = "movies-circle-img" src={url + renters[4].logo_path} alt = "Not found" />
                    <p className = "a1-font-size-12px">  {renters[4].provider_name}</p>
                </div>


            </div>
        </>
    );
}

export default WatchProviders;