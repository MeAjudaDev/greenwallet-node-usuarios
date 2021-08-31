class AppError extends Error {
  constructor(name, code, ...params) {
    super(...params);

    this.name = name;
    this.code = code;
  }
}

module.exports = AppError;