const route = require("express").Router();

route.get('/', (req, res) => {
    res.render("customer");
});


const inf = Infinity;


// Generates the minimum subdistance for each ending city in each possible subset
function build_subsets(subdist, dist, n, nset) {
// Start with shortest possible tour (starting and ending at the first city)
    subdist[1][0] = 0;

// Iterate all subsets that include the first city, with size greater
// than 2 (i.e. every odd bitmask, starting from 3 (dec) or 11 (bin))

    for (let s = 3; s < nset; s++) {

// Iterate ending cities (excluding first city)
        for (let j = 1; j < n; j++) {
            if (!(s & (1 << j))) {
                continue;
            }

// Exclude ending city j from subset: S - {j}
            let t = s & ~(1 << j);

// Find minimum sub-distance for this subtour with j as ending city
            for (let i = 0; i < n; i++) {
                if (s & (1 << i) && i !== j && subdist[t][i] < inf) {
                    subdist[s][j] = Math.min(subdist[s][j], subdist[t][i] + dist[i][j]);
                }
            }
        }
    }
}

// Searches for shortest Hamiltonian cycle
function min_cycle(subdist, dist, n, nset,cycle,cycle_dist) {
    cycle.cycles = [0];
    let visited = new Array(n);

//initialize visited with false
    for (let i = 0; i < n; i++) {
        visited[i] = false;
    }

// Backtracking start with subset that contains all cities
    let s = nset - 1;

// Mark first city as visited
    visited[0] = true;
    for (let i = 0; i < n - 1; i++) {
        let best_j;
        let min_dist = inf;

// Find next non-visited city with best sub-distance from
// previous city in the cycle
        for (let j = 0; j < n; j++) {
            if (!visited[j] && subdist[s][j] + dist[cycle.cycles[cycle.cycles.length - 1]][j] < min_dist) {
                min_dist = subdist[s][j] + dist[cycle.cycles[cycle.cycles.length - 1]][j];
                best_j = j;
            }
        }

// Mark city as visited and exclude it from the subset
        cycle.cycles.push(best_j);
        visited[best_j] = true;
        s &= ~(1 << best_j);
    }
    cycle.cycles.push(0);
    // Print shortest cycle + distance
    for (let it = 0; it < cycle.cycles.length; it++) {
        console.log(cycle.cycles[it] + " ");
        if (it !== 0) {
            cycle_dist += dist[cycle.cycles[it]][cycle.cycles[cycle.cycles.length - it]];
        }
    }
}


function main(ans,cycle) {
    let n = ans.length;

//nset= 2^n
    let nset = 1 << n;


//toatal - distance
    var cycle_dist = 0.0;

//ditance matrix
    var dist=ans;

//subset subdistance matrix
    var subdist = new Array(nset);
    for (let i = 0; i < nset; i++) {
        subdist[i] = new Array(n);
    }

//initialize subset subdistance
    for (let i = 0; i < nset; i++) {
        for (let j = 0; j < n; j++) {
            subdist[i][j] = inf;
        }
    }

    build_subsets(subdist, dist,n,nset);

    min_cycle(subdist, dist,n,nset,cycle,cycle_dist);

}


route.post('/distance', (req, res) => {
    var cycle={
        cycles:[]
    };
    var ans=req.body.ans;
    main(ans,cycle);
    console.log("main",cycle);
    res.send(cycle);
});

route.post('/time', (req, res) => {
    var cycle={
        cycles:[]
    };
    var ans=req.body.ans;
    main(ans,cycle);
    console.log("main",cycle);
    res.send(cycle);
});


module.exports = route;

