const { userHandler } = require('../handlers')

const users = {
    saveUserDetails: async(req,res)=>{
        const response = await userHandler.saveUserDetails(req,res)
        return response
    },
    authenticateLoginUser: async(req,res,next) =>{
       const response = await userHandler.authenticateLoginUser(req,res,next)
       return response
    },
    getUsernameFromToken : async(req,res,next) =>{
        const response = await userHandler.verifyJWTToken(req,res,next)
        return response
    }
}



module.exports = users