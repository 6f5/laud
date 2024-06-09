# Laud

A simple library to create errors for APIs.

# Usage

```js
import Laud from "laud";
// Set a debugger function that will be called with LaudInstance.debug(), defaults to console.info
// Set a logger function that will be called with LaudInstance.log(), defaults to console.log
Laud.logger = console.log; // That's the default
Laud.debugger = console.info; // That's the default

const authErr = new Laud({
  status: 401,
  code: "UNAUTHORIZED",
  message: "Invalid email or password",
});

// Log the error to the console, and for debugging
authErr.log();
authErr.debug();

// Get the error in JSON format to respond to web request
// for example with Express framework
const fields = ["code", "message"];
res.status(authErr.status).json(authErr.toJSON((key) => key in fields));
```
