// tokenBlacklist.js (simple in-memory blacklist)
const blacklistedTokens = new Set(); // You can use a more persistent storage like Redis or a database in production

module.exports = {
  add: (token) => {
    blacklistedTokens.add(token);
  },
  isBlacklisted: (token) => {
    return blacklistedTokens.has(token);
  }
};
