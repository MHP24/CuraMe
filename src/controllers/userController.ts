export const adminUsers = ({ user }: any, res: any) => {
    console.log(user);
    return res.render('admin-users', {reqUser: user});
}