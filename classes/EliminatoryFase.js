import getGoals from '../utils.js'
import {LOCAL_TEAM, AWAY_TEAM} from './League.js'
export default class EliminatoryFase {
    constructor( )
    {
       this.matchSchedule = []
       this.results = []

        
    }

    startOctavos(groups)
    {
        this.getMatchScheduleToOctavos(groups)
        this.playMatches()
       

     
        

    }

    playMatches(){
        this.matchSchedule.forEach(match => {
            const result = this.play(match)
            console.log(result.homeTeam,  result.homeGoals, " - ", result.awayGoals,  result.awayTeam, " => ", result.winner)
            this.results.push(result)
         })
    }

    getMatchScheduleToOctavos (groups)
    {
       let match1 = []
       let match2 = []
       let x=1

        groups.forEach(group => {
                   
            group.results.forEach(result => {
                if(x == 2){
                    match1.push(result.standings[1].name)
                    match2.push(result.standings[0].name)
                    this.matchSchedule.push (match1)
                    this.matchSchedule.push (match2)
                    match1 = []
                    match2 = []
                    x=1
                }else
                {
                    match1.push(result.standings[0].name)
                    match2.push(result.standings[1].name)                    
                    x++
                }                 
        /*         console.log("Equipo Ganador grupo", result.standings[0].name)
                console.log("Equipo Segundo grupo", result.standings[1].name) */
            })
            
        });
        /* console.log("partidos", this.matchSchedule) */

    } 

    getGoals(max){
        return Math.round(Math.random() * max)        
    }

   

    play(match, sePuedeEmpatar = false)
    {   
        
        const homeGoals = this.getGoals(10)
        const awayGoals = this.getGoals(10)  
        let winner = ""

        if(homeGoals == awayGoals && !sePuedeEmpatar)
        {
            this.play(match)
        }  
        
        if(homeGoals > awayGoals)
        {
            winner = match[LOCAL_TEAM]
        }else
        {
            winner = match[AWAY_TEAM]
        }

        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals,
            winner
        }
    }

    getMatchScheduleToCuartos(results){
        let x = 1
        let homeTeam = ""
        let awayTeam = ""
        results.forEach(result =>{
            console.log ( result)
            if (x == 1) {
                homeTeam = result.winner
                x++
            }else
            {
                awayTeam = result.winner
                this.matchSchedule.push([homeTeam,awayTeam])
                x = 1
            }
            
            this.matchSchedule.p
        })
    }

    startCuartos(resultsOctavos){
        this.getMatchScheduleToCuartos(resultsOctavos)
        this.playMatches()
    }

}