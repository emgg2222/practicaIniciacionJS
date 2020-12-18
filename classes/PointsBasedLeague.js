import League from './League.js'

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
        // customizedTeam.points = 0
        // customizedTeam.goalsFor = 0
        // customizedTeam.goalsAgainst = 0
        // return customizedTeam
        return {
            goints: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        }
    }
}
