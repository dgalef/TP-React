import {Match} from "./Match"
import {getUrl} from "../utils/conexionAPI.js"
import {useState,useEffect} from "react"


import "./Fixture.css"

// Get all available rounds from one {league} & {season}
// get("https://v3.football.api-sports.io/fixtures/rounds?league=39&season=2019");

// Get current round from one {league} & {season}
// get("https://v3.football.api-sports.io/fixtures/rounds?league=39&season=2019&current=true");

// Fixture completo (partidos)
// https://v3.football.api-sports.io/fixtures?league=39&season=2019

/*
name: "Argentina"
id: 26
code: "AR"
flag: "https://media.api-sports.io/flags/ar.svg"
*/

export const Fixture = () => {

    const league_id = 9 // Copa America
    const season   = 2024

    const [groupsFixture, setGroupsFixture] = useState({
        A: [],
        B: [],
        C: [],
        D: []
    })

    const groups = {
        A: ["Argentina", "Canada", "Chile", "Peru"],
        B: ["Venezuela", "Ecuador", "Mexico", "Jamaica"],
        C: ["Uruguay", "Panama", "USA", "Bolivia"],
        D: ["Colombia", "Brazil", "Costa Rica", "Paraguay"]
    }
    const groupRounds = [
        "Group Stage - 1",
        "Group Stage - 2",
        "Group Stage - 3"
    ]
    

    useEffect( () => {

        // Obtengo el listado completo de partidos
        getUrl(`/fixtures?league=${league_id}&season=${season}`).then( (data) => {
            const matches = data.response
            console.log(matches) 

            matches.map( (match) => {
                const homeTeam = match.teams.home.name
                const round = match.league.round

                // Buscar a qué grupo pertenece el equipo local (home)
                Object.keys(groups).forEach(groupKey => {
                    if (groups[groupKey].includes(homeTeam) && groupRounds.includes(round)) {
                        groupsFixture[groupKey].push(match);
                    }
                });
            })

            console.log(groupsFixture) 
            setGroupsFixture(groupsFixture)
        })

    },[])

    return (
        <div className="fixture">
            {
                Object.keys(groupsFixture).map(groupKey => (
                    <div className="group" key={groupKey}>
                        <h2>Grupo {groupKey}</h2> 
                        {groupsFixture[groupKey].map(match => (
                            <Match key={match.fixture.id} match={match} />
                        ))}
                        
                    </div>
                ))
            }
        </div>
    )
    
}
