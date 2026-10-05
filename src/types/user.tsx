export type TUser = {
    age: number | null;
    avatar: string | null;
    dateOfBirth: string | null;
    email: string;
    fullName: string | null;
    id: number;
    mobileNumber: string | null;
    preferredVenue: string | null;
    profileComplete: boolean;
    username: string;
};

export type TUserResponse = {
    data: TUser;
};