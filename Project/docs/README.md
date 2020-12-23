2. README (top part of your README.md)
 Title of your project: “Community Centers”
Description of your project: Our project helps community members find the available centers in the area, their addresses and distance/location from their computer location. 
Description of target browsers (iOS? Android? Which ones?): MAC and Windows OS, Apple and Android are welcome to use our app.
Link to User Manual:  project/docs/user.md
Link to Developer Manual: project/docs/README.md

3. Developer Manual (bottom half of your README.md) The audience of this document is future developers who will take over your system. They know technical terms and have general knowledge about web applications, but do not have knowledge about your system design.
 You need to provide a technical document so that future developers can start setting up the application on their local machines and keep working on the system development after you leave the team.
 Your Developer Manual covers:
Once you run command prompt with “npm install” it will cover all the dependencies needed to be installed. Once you have the dependencies installed it will open op on the “start” “button”: go to cd new-folder (your folder where you saved the project), “npm start”> voila. Please don’t forget to stop the server by typing/clicking  “ctrl S”.
You can easily test any software in the Chrome pages consol log window, relpl, Visual Studio Code, etc.
The API endpoint: https://data.princegeorgescountymd.gov/resource/gwq4-iu9d.json lists all the community centers in the area, our GET is the HTTP request method that instructs the server to transmit the data identified by the URL to the client. In our case GET is read-only. POST helps us create new resources and PATCH only modifies given data not the other parts of the data. 
We reused pieces of code from the open access  (filter and distance) so make sure you keep up with any changes and updates: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates

