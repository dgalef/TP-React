import {Match} from "./Match"
import {getData} from "../utils/conexionAPI.js"
import {useState,useEffect} from "react"

import "./Fixture.css"
import "./loader.css"

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
    const league_id = 9; // Copa America
    const season = 2024;

    const [groupsFixture, setGroupsFixture] = useState({
        A: [],
        B: [],
        C: [],
        D: [],
    });

    const [loading, setLoading] = useState(true); // Estado de carga inicialmente true

    const groups = {
        A: ["Argentina", "Canada", "Chile", "Peru"],
        B: ["Venezuela", "Ecuador", "Mexico", "Jamaica"],
        C: ["Uruguay", "Panama", "USA", "Bolivia"],
        D: ["Colombia", "Brazil", "Costa Rica", "Paraguay"],
    };

    const groupRounds = ["Group Stage - 1", "Group Stage - 2", "Group Stage - 3"];

    useEffect(() => {

        const fetchData = async () => {
            const data = await getData(`/fixtures?league=${league_id}&season=${season}`, "api_fixture");
            const matches = data.response;
            console.log(matches);

            const updatedGroupsFixture = {
                A: [],
                B: [],
                C: [],
                D: [], 
            };

            matches.forEach((match) => {
                const homeTeam = match.teams.home.name;
                const round = match.league.round;

                // Buscar a qué grupo pertenece el equipo local (home)
                Object.keys(groups).forEach((groupKey) => {
                    if (groups[groupKey].includes(homeTeam) && groupRounds.includes(round)) {
                        updatedGroupsFixture[groupKey].push(match);
                    }
                });
            });

            console.log(updatedGroupsFixture);

            updatedGroupsFixture.A.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
            updatedGroupsFixture.B.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
            updatedGroupsFixture.C.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
            updatedGroupsFixture.D.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

            setGroupsFixture(updatedGroupsFixture); // Actualizar el estado de los resultados de partidos
            setLoading(false);
        };

        fetchData();

    }, []); // Dependencia vacía para que se ejecute una vez al montar

   
    return (
        <div className="fixture">
         
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}

            
            <div className="content">
                {Object.keys(groupsFixture).map((groupKey) => (
                    <div className="group" key={groupKey}>
                        <h2>Grupo {groupKey}</h2>
                        {groupsFixture[groupKey].map((match) => (
                            <Match key={match.fixture.id} match={match} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
    
};