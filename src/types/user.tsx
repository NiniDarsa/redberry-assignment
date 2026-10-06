export type TUser = {
    age: number | null;
    avatar: string | null;
    dateOfBirth: string | null;
    email: string;
    fullName: string | null;
    id: number;
    mobileNumber: string | null;
    preferredVenue: {id:string,name:string,slug:string,city:string};
    profileComplete: boolean;
    username: string;
};

export type TUserResponse = {
    data: TUser;
};