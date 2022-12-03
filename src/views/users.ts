const templateByRole: any = {
    1: 'profile',
    2: 'admin-users',
    3: 'doc-profile'
}

export const profile = ({user}: any, res: any) => {
    const { rol } = user[0];
    const template: string = templateByRole[rol];
    if(template !== undefined) {
        return res.render(template, {userData: user[0]});
    }
    return res.redirect('/');
}