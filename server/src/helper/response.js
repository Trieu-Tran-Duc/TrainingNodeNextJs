module.exports =  {
  unauthorized: (res, code, message) => {
    return res.status(code).json({ code, message });
  },

  success: (res, data, message = "Success") => {
    return res.status(200).json({ code: 200, message, data });
  },

  error: (res, {code, message }) => {
    return res.status(code).json({ code, message });
  },

  serverError: (res, message = "Internal server error") => {
    return res.status(500).json({ code: 500, message });
  }
}