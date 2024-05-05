import check from "../Auth/check.js";

export default function userData(req, res){
    console.log(req.headers)
    res.json({message: "Hello World!"})
}