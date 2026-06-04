import jwt from "jsonwebtoken";

function login(req,res) {
    // ricorda che req la tua richiesta http, per accedere ai dati mandati devi prima accedere a body 
    console.log(req);

    let email = req.body.email;
    let password = req.body.password;


    //controlli

    // controlli fine

    // il primo parametro di sign vuole il payload da firmare
    // nel token, dallo in questa forma json
    // il secondo parametro SECRET è una stringa che serve a firmare il token
    // NON generarlo casualmente COGLIONE che crei solo problemi TESTA DI CAZZO

    const jwtSecret = 'prova_secret';

    //possiamo mettere altri parametri come data di scadenza MA NON LO FAREMO
    const token = jwt.sign({email: email},jwtSecret,{expiresIn: '24h'});

    res.status(200).json({
        token: token,
        message: 'token registrato' 
    });
}


export default {
    login,
    // register,    
}