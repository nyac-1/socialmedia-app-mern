exports.createPostValidator = (req, res, next)=>{
    req.check('title','Enter a title').notEmpty();
    req.check('title','4-150 char only').isLength({
        min: 4,
        max: 150
    });

    req.check('body','Enter a body').notEmpty();
    req.check('body','4-2000 char only').isLength({
        min: 4,
        max: 2000
    });

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors[0]['msg']
        console.log(firstError);
        return res.status(400).json({error: firstError});
    }
    next();
};

exports.signupValidator = (req, res, next)=>{
    
    req.check('name','Enter a name').notEmpty();
    req.check('name','Length range is from 4 to 20 characters').isLength({
        min: 4,
        max: 20
    });

    req.check('email','Enter an email').notEmpty();
    req.check('email','Format your email properly').isEmail();

    req.check('password','Enter a password').notEmpty();
    req.check('password','Length range is from 4 to 50 characters').isLength({
        min: 4,
        max: 50
    });
    req.check('password').matches(/\d/).withMessage('Must contain atleast one number');
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors[0]['msg']
        console.log(firstError);
        return res.status(400).json({error: firstError});
    }
    next();
}