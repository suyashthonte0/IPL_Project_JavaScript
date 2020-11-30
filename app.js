// Read Matches Data
function getMatchesData() {
    let fs = require('fs');
    let data = fs.readFileSync("matches.csv");
    let bufferString = data.toString(); 
    //Store information for each individual person in an array index. Split it by every newline in the csv file. 
    let arr = bufferString.split('\n'); 
    let jsonObjOfMatches = [];
    let headers = arr[0].split(',');
    for(let i = 1; i < arr.length; i++) {
        let data = arr[i].split(',');
        let obj = {};
        for(let j = 0; j < data.length; j++) {
            obj[headers[j]] = data[j];
        }
        jsonObjOfMatches.push(obj);
    }
    return jsonObjOfMatches;
}
  

// Read Deliveries Data
function getDeliveriesData() {
    let fs = require('fs');
    let data = fs.readFileSync("deliveries.csv");
    let bufferString = data.toString(); 
    let arr = bufferString.split('\n'); 
    let jsonObjOfDeliveries = [];
    let headers = arr[0].split(',');
    for(let i = 1; i < arr.length; i++) {
        let data = arr[i].split(',');
        let obj = {};
        for(let j = 0; j < data.length; j++) {
            obj[headers[j]] = data[j];
        }
        jsonObjOfDeliveries.push(obj);
    }
    return jsonObjOfDeliveries;
}

// *****************             Method 1             **********************
function findTheNumberOfMatchesPlayedPerYear(matches) {
    let noOfMatchesPlayedPerYear = {};
    for(let match of matches) {
        if(match.season in noOfMatchesPlayedPerYear) {
            noOfMatchesPlayedPerYear[match.season] = noOfMatchesPlayedPerYear[match.season] + 1;
        }
        else {
            noOfMatchesPlayedPerYear[match.season] = 1;
        }
    }
    for(key in noOfMatchesPlayedPerYear) {
        console.log("No of Matches played in the year " + key + " is : " + noOfMatchesPlayedPerYear[key]);
    }
    console.log("\n");
}

// *****************             Method 2             **********************
function findTheNumberOfMatchesWon(matches) {
    let noOfMatchesWon = {};
    for(let match of matches) {
        if(match.team1 in noOfMatchesWon) {
            if(match.team1 == match.winner) {
                noOfMatchesWon[match.team1] = noOfMatchesWon[match.team1] + 1;
            }
        }
        else {
            if(match.team1 === match.winner) {
                noOfMatchesWon[match.team1] = 1;
            }
        }
    }
    for(key in noOfMatchesWon) {
        console.log("No of Matches Won by " + key + " is : " + noOfMatchesWon[key]);
    }
    console.log("\n");
}

// *****************             Method 3             **********************
function findExtraRunsConcededInYear2016(matches,deliveries) {
    let idArray = [];
    let extraRunsConceded = {};
    for(let match of matches) {
        if(match.season == "2016") {
            idArray.push(match.id)
        }
    }
    for(let delivery of deliveries) {
        for(let ids of idArray) {
            if(delivery.match_id == ids) {
                if(delivery.bowling_team in extraRunsConceded) {
                    extraRunsConceded[delivery.bowling_team] = parseInt(extraRunsConceded[delivery.bowling_team]) + parseInt(delivery.extra_runs);
                }
                else {
                    extraRunsConceded[delivery.bowling_team] = parseInt(delivery.extra_runs);
                }
            }
        }
    }
    for(key in extraRunsConceded) {
        console.log("Total Extra Runs conceded by " + key + " in the year 2016 is : " + extraRunsConceded[key]);
    }
    console.log("\n");
}

// *****************             Method 4             **********************
function findTopEconomicalBowlersInYear2015(matches,deliveries) {
    let idArray = [];
    let totalRunsConcededByBowlers = {};
    let totalNoOfBallsByBowler = {};
    let economiesOfBowlers = {};
    for(let match of matches) {
        if(match.season == "2015") {
            idArray.push(match.id)
        }
    }
    let totalNoOfBalls = 0;
    for(let delivery of deliveries) {
        for(let ids of idArray) {
            if(delivery.match_id == ids) {
                if(delivery.bowler in totalNoOfBallsByBowler) {
                    totalNoOfBallsByBowler[delivery.bowler] = totalNoOfBallsByBowler[delivery.bowler] + 1;                }
                else {
                    totalNoOfBallsByBowler[delivery.bowler] = 1;                
                }
            }
        }
    }
    for(let delivery of deliveries) {
        for(let ids of idArray) {
            if(delivery.match_id == ids) {
                let totalRunsConceded = parseInt(delivery.wide_runs) + parseInt(delivery.noball_runs) + parseInt(delivery.batsman_runs)
                if(delivery.bowler in totalRunsConcededByBowlers) {
                    totalRunsConcededByBowlers[delivery.bowler] = parseInt(totalRunsConcededByBowlers[delivery.bowler]) + totalRunsConceded;
                }
                else {
                    totalRunsConcededByBowlers[delivery.bowler] = totalRunsConceded;
                }
            }
        }
    }
    for(let delivery of deliveries) {
        for(let ids of idArray) {
            if(delivery.match_id == ids) {
                    economiesOfBowlers[delivery.bowler] = ((totalRunsConcededByBowlers[delivery.bowler] * 6) / totalNoOfBallsByBowler[delivery.bowler]).toFixed(2);
            }
        }
    }
    for(key in economiesOfBowlers) {
        console.log("Top Economical Bowlers in the year 2015 " + key + " : " + economiesOfBowlers[key]);
    }
    console.log("\n");
}

// *****************             Method 5             **********************
function findNumberOfWicketsByEachBowlerInAllSeasons(deliveries) {
    let totalWicketsByBowlers = {};
    for(let delivery of deliveries) {
        if(delivery.bowler in totalWicketsByBowlers) {
            if(String(delivery.player_dismissed).length > 1) {
                totalWicketsByBowlers[delivery.bowler] += 1; 
            } 
        }
        else {
            if(String(delivery.player_dismissed).length > 1) {
                totalWicketsByBowlers[delivery.bowler] = 1; 
            }            
        }
    }
    for(key in totalWicketsByBowlers) {
        console.log("Total Wickets by " + key + " is : " + totalWicketsByBowlers[key]);
    }
    console.log("\n");
}

let matches = getMatchesData();
let deliveries = getDeliveriesData();

// Calling the Methods : 
findTheNumberOfMatchesPlayedPerYear(matches);
findTheNumberOfMatchesWon(matches);
findExtraRunsConcededInYear2016(matches,deliveries);
findTopEconomicalBowlersInYear2015(matches,deliveries);
findNumberOfWicketsByEachBowlerInAllSeasons(deliveries);