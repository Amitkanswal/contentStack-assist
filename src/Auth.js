class Auth{
    constructor(){
     if (document.cookie.includes("auth") &&
     document.cookie.split("auth")[1].split("=")[1].split(';')[0].length > 0)
   {
     this.auth = true;
   } else {
     this.auth = false;
   }
    }
    
login(cb){
    this.auth=true;
    cb();
}
logout(cb){
    this.auth=false;
    
    cb();
}
isAuthenticate(){
    return this.auth;
}
}

export default new Auth();