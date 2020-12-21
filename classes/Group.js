const LOCAL_TEAM = 0
const AWAY_TEAM = 1
export default class Group {
    constructor(name, teams )
    {
        this.name = name
        this.teams = teams
        this.matches = []
        
    }


    initSchedule(round) {
        const numberOfMatchDays = this.teams.length - 1
        const numberOfMatchesPerMatchDay = this.teams.length / 2
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []  // jornada vacía
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = ['Equipo local', 'Equipo visitante']  // partido
                matchDay.push(match)
            }
            // una vez añadidos todos los partidos a la jornada
            round.push(matchDay)  // añadimos la jornada a la planificación
        }
    }

    setLocalTeams(round) {
        const maxHomeTeams = this.teams.length - 2
        let teamIndex = 0
        round.forEach(matchDay => { // por cada jornada
            matchDay.forEach(match => { // por cada partido de cada jornada
                // establecer el equipo local
                match[LOCAL_TEAM] = this.teams[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }
            })
        })
    }

    setAwayTeams(round) {
        const maxAwayTeams = this.teams.length - 2
        let teamIndex = maxAwayTeams
        round.forEach(matchDay => {
            let firstMatchFound = false
            matchDay.forEach(match => {
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
        round.forEach(matchDay => {
            const firstMatch = matchDay[0]
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

        this.matches = newRound
    
        
    }
    
}