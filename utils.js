
  export default Array.prototype.shuffle = function()
    {
        var i = this.length;
        while (i)
        {
            var j = Math.floor(Math.random() * i);
            var t = this[--i];
            this[i] = this[j];
            this[j] = t;
        }
        return this;
    } 

    export function getGoals(max){
      return Math.round(Math.random() * max)        
  }
