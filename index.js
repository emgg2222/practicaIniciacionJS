import FootballLeague from './classes/PointsBasedLeague.js'
import { premierLeagueTeams } from './teams.js'

const config = { rounds: 2 }
const premier = new FootballLeague('Premier League', premierLeagueTeams, config)

const teamNames = premier.teams.map(team => team.name)
/*
teamNames.forEach(function(equipo) {
    console.log(equipo)
})
*/

premier.scheduleMatchDays()

let i = 1
premier.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i}`)
    matchDay.forEach(match => {
        console.log(match.join(' vs '))
    })
    i++
})
