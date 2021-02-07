import FootballLeague from './classes/PointsBasedLeague.js'
import EliminatoryFase from './classes/EliminatoryFase.js'
import { teams } from './teams.js'
import {LOCAL_TEAM, AWAY_TEAM} from './classes/League.js'

const config = { rounds: 1, groups: 8 }
const worldCup = new FootballLeague('World Cup', teams, config)

worldCup.organizeGroups()


console.log("GRUPOS Y EQUIPOS");
console.log("=========================================");


let i = 1

worldCup.groups.forEach(element => {
    console.log("");
    console.log(element.name)
    console.log("--------------------------")
    element.teams.forEach(team => console.log(team.name))
    
    element.journeys.forEach(journey=>
        {
            console.log("")
            console.log(journey.name, ":")
            
            journey.matches.forEach(matchTeams=> {
                console.log(matchTeams[LOCAL_TEAM].name , ' vs ', matchTeams[AWAY_TEAM].name)
            })
    
        })
});

console.log("")
console.log("=========================================");
console.log("===========COMIENZA EL MUNDIAL===========");
console.log("=========================================");

worldCup.start()

worldCup.groups.forEach(group => {     
      group.journeys.forEach(journey => {
        console.log(group.name ,' - ', journey.name, ":" )
        console.log('-----------------------')
   
         journey.matches.forEach(match => {
             const resultMatch = match.result[0]
             console.log(resultMatch.homeTeam.name," ", resultMatch.homeGoals, " - ", resultMatch.awayGoals, " ", resultMatch.awayTeam.name) 
         })
         console.table(journey.standings.map( team => {
                return {
                    Equipo: team.name,
                    Puntos: team.points,
                    'Goles a favor': team.goalsFor,
                    'Goles en contra': team.goalsAgainst,
                    'Diferencia goles': team.goalsFor - team.goalsAgainst
                }
            }
            ))     
      })
})


console.log("=========================================");
console.log("==COMIENZO DE LA FASE DE ELIMINATORIAS===");
console.log("=========================================");

const eliminatoryFase = new EliminatoryFase()
const firstGroup = eliminatoryFase.getMatchSchedule(worldCup.groups)

const resultsEliminatoryFase = eliminatoryFase.start(firstGroup);

resultsEliminatoryFase.forEach(resultEliminatoryFase => {

        console.log("")
        console.log("============",resultEliminatoryFase.name,"=============");
        resultEliminatoryFase.results.forEach(result => {
        console.log(result.homeTeam,  result.homeGoals, " - ", result.awayGoals,  result.awayTeam, " => ", result.winner)            

        })
    
        if(resultEliminatoryFase.isTheFinal) {
            console.log("");
            console.log("=========================================");
            console.log(resultEliminatoryFase.results[0].winner, " CAMPEÓN DEL MUNDO!");
            console.log("=========================================");
        }
    
    
})




