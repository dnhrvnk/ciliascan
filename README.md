# CiliaScan: Cookie edition

Html+css+js prototype of application for annotating cilias for usability testing with non-expert users. In this version a Wizard of Oz (WoZ) was implemented with table of correct annotations for each image.

<img title="" src="https://media.tenor.com/R6J71-c076EAAAAC/cookie-monster-girlscout.gif" alt="" width="166" data-align="center">

## Installation

### Dependencies

 backend requies `nodejs` with libraries `ws`, `http`, `fs`,`path`: 

```bash
npm i ws 
```

### Run

  To run this server navigate to `backend/` and run the backend with command:

```bash
node ./main.js
```



> ⚠️ It is important to note that it was design for **one laptop screen** and might (will) break for others 🙃. To see how it looks refer to images in **Preview of screens** or `screen/samples`



### Usage

* the annotate app is available at [http://localhost:8080/](http://localhost:8080/)

* WoZ app is availabel at [http://localhost:8080/admin_console/index.html](http://localhost:8080/admin_console/index.html)

> ⚠️ The backend **only** supports one annotate app and one WoZ. 
> 
> ⚠️ The annotate app will wait on loading of automatic generation until the wizard is connected and presses `stop loading`

## Preview of screens


