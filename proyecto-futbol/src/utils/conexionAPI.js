const API ="https://v3.football.api-sports.io"

export const getUrl = (path) =>{
    return fetch (API+path,{
        headers: {
            'x-rapidapi-key': 'e802866635be846647badd14e1819ca5',   // Esta API key tiene un limite diario de 100 consultas
            'x-rapidapi-host': 'v3.football.api-sports.io'
          }
    }).then((results)=>results.json())

}

// API key e802866635be846647badd14e1819ca5

/* getUrl("/discover/movie")
getUrl("/discover/tv")
 */