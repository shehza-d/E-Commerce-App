export const authGuard =(req, res, next) => {

    console.log("req.cookies: ", req.cookies);
  
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }
  
    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {
  
            console.log("decodedData: ", decodedData);
  
            const nowDate = new Date().getTime() / 1000;
  
            if (decodedData.exp < nowDate) {
  
                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                res.send({ message: "token expired" })
  
            } else {
  
                console.log("token approved");
  
                req.body.token = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
  }