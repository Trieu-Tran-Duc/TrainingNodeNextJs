const response = require("../helper/response");

const scanQRCode = async (req, res) => {
    const scanData = req.body;

    if (!scanData.id || !scanData.qrData) {
        return response.error(res, 'Missing fields', 400);
    }

    console.log('Scan saved:', scanData);
    return response.success(res, { message: 'Scan saved', scan: scanData });
}

module.exports = {
    scanQRCode
};