# TourismSupport
**Tourism Aid** is a wonderful portal for tourists visiting new country, city,etc. It helps find the **shortest** and the **most time efficient route** between various places. The portal can also take in as input a list of places you want to visit and assigna it profit according to your priority and public rating. Then it gives an efficient route to **travel the maximum number of places such that you get most profit and you can visit the place before its closing time**.

The portal provides service by implementing **Travelling Salesman Problem** which uses **dynamic programming approach** to visit all places with least cost. Also, it solves the problem of achieving maximum profit and visiting places before closing hours by a **greedy approach of Job Scheduling before deadline**.

The website uses google maps API to calculate distance between two places.

It can also be extended such that the website dynamically generates a list of tourist attractions according to reviews and rating and gives an efficient to cover all the plces in a particular time interval.

Steps to run

1.  Clone the repo.
2.  Run *npm install*.
3.  Download the *****configs.js***** file and place it in the project directory.
4.  Modify *****configs.js***** to specify the port you want to use
5.  Start the server using, *node server.js*
