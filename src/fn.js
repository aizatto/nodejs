function setMath(a, b) {
  return {
    remove: [...a].filter(x => !b.has(x)),
    add: [...b].filter(x => !a.has(x)),
  };
}

module.exports = {
  setMath,
};
