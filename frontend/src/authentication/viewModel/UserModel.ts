export type UserModel = AuthenticatedUserModel | UnautenticatedUserModel;

type AuthenticatedUserModel = {
    isAuthUser: true;
    id: string,
    email: string,
    nickname: string,
    avatarUrl: string,
    phone: string,
    firstName: string,
    lastName: string,
};

type UnautenticatedUserModel = {
    isAuthUser: false;
};