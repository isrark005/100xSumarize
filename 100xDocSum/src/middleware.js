
import pkg from 'jsonwebtoken';
import { config } from './config.js';
const { verify } = pkg;

export const onlyKiratRoutes = (req, res, next) => {
    const token = req.cookies.summaryAuthToken;
    
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