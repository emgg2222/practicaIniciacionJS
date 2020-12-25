import League from './League.js'
import {LOCAL_TEAM, AWAY_TEAM} from './League.js'

export default class PointsBasedLeague extends League {
    constructor(name, teams=[], config={}) {
        super(name, teams, config)
    }

    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config)
    }

    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName)      
        return {
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        }
    }
    getGoals(max){
        return Math.round(Math.random() * max)        
    }

    play(match, sePuedeEmpatar = false)
    {
        const homeGoals = this.getGoals(10)
        const awayGoals = this.getGoals(10)
        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        }
    }

    getTeamByName(name)
    {
        return this.teams.find(team => team.name == name)
    }

    updateTeams(result)
    {
        
        const homeTeams = this.getTeamByName (result.homeTeam.name)
        const awayTeams = this.getTeamByName (result.awayTeam.name)

        if(homeTeams && awayTeams)
        {     
            homeTeams.goalsFor = result.homeGoals
            homeTeams.goalsAgainst = result.awayGoals
            awayTeams.goalsFor = result.awayGoals
            awayTeams.goalsAgainst = result.homeGoals        

            if(result.homeGoals > result.awayGoals )  // gana equipo local
            {
                homeTeams.points += this.config.pointsPerWin
                homeTeams.matchesWon +=1 
                awayTeams.points += this.config.pointsPerLose
                awayTeams.matchesLost +=1
            } else if( result.homeGoals < result.awayGoals)
            {
                awayTeams.points += this.config.pointsPerWin
                awayTeams.matchesWon+=1
                homeTeams.points += this.config.pointsPerLose
                homeTeams.matchesLost+=1

            }else
            {
                homeTeams.points += this.config.pointsPerDraw
                awayTeams.points += this.config.pointsPerDraw
                homeTeams.matchesDrawn +=1
                awayTeams.matchesDrawn +=1
            }
        }
    }

    getStandings(team) {
        team.sort(function(teamA, teamB) {
            if (teamA.points > teamB.points) {
                return -1
            } else if (teamA.points < teamB.points) {
                return 1
            } else { // empatan a puntosç
               const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
               const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst
               if (goalsDiffA > goalsDiffB) {
                   return -1
               } else if (goalsDiffA < goalsDiffB) {
                   return 1
               } else {
                   return 0
               }
            }
        })
    }
}
