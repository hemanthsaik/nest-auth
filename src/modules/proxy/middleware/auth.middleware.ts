import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AuthGuard } from '../guards/auth.guard' // Import your AuthGuard

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authGuard: AuthGuard) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Call your AuthGuard logic
    const canActivate = await this.authGuard.canActivate({
      switchToHttp: () => ({ getRequest: () => req }),
    } as any)

    if (canActivate) {
      // AuthGuard passed, proceed to the next middleware
      next()
    } else {
      // AuthGuard failed, handle accordingly (e.g., send a response or redirect)
      res.status(403).send('Unauthorized')
    }
  }
}
