
export const checkLoggin = (req, res, next)=>{
    try {
        if(req.isAuthenticated()){
            return res.redirect("/profile")
        }
        next()
    }catch (e) {
        res.status(500).json(e.message)
    }
}

export default checkLoggin;