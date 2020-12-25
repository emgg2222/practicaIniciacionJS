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
eliminatoryFase.startOctavos(premier.groups)

console.log("============CUARTOS DE FINAL=============");

const cuartosFase = new EliminatoryFase()
cuartosFase.startCuartos(eliminatoryFase.results)


console.log("==============SEMIFINALES================");

const semifinalsFase = new EliminatoryFase()
semifinalsFase.startSemifinals(cuartosFase.results)

console.log("==========TERCER Y CUARTO PUESTO=========");

const thirdAndForthPlace = new EliminatoryFase()
thirdAndForthPlace.startThirdAndForthPlace(semifinalsFase.results)

console.log("=================FINAL===================");

const finalMatch = new EliminatoryFase()
finalMatch.startFinal(semifinalsFase.results)

console.log("=========================================");
console.log(finalMatch.results[0].winner, " CAMPEÓN DEL MUNDO!");
console.log("=========================================");