import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

interface UserRequest extends Request {
  user: any;
}

@Injectable()
export class AppService {
  googleLogin(req: UserRequest, res: Response) {
    if (!req.user) {
      return res.redirect('/500');
    }
    res.cookie('auth-payload', req.user, { httpOnly: true });

    return res.redirect('http://localhost:3001/hello');
  }
}
