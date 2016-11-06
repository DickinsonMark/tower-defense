# Monty Python Tower Defense

##### A tower defense game based on the hit movie "Monty Python and the Holy Grail"!

Built by implementing:
- Multi-layered canvases
- JavaScript
- jQuery
- HTML
- CSS.


Each tower (when placed) gets placed into an array with the coords of its position.
This array is then iterated over and compared to each individual creep's current location, to find the Euclidean distance between them.
If the distance is less than the type of tower's range than the creep takes damage determined by the type of tower doing the damage.

## To Run Locally

1. `Fork / Clone`
1. `npm install`
1. `gulp`
1. Go to `http://localhost:8888/`
1. Play the **GREATEST** game ever created!
