export default class EliminatoryFase {
    constructor()
    {
       this.matchSchedule = []
       this.results = []
        
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

}