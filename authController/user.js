const adminModel = require('../authModel/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


class AuthController {

    async register(req,res){
        try {
            console.log("dlldldl");
            // if (!req.body) {
            //     res.status(400).send({ message: 'Content cannot be empty' })
            // }
            const { username, password } = req.body;
            console.log("username", username);
            const hashedPassword = await bcrypt.hash(password, 10)
            const admin = new adminModel({
                username: username,
                password: hashedPassword
            });
    
            await admin.save()
            return res.status(200).json({ message: "Admin created Successfully", admin: admin , success:true, status:200});
        } catch (error) {
            console.log("Error@createAdmin", error);
            return res.status(500).json({ message: "Something Went wrong, please try again later", success: true });
    
        }
    }

    async login(req,res){
        try {

            if (!req.body) {
                res.status(400).send({ message: 'Content cannot be empty' });
            }
            const { username, password } = req.body;
            const admin = await adminModel.findOne({ username})
            console.log("admin========", admin);
    
            const isPasswordMatched = await bcrypt.compare(password, admin.password)
            if(!isPasswordMatched){
                return  res.status(500).json({ message: "Invalid password" });


            }
            if (isPasswordMatched) {
                const jwtToken = jwt.sign({admin:admin._id}, 'MY_SECRET_TOKEN');
                return res.status(200).cookie('jwt', jwtToken, {maxAge: 360000}).json({ message: 'jwtToken created'});
            }
    
        } catch (error) {
            console.log("Error@loginAdmin", error);
            return  res.status(500).json({ message: error.message });
    
        }
    }
}

module.exports = new AuthController()





