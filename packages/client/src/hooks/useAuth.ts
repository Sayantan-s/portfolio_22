const decodeJwt = (jwt: string) => JSON.parse(atob(jwt.split(".")[1]));

const getJwtMetaData = () => {
  const payload = localStorage.getItem("session_jwt");
  if (payload) {
    const decoded = decodeJwt(payload);
    const hasExpired = decoded.exp * 1000 < Date.now();
    return {
      hasExpired,
      metaData: decodeJwt(payload),
    };
  }
  return null;
};

export const useAuth = () => {
  const metaData = getJwtMetaData();
  console.log(metaData);
};
