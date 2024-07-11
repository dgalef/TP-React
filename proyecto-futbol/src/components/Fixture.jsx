import {Match} from "./Match"
import {getData} from "../utils/conexionAPI.js"
import {useState,useEffect} from "react"


import "./Fixture.css"
import "./loader.css"

export const Fixture = () => {
    const league_id = 9; // Copa America
    const season = 2024;

    const [groupsFixture, setGroupsFixture] = useState({
        A: [],
        B: [],
        C: [],
        D: [],
    });

    const [knockoutFixture, setKnockoutFixture] = useState({
        quarterFinals: [],
        semiFinals: [],
        thirdPlace: [],
        final: null,
    });

    const [loading, setLoading] = useState(true); 

    const groups = {
        A: ["Argentina", "Canada", "Chile", "Peru"],
        B: ["Venezuela", "Ecuador", "Mexico", "Jamaica"],
        C: ["Uruguay", "Panama", "USA", "Bolivia"],
        D: ["Colombia", "Brazil", "Costa Rica", "Paraguay"],
    };

    const groupRounds = ["Group Stage - 1", "Group Stage - 2", "Group Stage - 3"];
    const knockoutRounds = ["Quarter-finals", "Semi-finals", "Third Place", "Final"];

    useEffect(() => {

        const fetchData = async () => {
            const groupsData = await getData(`/fixtures?league=${league_id}&season=${season}`, "api_fixture");
            const groupMatches = groupsData.response;

            const updatedGroupsFixture = {
                A: [],
                B: [],
                C: [],
                D: [],
            };

            groupMatches.forEach((match) => {
                const homeTeam = match.teams.home.name;
                const round = match.league.round;

                Object.keys(groups).forEach((groupKey) => {
                    if (groups[groupKey].includes(homeTeam) && groupRounds.includes(round)) {
                        updatedGroupsFixture[groupKey].push(match);
                    }
                });
            });

            Object.keys(updatedGroupsFixture).forEach((groupKey) => {
                updatedGroupsFixture[groupKey].sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
            });

            setGroupsFixture(updatedGroupsFixture);

            const knockoutData = await getData(`/fixtures?league=${league_id}&season=${season}`);
            const knockoutMatches = knockoutData.response;

            const updatedKnockoutFixture = {
                quarterFinals: [],
                semiFinals: [],
                thirdPlace: [],
                final: null,
            };

            knockoutMatches.forEach((match) => {
                const round = match.league.round;

                if (round === "Quarter-finals") {
                    updatedKnockoutFixture.quarterFinals.push(match);
                } else if (round === "Semi-finals") {
                    updatedKnockoutFixture.semiFinals.push(match);
                } else if (round === "Third Place") {
                    updatedKnockoutFixture.thirdPlace.push(match);
                } else if (round === "Final") {
                    updatedKnockoutFixture.final = match;
                }
            });

            setKnockoutFixture(updatedKnockoutFixture);

            setLoading(false);
        };

        fetchData();

    }, []); 

    return (
        <div className="fixture">
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            
            <div className="content">
                <div className="row">
                    {Object.keys(groupsFixture).map((groupKey) => (
                        <div className="group" key={groupKey}>
                            <h2>Grupo {groupKey}</h2>
                            {groupsFixture[groupKey].map((match) => (
                                <Match key={match.fixture.id} match={match} />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="row">
                    <div className="knockout-stage">
                        <h2>Quarter-finals</h2>
                        {knockoutFixture.quarterFinals.map((match) => (
                            <Match key={match.fixture.id} match={match} />
                        ))}
                    </div>
                    <div className="knockout-stage">
                        <h2>Semi-finals</h2>
                        {knockoutFixture.semiFinals.map((match) => (
                            <Match key={match.fixture.id} match={match} />
                        ))}
                    </div>
                    <div className="knockout-stage third-place-final">
                        <h2>Tercer Puesto</h2>
                        {knockoutFixture.thirdPlace.map((match) => (
                            <Match key={match.fixture.id} match={match} />
                        ))}
                        <h2>Final</h2>
                        {knockoutFixture.final && (
                            <Match key={knockoutFixture.final.fixture.id} match={knockoutFixture.final} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fixture;

/*import {Match} from "./Match"
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

/*export const Fixture = () => {
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

            setGroupsFixture(updatedGroupsFixture);
            setLoading(false);
        };

        fetchData();

    }, []);   
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
    
};*/