import Utilities from '../utils.js'
import Group from './Group.js'
/*import Group from './css/Group.js' */

const LOCAL_TEAM = 0
const AWAY_TEAM = 1

export default class League {

    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.scheduleGroups = []
        this.setup(config)
        this.setupTeams(teams)
    }

    setup(config) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = []
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
               
                console.log ( "GRUPO ", String.fromCharCode(letterAscii))
                console.log("equipos", teamsPerGroup)  
                
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
     
        console.log("grupos", groups);   
    }
}
