import Utilities from '../utils.js'
import Group from './Group.js'
/*import Group from './css/Group.js' */

export const LOCAL_TEAM = 0
export const AWAY_TEAM = 1

export default class League {

    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.scheduleGroups = []
        this.teams = []
        this.groups = []
        this.setup(config)
        this.setupTeams(teams)
    }

    setup(config) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team)
        }
        this.teams.shuffle()
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0
        }
    }

    // Mi parte

    organizeGroups()  {
       
        const numTeamPerGroup = this.teams.length / this.config.groups
        let teamsPerGroup = []
        const groups = []
        let indexTeam = 0
        let numTeamSaveInGroup = 1
        let letterAscii = 65; //La letra del grupo empieza en A
        
        this.teams.forEach(team => {
            teamsPerGroup.push (team);  
            if(numTeamSaveInGroup == numTeamPerGroup)
            {                 
                const group = new Group("Grupo "+String.fromCharCode(letterAscii), teamsPerGroup)
                group.scheduleMatches()
                groups.push(group) 
                
                teamsPerGroup = []           
                letterAscii++
                numTeamSaveInGroup = 1
            } else 
             {           
                      
                numTeamSaveInGroup++
             }
            
            

        })    

        this.groups   = groups
    }

    getStandings(){
        throw new Error('updateStandings method not implemented')
    }

    play(match){

        throw new Error('play method not implemented')

    }

    updateTeams()
    {
        throw new Error('updateTeams method not implemented') 
    }

    start() {
        this.groups.forEach(group => {
            const matchDaySummary = {
                results: [],
                standings: null
            }           
            let jornada = 1
            group.matches.forEach(match => {
                console.log(group.name ,' - ', "Jornada ", jornada, ":" )
                console.log('-----------------------')
                match.forEach(element => {
                    const result = this.play(element)              
                    this.updateTeams(result)
                    matchDaySummary.results.push(result)
                    console.log(result.homeTeam.name," ", result.homeGoals, " - ", result.awayGoals, " ", result.awayTeam.name)                   
                })   
                jornada++       
                this.getStandings(group.teams)
                matchDaySummary.standings = group.teams.map(team => Object.assign({}, team))             
            
                console.table(matchDaySummary.standings.map( team => {
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
            group.results.push(matchDaySummary)         
        })

    }
}
