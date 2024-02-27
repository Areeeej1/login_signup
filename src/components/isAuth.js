const isAuth = () => {

    return localStorage.getItem("userName") ? localStorage.getItem("userName") : false;
  };

  export default isAuth;




  //////////////////////////