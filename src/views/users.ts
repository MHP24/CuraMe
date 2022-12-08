import { Response } from 'express';
// import { ReqExtUserI } from '../interfaces/req-extends.interface';
import { TemplateI } from '../interfaces/role-template.interface';

const templateByRole: TemplateI = {
    1: 'profile',
    3: 'doc-profile'
}

export const profile = ({ user }: any, res: Response) => {
    const { rol: role } = user[0];
    const template: string = templateByRole[role];
    if(template !== undefined) {
        return res.render(template, {userData: user[0]});
    }
    return res.redirect('/');
}