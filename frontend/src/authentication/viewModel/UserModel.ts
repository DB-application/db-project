export type UserModel = AuthenticatedUserModel | UnautenticatedUserModel;

type AuthenticatedUserModel = {
    id: string;
    isAuthUser: true;
    email: string;
    firstname: string;
    lastname: string;
};

type UnautenticatedUserModel = {
    isAuthUser: false;
};