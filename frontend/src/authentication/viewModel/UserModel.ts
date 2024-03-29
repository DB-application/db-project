type UserModel = AuthenticatedUserModel | UnautenticatedUserModel;

type AuthenticatedUserModel = {
    isAuthUser: true;
    id: string,
    email: string,
    username: string,
    avatarUrl: string,
    phone: string,
    firstName: string,
    lastName: string,
};

type UnautenticatedUserModel = {
    isAuthUser: false;
};

export type {
    AuthenticatedUserModel,
    UnautenticatedUserModel,
    UserModel,
}