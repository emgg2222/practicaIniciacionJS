const LOCAL_TEAM = 0
const AWAY_TEAM = 1
import Journey from './Journey.js'
import Match from './Match.js'

export default class Group {
    constructor(name, teams )
    {
        this.name = name
        this.teams = teams
        this.journeys =[]
        
        
    }


    initSchedule(round) {
        const numberOfMatchDays = this.teams.length - 1
        const numberOfMatchesPerMatchDay = this.teams.length / 2
        
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []  // jornada vacía
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = new Match(['Equipo local', 'Equipo visitante'])  // partido
                matchDay.push(match)
            }
            // una vez añadidos todos los partidos a la jornada
         //   round = "Jornada " + (i+1)
         const journeyName = 'Jornada ' + (i+1)
         const journey = new Journey(journeyName, matchDay)
        round.push(journey)  // añadimos la jornada a la planificación
          //  round = null
        }
    }

    setLocalTeams(round) {
        const maxHomeTeams = this.teams.length - 2
        let teamIndex = 0

        round.forEach(journey => {
            
            journey.matches.forEach(match => {
                  // establecer el equipo local
                match[LOCAL_TEAM] = this.teams[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }

            });
        })
      

    }

    setAwayTeams(round) {
        const maxAwayTeams = this.teams.length - 2
        let teamIndex = maxAwayTeams
        round.forEach(journey => {
            let firstMatchFound = false
            journey.matches.forEach(match => {
                if (!firstMatchFound) {
                    firstMatchFound = true
                } else {
                    match[AWAY_TEAM] = this.teams[teamIndex]
                    teamIndex--
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams
                    }
                }
            })
        })
    }

    fixLastTeamSchedule(round) {
        let matchDayNumber = 1
        const lastTeamName = this.teams[this.teams.length - 1]
        round.forEach(journey => {
            const firstMatch = journey.matches[0]
            if (matchDayNumber % 2 == 0) { // si jornada par -> juega en casa
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else { // jornada impar -> juega fuera
                firstMatch[AWAY_TEAM] = lastTeamName
            }
            matchDayNumber++
        })
    }


    scheduleMatches()
    {

        const newRound = []
        this.initSchedule(newRound)
        this.setLocalTeams(newRound)
        this.setAwayTeams(newRound)
        this.fixLastTeamSchedule(newRound)

        this.journeys = newRound
    
        
    }
    
}