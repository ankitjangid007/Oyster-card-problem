
const BUS_COST = 1.80,
      MAX_FARE = 3.20,
      COST_ONLY_ZONE_ONE = 2.50,
      COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE = 2.00,
      COST_TWO_ZONES_INCLUDING_ZONE_ONE = 3.00,
      COST_TWO_ZONES_EXCLUDING_ZONE_ONE = 2.25;
      

const STATIONS = {
    Holborn: [1],
    Aldgate: [1],
    EarlsCourt: [1, 2],
    Hammersmith: [2],
    Arsenal: [2],
    Wimbledon: [3]
}


class OysterCard {
    constructor(credit = 0) {
        this.credit = credit;
        this.fare = 0;
        this.points = [];
    }
    
    getCredit() {
        return this.credit;
    }

    setCredit(amt) {
        const totalCredit = this.credit += amt;
        return totalCredit;
    }

    setDebit() {
        (this.credit >= this.fare ? this.credit -= this.fare : process.exit())
    }

    getCostByZone(zonesCrossed, isZoneOneCrossed) {
        if(zonesCrossed === 1 && isZoneOneCrossed) {
            return COST_ONLY_ZONE_ONE
        }
        if(zonesCrossed === 1 && !isZoneOneCrossed) {
            return COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE
        }
        if(zonesCrossed === 2 && isZoneOneCrossed) {
            return COST_TWO_ZONES_INCLUDING_ZONE_ONE
        }
        if(zonesCrossed === 2 && !isZoneOneCrossed) {
            return COST_TWO_ZONES_EXCLUDING_ZONE_ONE
        }
        if(zonesCrossed === 3) {
            return MAX_FARE
        }
        return MAX_FARE
    }

    swipeIn(station) {
        this.points.push(station)
        this.fare = MAX_FARE
        this.setDebit()
    }

    swipeOut() {
        this.getFinalCost()
        this.setDebit()
    }

    setNewJourney(nextStation) {
        this.points.push(nextStation);
    }

    setBusJourney() {
        this.fare = BUS_COST
        this.setDebit()
    }

    getZonesCrossed(from, to) {
        var minZoneVisited = 0;
        from.forEach(fromZone => {
            to.forEach(toZone => {
                // console.log(fromZone, toZone)
                var zonesVisited = Math.abs(fromZone - toZone)
                if(zonesVisited < minZoneVisited) {
                    minZoneVisited = zonesVisited
                }
                if(minZoneVisited === 1) {
                    return;
                }
            })
        })
        return minZoneVisited
    }

    in_array(needle, haystack) {
        for(let i = 0; i < haystack.length; i++) {
            if(haystack[i] === needle){
                return true
            }
            return false
        }
    }

    didZoneOneCrossed(from, to) {
        return ( from.length === 1 && this.in_array(1, from)) || (to.length === 1 && this.in_array(1, to))
    }

    getFinalCost() {
        if(this.points.length === 2) {
            this.setCredit(MAX_FARE);
            var zonesCrossed = this.getZonesCrossed(this.points[0], this.points[1]);
            var isZoneOneCrossed = this.didZoneOneCrossed(this.points[0], this.points[1]);
            var fare = this.getCostByZone(zonesCrossed, isZoneOneCrossed)
            this.fare = fare
        } else {
            this.fare = MAX_FARE
        }
    }
}

Object.defineProperty(OysterCard, 'STATIONS', {
    value: STATIONS,
    writable: false
});


export default OysterCard