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

        if (username === req.user.username && !img) {
            return res.status(400).json({ error: "No hay cambios que realizar" });
        }

        if(username && img) {
            await User.updateOne({ _id: req.user.id }, { username });
            await User.updateOne({ _id: req.user.id }, { img: req.user.id + ".jpg"});
            return res.status(200).json({ message: "Usuario e imagen actualizados correctamente" });
        }

        if(username) {
            await User.updateOne({ _id: req.user.id }, { username });
            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        }

        if(img) {
            await User.updateOne({ _id: req.user.id }, { img: req.user.id + ".jpg"});
            return res.status(200).json({ message: "Imagen actualizada correctamente" });
        }
    });
}