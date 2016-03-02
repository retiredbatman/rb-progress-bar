#Progress bar

##Install

```npm install rb-progress-bar```

###Usage

```javascript
var progress = require('rb-progress-bar');

//to init the progress bar
progress.init(id , options);
//id = id of the element in the dom to which the progress bar will be attached, send null to attach to the body

//to start at some value
progress.start(30);

//to end the progress bar

progess.done();
```