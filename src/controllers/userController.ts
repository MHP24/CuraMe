export const profile = ({ user }: any, res: any) => {

    res.render('profile', {user});
    console.log(user);
}