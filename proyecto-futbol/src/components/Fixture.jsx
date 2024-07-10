import {Match} from "./Match"
import {getUrl} from "../utils/conexionAPI.js"
import{useState,useEffect} from "react"


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

    const [fixture,setFixture] = useState([])

    useEffect( () => {

        // Obtengo el listado completo de partidos
        getUrl(`/fixtures?league=${league_id}&season=${season}`).then( (data) => {
            const matches = data.response
            console.log(matches) 
            setFixture(matches)
        })

    },[])

    return (
        <div className="fixture">
            {fixture.map( (match) => (
                <Match key={match.fixture.id} match={match} />
            ) )}
        </div>
    )
    
}