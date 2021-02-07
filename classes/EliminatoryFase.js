
import {LOCAL_TEAM, AWAY_TEAM} from './League.js'
import {getGoals} from '../utils.js'
import EliminatoryFasePlayed from './EliminatoryFasePlayed.js'

const WINNER_OF_GROUP = 0
const SECOND_OF_GROUP = 1
const ROUND_OF_16 = "OCTAVOS DE FINAL"
const ROUND_OF_8 = "CUARTOS DE FINAL"
const SEMIFINAL = "SEMIFINAL"
const THRID_AND_FORTH = "TERCER Y CUARTO PUESTO"
const FINAL = "FINAL"
export default class EliminatoryFase {
    constructor(  )
    {
       this.eliminatoryFases = []        
    }
   
    playMatches(matchSchedule){
        let results = []
        matchSchedule.forEach(match => {
            let result = null            
            do {
               result = this.play(match)
            }while(!result)
            
            results.push(result)
         })
         return results
    }

    play(match, canBeTied = false) {   
        
        const homeGoals = getGoals(10)
        const awayGoals = getGoals(10)  
        let winner = ""
        let loser = ""

        if(homeGoals === awayGoals && !canBeTied) {
            return false
        }  
        
        if(homeGoals > awayGoals) {
            winner = match[LOCAL_TEAM]
            loser = match[AWAY_TEAM]
        }else {
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
   
    getMathcScheduleToWinners (results){
        let x = 1
        let homeTeam = ""
        let awayTeam = ""
        let matchSchedule = []
        results.forEach(result =>{
            if (x == 1) {
                homeTeam = result.winner
                x++
            }else
            {
                awayTeam = result.winner
                matchSchedule.push([homeTeam,awayTeam])
                x = 1
            }             
        })      
        return matchSchedule 
    }

    getMathcScheduleToLosers (results){
        let x = 1
        let homeTeam = ""
        let awayTeam = ""
        let matchSchedule = []
        results.forEach(result =>{
            if (x == 1) {
                homeTeam = result.loser
                x++
            }else
            {
                awayTeam = result.loser
                matchSchedule.push([homeTeam,awayTeam])
                x = 1
            }             
        })      
        return matchSchedule 
    }

    getMatchSchedule (groups)
    {
       let match1 = []
       let match2 = []
       let matchSchedule = []
       let x=1

        groups.forEach(group => {                   
            group.results.forEach(result => {
                if(x == 2){
                    match1.push(result.standings[SECOND_OF_GROUP].name)
                    match2.push(result.standings[WINNER_OF_GROUP].name)
                    matchSchedule.push (match1)
                    matchSchedule.push (match2)
                    match1 = []
                    match2 = []
                    x=1
                }else
                {
                    match1.push(result.standings[WINNER_OF_GROUP].name)
                    match2.push(result.standings[SECOND_OF_GROUP].name)                    
                    x++
                }                 
            })            
        });
        return matchSchedule
    } 

    createNewEliminatoryFase(name,groups, isTheFinal = 0)
    {
        const fase = new EliminatoryFasePlayed(name)    
        fase.matchSchedule = groups
        fase.results = this.playMatches(fase.matchSchedule)
        fase.isTheFinal = isTheFinal
        this.eliminatoryFases.push(fase)
        return fase
    }

    start(groups)
    {
        let faseEliminatoryName = ""        
        let fase = null

        while(groups.length > 1)
        {
            if (groups.length === 2)
            {
                faseEliminatoryName = SEMIFINAL;
                fase = this.createNewEliminatoryFase(faseEliminatoryName, groups)
            
                const losersGroups = this.getMathcScheduleToLosers(fase.results)
                faseEliminatoryName = THRID_AND_FORTH
                const loosersFase = this.createNewEliminatoryFase(faseEliminatoryName, losersGroups)
    
                const winnersGroups = this.getMathcScheduleToWinners(fase.results)
                faseEliminatoryName = FINAL
                const isTheFinal = 1
                const winnersFase = this.createNewEliminatoryFase(faseEliminatoryName, winnersGroups, isTheFinal)   
                
                groups = []                
    
            } else {
                switch(groups.length){
                    case 8:
                        faseEliminatoryName = ROUND_OF_16;
                        break
                    case 4:
                        faseEliminatoryName = ROUND_OF_8;
                        break                    
                }  
                fase = this.createNewEliminatoryFase(faseEliminatoryName, groups)
                groups = this.getMathcScheduleToWinners(fase.results)                
            }            
        }    

        return this.eliminatoryFases    
    }   
}