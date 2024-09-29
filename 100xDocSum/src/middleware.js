import { config } from "dotenv";
import { verify } from "jsonwebtoken";

export const onlyKiratRoutes = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  
    try {
      const decoded = verify(token, config.jwtSecret);
      
      if (decoded.role !== 'tutor') {
        throw new Error('Not authorized');
      }
  
      next(); 
    } catch (error) {
      return res.status(401).json({ message: 'Token verification failed' });
    }
  };