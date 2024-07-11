import {Link} from "react-router-dom"
//import "./MatchDetails.css"
import { Link } from "react-router-dom"
import { getData } from "../utils/conexionAPI.js"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const MatchDetails = () => {

    const [teams, setTeams] = useState({
        home: [],
        away: []
    });
    const { matchId }       = useParams()

    useEffect(() => {
        getData(`/fixtures/lineups?fixture=${matchId}`, "api_match").then((data) => {
            console.log(data);

            const updatedTeams = {
                home: [],
                away: []
            };

            updatedTeams.home = data.response[0];
            updatedTeams.away = data.response[1];
            //console.log(updatedTeams.away)
            setTeams(updatedTeams);
        });
    }, [matchId]);

    return (
        <>
        <p>Detalles del partido</p>
        <Link to="/"><button>Volver</button></Link>
        <div className="matchCard">

                <div className="team homeTeam">
                    <div className="teamName">{teams.home.team.name}</div>
                    { teams.home.startXI.map( (player) => (
                        <div className="player" key={player.player.id}>{player.player.name}</div>
                    ))}
                </div>

                <div className="team awayTeam">
                    <div className="teamName">{teams.away.team.name}</div>
                    { teams.away.startXI.map( (player) => (
                        <div className="player" key={player.player.id}>{player.player.name}</div>
                    ))}
                </div>

            </div>
            <Link to="/"><button>Volver</button></Link>
        </>
    )
}