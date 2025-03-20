import { Request, Response } from 'express';

export const retrieveStation: any = async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello world' });
};

export const retrieveVariable: any = async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello world' });
};

export const retrieveMeasurement: any = async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello world' });
};
