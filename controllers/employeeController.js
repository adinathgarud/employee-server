import bcrypt from 'bcrypt';
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import multer from 'multer';
import path from 'path';
import Department from "../models/Department.js"

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Function to add a new employee
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
            
        } = req.body;

        // Check if the user already exists
        // const user = await User.findOne({email});
        // if (user) {
        //     return res.status(400).json({ success: false, error: "User  already registered as an employee." });
        // }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });

        // Save the user to the database
        const savedUser  = await newUser.save();

        // Create a new employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        // Save the employee to the database
        await newEmployee.save();

        // Respond with success message
        return res.status(200).json({ success: true, message: "Employee created successfully." });
    } catch (error) {
        console.error(error.message); // Log the error for debugging
        return res.status(500).json({ success: false, error: "Server error in adding employee." });
    }
};


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error:"get employees server error"})
    }
}


const getEmployee = async (req, res) => {
    const {id} = req.params;

    try { 
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate("department")
        if(!employee){
            employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate("department")
        }
        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({success: false, error:"get employees server error"})
    }
}

const updateEmployee = async (req, res ) =>{
    
    try {
        const {id} = req.params;
        const{
            name,
            maritalStatus,
            designation,       
            salary,
            department,
        } = req.body;
        const employee = await Employee.findById({_id:id})
        if(!employee){
            return res.status(404).json({success: false, error:"Employee Not found"})
        }

        const user = await User.findById({_id: employee.userId})

        if(!user){
            return res.status(404).json({success: false, error:"User Not found"})
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation,
            salary,
            department
        })

        if(!updateEmployee || !updateUser){
            return res.status(404).json({success: false, error:"Document Not found"})
        }

        return res.status(200).json({success: true, message:"update employee successfully"})

    } catch (error) {
        return res.status(500).json({success: false, error:"update employees server error"})
    }
}

const fetchEmployeeByDepId = async (req, res) => {
    const {id} = req.params;
    try { 
        const employees = await Employee.find({department: id})
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error:"get employeesByDepId server error"})
    }
}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeeByDepId };