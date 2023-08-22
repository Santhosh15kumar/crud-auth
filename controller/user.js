const userModel = require('../model/user');

class UserController {
    async create(req,res){
        try{
            const user = new userModel({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone
            });
            await user.save()
            return res.status(200).send({
                message: "User Created Successfully",
                data: user,
                success: true,
                status: 200
            });
        }catch(error){
            console.log("Error@ create user", error);
            return res.status(500).json({message: "Something went wrong, please try again later", success: true});
        }
    } 

    async findAll(req,res){
        try {
            const user = await userModel.find({})
            return res.status(200).json({data:user, success: true} );
        } catch(error) {
            console.log("Error@ find users", error);
            return res.status(500).json({message: "Something went wrong, please try again later", success: true});
        }
    } 

    async findOne(req,res){
        try{
            const user = await userModel.findById(req.params.id);
            res.status(200).json({data: user, success: true});
        } catch(error) {
            console.log("Error@ find one user", error);
            res.status(500).json({message: "Something went wrong , please try again later", success: true});
        }
    }

    async update(req,res){
        try{
            const id = req.params.id
            const user = await userModel.findByIdAndUpdate(id, req.body, {useFindAndModify: false});
            return res.status(200).json({message: "User updated Successfully", data: user, success: true});
        } catch(error) { 
            console.log("Error@ update user", error);
            res.status(500).json({message: "Something went wrong, please try again later", success: true});
        }
    } 

    async destroy(req,res){
        try{
            const id = req.params.id 
            await userModel.findByIdAndRemove(id);
            return res.status(200).json({message: "User deleted Successfully", success: true});
        } catch(error) {
            console.log("Error@ delete user", error);
            res.status(500).json({message: "Something went wrong, please try again later", success: true});
        }
    }
}

module.exports = new UserController();