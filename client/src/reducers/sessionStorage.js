export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify({
      auth: state.auth,
      currentUser: state.currentUser,
      selectedMesh: state.selectedMesh,
      org: state.org
    });
    sessionStorage.setItem("state", serializedState);
  } catch (err) {
    // ignore errors
  }
};
