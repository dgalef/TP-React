import { Link } from "react-router-dom"
import { getData } from "../utils/conexionAPI.js"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import "./MatchDetails.css"

export const MatchDetails = () => {

    const [teams, setTeams] = useState({
        home: {},
        away: {}
    });

    const [match, setMatch] = useState({});
    const [loading, setLoading] = useState(true); 

    const { matchId }       = useParams()
   
    useEffect(() => {

        const fetchData = async () => {

            const matchData = await getData(`/fixtures?id=${matchId}`, `api_match_${matchId}`);
            const lineupData = await getData(`/fixtures/lineups?fixture=${matchId}`, `api_lineup_${matchId}`);
            //console.log(data);

            const updatedTeams = {
                home: {},
                away: {}
            };

            updatedTeams.home = lineupData.response[0];
            updatedTeams.away = lineupData.response[1]; 
            
            console.log(updatedTeams)
            console.log(matchData)
            
            setTeams(updatedTeams);
            setMatch(matchData.response[0])

            setLoading(false);
        };

        fetchData();

    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras los datos se están obteniendo
    }

    return (
        <>
            <div className="matchCard">
            <div className="team homeTeam">
                    <div className="teamName">
                        {teams.home.team.name}
                        <div className="score">{match.goals.home}</div>
                    </div>
                    { teams.home.startXI.map( (player) => (
                        <div className="player" key={player.player.id}>{player.player.name}</div>
                    ))}
                </div>

                <div className="team awayTeam">
                    <div className="teamName">
                        {teams.away.team.name}
                        <div className="score">{match.goals.away}</div>
                    </div>
                    { teams.away.startXI.map( (player) => (
                        <div className="player" key={player.player.id}>{player.player.name}</div>
                    ))}
                </div>


            </div>
            <Link to="/"><button>Volver</button></Link>
        </>
    )
}
