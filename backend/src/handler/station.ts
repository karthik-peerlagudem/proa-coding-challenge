import { Request, Response } from 'express';

export const retrieveStation: any = async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello world' });
};
