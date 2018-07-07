const route=require('express').Router();
const max= 100;

route.get('/',(req,res)=>{
   res.render("admin");
});

function JobSequencingWithDeadline(Job,n,result){
    let timeslots=new Array(max+1);
    let filledTimeSlot=0;
    let maxDeadline=0;
    for(let i=0;i<n;i++){
        if(Job[i].deadline>maxDeadline)
            maxDeadline=Job[i].deadline;
    }
    for(let i=1;i<=maxDeadline;i++){
        timeslots[i]=-1;
    }
    //console.log('sdmsk'+maxDeadline);

    for(let i=1;i<=n;i++){
        let k=Math.min(maxDeadline,Job[i-1].deadline);
        while(k>=1){
            if(timeslots[k]===-1){
                timeslots[k]=i-1;
                filledTimeSlot++;
                break;
            }
            k--;
        }

        if(filledTimeSlot===maxDeadline)
            break;
    }

    console.log("Required Jobs: ");/*
    console.log(Job);
    console.log(timeslots);*/
    for(let i=1;i<=maxDeadline;i++){
        result.arr.push(Job[timeslots[i]].id);
        console.log(Job[timeslots[i]].id);
    }

}

function findBest(ans,result) {
    let n=ans.length;
    Job=ans;
    //console.log(Job);
    for(let i=1;i<n;i++){
        for(let j=0;j<n-i;j++){
            if(Job[j+1].profit>Job[j].profit){
                let temp=Job[j+1];
                Job[j+1]=Job[j];
                Job[j]=temp;
            }
        }
    }

    JobSequencingWithDeadline(Job,n,result);


}

route.post('/data',(req,res)=>{
    var ans=req.body.ans;
    ans.shift();
    //console.log(req.body.ans);
    var result={
        arr:[]
    }
    findBest(ans,result);
    //console.log(result);
    res.send(result);
});
/**/
module.exports=route;