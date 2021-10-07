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