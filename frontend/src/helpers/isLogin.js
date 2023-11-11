const isLogin = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  if (user) {
    return user;
  }
  return null;
};

export default isLogin;
