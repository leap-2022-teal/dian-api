export function roleCheck(allowedRoles: any[]) {
  return async (req: any, res: any, next: any): Promise<any> => {
    const role = req.role;

    if (!role) {
      return res.sendStatus(403);
    }

    if (!allowedRoles.includes(role)) {
      return res.sendStatus(403);
    }

    next();
  };
}
