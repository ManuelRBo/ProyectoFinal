import jwt from 'jsonwebtoken';

export default function checkJWT(req, res, next) {
    try {
        if (!req.headers.cookie) {
            return res.status(401).json({ token: false });
        }

        const token = req.headers.cookie.split('=')[1];
        if (!token) {
            return res.status(401).json({ token: false });
        }

        const secretKey = "prueba";
        if (!secretKey) {
            return res.status(500).json({ token: false });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ token: false });
            }
            req.user = decoded;
            next(); 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
