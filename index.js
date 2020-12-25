import FootballLeague from './classes/PointsBasedLeague.js'
import EliminatoryFase from './classes/EliminatoryFase.js'
import { selecciones } from './teams.js'
import {LOCAL_TEAM, AWAY_TEAM} from './classes/League.js'

const config = { rounds: 1, groups: 8 }
const premier = new FootballLeague('Champions League', selecciones, config)

premier.organizeGroups()


console.log("GRUPOS Y EQUIPOS");
console.log("=========================================");


let i = 1

premier.groups.forEach(element => {
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

console.log("")
console.log("=========================================");
console.log("===========COMIENZA EL MUNDIAL===========");
console.log("=========================================");

premier.start()





console.log("=========================================");
console.log("==COMIENZO DE LA FASE DE ELIMINATORIAS===");
console.log("=========================================");




console.log("============OCTAVOS DE FINAL=============");
const eliminatoryFase = new EliminatoryFase()
eliminatoryFase.start(premier.groups)

console.log("============CUARTOS DE FINAL=============");

console.log("==============SEMIFINALES================");

console.log("==========TERCER Y CUARTO PUESTO=========");

console.log("=================FINAL===================");


console.log("=========================================");
console.log("¡XXXXX CAMPEÓN DEL MUNDO!");
console.log("=========================================");