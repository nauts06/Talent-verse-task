 <!-- TalentVerse SDE-1 Assignment – Fugitive Hunt Game -->

 Here i have craeted game where 3 cops will try to capture a fugitive hiding in one city out of
  five cities , so each cop first have to selct city also vehicle but EV-bike can choose by 2 cops if they want but as per range beacuse also they have to come back after search. so the game will determines the criminal was captured by 3 cops or not.

 <!-- Game Flow -->

1 Start Game - in landing page
2 Each of the 3 cops selects a unique city. (also i have disabled the city once selected by other cop)
3 Each cop chooses a vehicle that can make a round trip to that city with calculation like if
  the distance of city is 20km so he choose vehicle with 40km can travel
4 The backend randomly places the criminal in one city with random calcultion.
5 If any cop chose the same city also  had a suitable vehicle they capture the criminal.
6 A result screen shows who won or if the criminal escaped 

<!-- Technologies Used -->

Frontend: React.js (with React Router, Formik, Tailwind CSS)
Backend: Node.js with Express (in-memory simulation only)
Styling : Tailwind CSS
Deployment : Netlify (Frontend) + Render/Railway (Backend)

<!-- Run Instructions -->

1-Clone the repo
2-cd client 
3-npm install
4-npm start
5- cd server (backend)
6-npm install
7-npm start

now enjoy the Game.



