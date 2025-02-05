const authSignUp=async (req,res)=>{
    try {
        const {fullName,email,password,userName}=req.body;
        if(!fullName || !email || !password || !userName){
            res.status(500).json({message: "Feilds are missing!"});
            return ;
        }
    } catch (error) {
        
    }
}