import FootballLeague from './classes/PointsBasedLeague.js'
import { selecciones } from './teams.js'

const config = { rounds: 2 }
const premier = new FootballLeague('Champions League', selecciones, config)

/* const teamNames = premier.teams.map(team => team.name) */
/*
teamNames.forEach(function(equipo) {
    console.log(equipo)
})
*/

premier.scheduleMatchDays()

console.log("GRUPOS Y EQUIPOS");
console.log("=========================================");
let i = 1
premier.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i}`)
    matchDay.forEach(match => {
        console.log(match.join(' vs '))
    })
    i++
})


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