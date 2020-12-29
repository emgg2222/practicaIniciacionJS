
import {LOCAL_TEAM, AWAY_TEAM} from './League.js'
import {getGoals} from '../utils.js'

const WINNER_OF_GROUP = 0
const SECOND_OF_GROUP = 1
export default class EliminatoryFase {
    constructor( )
    {
       this.matchSchedule = []
       this.results = []

        
    }

   
    playMatches(){
        this.matchSchedule.forEach(match => {
            let result = null
            do
            {
               result = this.play(match)
            }while(!result)
            console.log(result.homeTeam,  result.homeGoals, " - ", result.awayGoals,  result.awayTeam, " => ", result.winner)            
            this.results.push(result)
         })
    }

    play(match, sePuedeEmpatar = false)
    {   
        
        const homeGoals = getGoals(10)
        const awayGoals = getGoals(10)  
        let winner = ""
        let loser = ""

        if(homeGoals === awayGoals && !sePuedeEmpatar)
        {
            return false
        }  
        
        if(homeGoals > awayGoals)
        {
            winner = match[LOCAL_TEAM]
            loser = match[AWAY_TEAM]
        }else
        {
            winner = match[AWAY_TEAM]
            loser = match[LOCAL_TEAM]
        }

        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals,
            winner,
            loser
        }
    }

    getMatchScheduleToCuartosAndSemifinal(results){
        let x = 1
        let match1HomeTeam = ""
        let match2HomeTeam = ""
        results.forEach(result =>{
            if (x % 2 == 0) {
                if(match2HomeTeam == ""){
                    match2HomeTeam = result.winner
                }else
                {
                    this.matchSchedule.push([match2HomeTeam,result.winner])
                    match2HomeTeam = ""
                }                    
            }else 
            {
                if(match1HomeTeam == ""){
                    match1HomeTeam = result.winner
                }else
                {
                    this.matchSchedule.push([match1HomeTeam,result.winner])
                    match1HomeTeam = ""
                }                  
                
            }  
            x++           
        })
    }

    getMathcScheduleToWinners (results){
        let x = 1
        let homeTeam = ""
        let awayTeam = ""
        results.forEach(result =>{
            if (x == 1) {
                homeTeam = result.winner
                x++
            }else
            {
                awayTeam = result.winner
                this.matchSchedule.push([homeTeam,awayTeam])
                x = 1
            }             
        })
       
    }

    getMathcScheduleToLosers (results){
        let x = 1
        let homeTeam = ""
        let awayTeam = ""
        results.forEach(result =>{
            if (x == 1) {
                homeTeam = result.loser
                x++
            }else
            {
                awayTeam = result.loser
                this.matchSchedule.push([homeTeam,awayTeam])
                x = 1
            }             
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
                    match1.push(result.standings[SECOND_OF_GROUP].name)
                    match2.push(result.standings[WINNER_OF_GROUP].name)
                    this.matchSchedule.push (match1)
                    this.matchSchedule.push (match2)
                    match1 = []
                    match2 = []
                    x=1
                }else
                {
                    match1.push(result.standings[WINNER_OF_GROUP].name)
                    match2.push(result.standings[SECOND_OF_GROUP].name)                    
                    x++
                }                 
        /*         console.log("Equipo Ganador grupo", result.standings[0].name)
                console.log("Equipo Segundo grupo", result.standings[1].name) */
            })            
        });
        /* console.log("partidos", this.matchSchedule) */
    } 

    startOctavos(groups)
    {
        this.getMatchScheduleToOctavos(groups)
        this.playMatches()
    }
  
    startCuartos(resultsOctavos){
        this.getMatchScheduleToCuartosAndSemifinal(resultsOctavos)
        this.playMatches()
    }

    startSemifinals(resultsOctavos){
        this.getMatchScheduleToCuartosAndSemifinal(resultsOctavos)
        this.playMatches()
    }

    startThirdAndForthPlace(resultsSemifinals){
        this.getMathcScheduleToLosers(resultsSemifinals)
        this.playMatches()
    }

    startFinal(resultsSemifinals){
        this.getMathcScheduleToWinners(resultsSemifinals)
        this.playMatches()
    }

}