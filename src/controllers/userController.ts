export const profile = ({ user }: any, res: any) => {
    return res.render('profile', {user});
}