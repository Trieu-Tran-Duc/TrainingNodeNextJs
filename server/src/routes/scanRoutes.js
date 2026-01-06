const { router, baseRouter } = require("./baseRouter");
const scanController = require("../controllers/scanController");
const { ROLE_ENUM, METHOD_ENUM } = require("../utils/enumSystem");
const tryCatch = require("../helper/tryCatch");

baseRouter(METHOD_ENUM.POST, "/", tryCatch(scanController.scanQRCode), { }); 

module.exports = router;