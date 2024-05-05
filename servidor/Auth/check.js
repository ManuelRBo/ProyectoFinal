import jwt from 'jsonwebtoken';

export default function check(req, res) {
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

        jwt.verify(token, secretKey, (err) => {
            if (err) {
                return res.status(401).json({ token: false });
            }
            return res.status(200).json({ token: true });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
