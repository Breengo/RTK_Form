function getUID() {
  return `uid${new Date().getTime()}`;
}

export default getUID;
