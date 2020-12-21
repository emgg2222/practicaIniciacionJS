import FootballLeague from './classes/PointsBasedLeague.js'
import { selecciones } from './teams.js'

const config = { rounds: 1, groups: 8 }
const premier = new FootballLeague('Champions League', selecciones, config)

const groups = premier.organizeGroups()
const LOCAL_TEAM = 0
const AWAY_TEAM = 1

console.log("GRUPOS Y EQUIPOS");
console.log("=========================================");


let i = 1

groups.forEach(element => {
    console.log("");
    console.log(element.name)
    console.log("--------------------------")
    element.teams.forEach(team => console.log(team.name))
    let jornada = 1
    element.matches.forEach(match=>
        {
            console.log("")
            console.log("Jornada", jornada)
            match.forEach(matchTeams=> {
                console.log(matchTeams[LOCAL_TEAM].name , ' vs ', matchTeams[AWAY_TEAM].name)
            })
            jornada++
        })
});
/* premier.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i}`)
    matchDay.forEach(match => {
        console.log(match.join(' vs '))
    })
    i++
}) */


console.log("=========================================");
console.log("===========COMIENZA EL MUNDIAL===========");
console.log("=========================================");




console.log("=========================================");
console.log("==COMIENZO DE LA FASE DE ELIMINATORIAS===");
console.log("=========================================");


console.log("============OCTAVOS DE FINAL=============");


console.log("============CUARTOS DE FINAL=============");

console.log("==============SEMIFINALES================");

console.log("==========TERCER Y CUARTO PUESTO=========");

console.log("=================FINAL===================");


console.log("=========================================");
console.log("¡XXXXX CAMPEÓN DEL MUNDO!");
console.log("=========================================");