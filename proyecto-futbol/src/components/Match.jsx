import {Link} from "react-router-dom"
import "./Match.css"

export const Match = ( {match} ) => {

    // Fixture ID
    const id            = match.fixture.id
    // Equipo local
    const home_name     = match.teams.home.name
    const home_logo     = match.teams.home.logo
    const home_score    = match.goals.home

    // Equipo visitante
    const away_name     = match.teams.away.name
    const away_logo     = match.teams.away.logo
    const away_score    = match.goals.away
console.log(match)
    return (
        <Link to={`/match/${id}`}>
            <div className="match">
                <div className="home">
                    <img src={home_logo} alt={home_name} className="logo" />
                    <span className="name">{home_name}</span>
                    <span className="score">{home_score !== null ? home_score : "-" }</span>
                </div>
                <div className="away">
                    <img src={away_logo} alt={away_name} className="logo" />
                    <span className="name">{away_name}</span>
                    <span className="score">{away_score !== null ? away_score : "-" }</span>
                </div>
            </div>
        </Link>
    )
}