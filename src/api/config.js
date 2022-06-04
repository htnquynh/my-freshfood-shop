const getConfigHeaderAPI = () => {
  let token = JSON.parse(sessionStorage.getItem("user_login"));
  return {
    headers: { Authorization: "bearer " + token },
  };
};

export default getConfigHeaderAPI;
