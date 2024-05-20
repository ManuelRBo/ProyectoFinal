import multer from "multer";
import User from "../models/User.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/userData');
    },
    filename: function (req, file, cb) {
        cb(null, req.user.id + ".jpg");
    }
});

const upload = multer({ storage: storage }).fields([{ name: "img", maxCount: 1 }, { name: "username", maxCount: 1 }]);

export default async function update(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al subir la imagen" });
        }
        const { username } = req.body;
        const {img} = req.files;

        if (username === req.user.username) {
            return res.status(400).json({ error: "No hay cambios que realizar" });
        }

        if(username && img) {
            await User.updateOne({ _id: req.user.id }, { username, img: "/images/userData/" + req.user.id + ".jpg" }, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error al actualizar los datos" });
                }
                res.json({ message: "Datos actualizados", success: true });
            });
        }

        if (username) {
            
        }
    });
}