import {Match} from "./Match"
import {getData} from "../utils/conexionAPI.js"
import {useState,useEffect} from "react"

import copaImg from "../assets/COPA_America_Trophy.jpg" 
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
        thirdPlace: null,
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

            console.log(groupsData);

            const updatedGroupsFixture = {
                A: [],
                B: [],
                C: [],
                D: [],
            };

            const updatedKnockoutFixture = {
                quarterFinals: [],
                semiFinals: [],
                thirdPlace: null,
                final: null,
            };

            groupMatches.forEach((match) => {
                const homeTeam = match.teams.home.name;
                const round = match.league.round;

                Object.keys(groups).forEach((groupKey) => {
                    if (groups[groupKey].includes(homeTeam) && groupRounds.includes(round)) {
                        updatedGroupsFixture[groupKey].push(match);
                    }
                });

                if (round === "Quarter-finals") {
                    updatedKnockoutFixture.quarterFinals.push(match);
                } else if (round === "Semi-finals") {
                    updatedKnockoutFixture.semiFinals.push(match);
                } else if (round === "3rd Place Final") {
                    updatedKnockoutFixture.thirdPlace = match;
                } else if (round === "Final") {
                    updatedKnockoutFixture.final = match;
                }
            });

            Object.keys(updatedGroupsFixture).forEach((groupKey) => {
                updatedGroupsFixture[groupKey].sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
            });

            setGroupsFixture(updatedGroupsFixture);
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

                <div className="row playoffs">
                    <div className="knockout-stage quarter">
                        <h2>Cuartos de final</h2>
                        {knockoutFixture.quarterFinals.map((match) => (
                            <div className="match-wrapper" key={match.fixture.id}>
                                <Match key={match.fixture.id} match={match} />
                            </div>
                        ))}
                    </div>
                    <div className="knockout-stage semifinals">
                        <h2>Semifinales</h2>
                        {knockoutFixture.semiFinals.map((match) => (
                            <div className="match-wrapper" key={match.fixture.id} >
                                <Match key={match.fixture.id} match={match} />
                            </div>
                        ))}
                    </div>
                    <div className="knockout-stage third-place-final">
                        <h2 className="third-place-heading">Tercer y Cuarto Puesto</h2>
                        {knockoutFixture.thirdPlace && (
                            <div className="match-wrapper third-place" key={knockoutFixture.thirdPlace.fixture.id}>
                            <Match key={knockoutFixture.thirdPlace.fixture.id} match={knockoutFixture.thirdPlace} />
                            </div>
                        )}
                      
                        <h2>Final</h2>
                        <img src={copaImg} className="trophy" alt="Trofeo Copa América"/>
                        {knockoutFixture.final && (
                            <div className="match-wrapper final" key={knockoutFixture.final.fixture.id}> 
                            <Match key={knockoutFixture.final.fixture.id} match={knockoutFixture.final} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
