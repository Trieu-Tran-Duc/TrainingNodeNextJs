const response = require("../helper/response");

const scanQRCode = async (req, res) => {
    const scanData = req.body;

    if (!scanData) {
        return response.error(res, 'Missing fields', 400);
    }
    
    scanData = scanData.map(item => ({
        ...item,
        complete: true
    }));

    return response.success(res, { message: 'Scan saved', scan: scanData });
}

module.exports = {
    scanQRCode
};