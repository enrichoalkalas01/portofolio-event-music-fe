import axios from "axios";

// Setup
const expiredTokenTime = 24 * 60 * 60;
const BaseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:5550/api/v1`;

interface ILoginResponseAxios {
    data: {
        status: number;
        message: string;
        data: ILoginResponse;
    };
}

export interface ILoginResponse {
    _id?: string;
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    fullname: string;
    phonenumber: string;
    email: string;
    token: IToken;
}

interface IToken {
    access_token: string;
    refresh_token: string;
    session_token: string;
    sso_refresh_token: string;
    expired_rf: number;
    expired: number;
    type: string;
}

console.log(BaseURL);

export const LoginOld = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    try {
        let config = {
            url: `${BaseURL}/authentication/login`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                username: username,
                password: password,
            }),
        };

        console.log(config);
        const response: ILoginResponseAxios = await axios(config);
        const DataPassing: ILoginResponse = {
            id: response?.data.data._id || "",
            username: response?.data.data.username,
            firstname: response?.data.data.firstname,
            lastname: response?.data.data.lastname,
            fullname: response?.data.data.fullname,
            phonenumber: response?.data.data.phonenumber,
            email: response?.data.data.email,
            token: {
                access_token: response?.data.data.token.access_token,
                refresh_token: response?.data.data.token.refresh_token,
                session_token: response?.data.data.token.session_token,
                sso_refresh_token: response?.data.data.token.sso_refresh_token,
                expired_rf: response?.data.data.token.expired_rf,
                expired: response?.data.data.token.expired,
                type: response?.data.data.token.type,
            },
        };

        return DataPassing;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const LoginCredentials = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    try {
        let config = {
            url: `${BaseURL}/authentication/login-credentials`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                username: username,
                password: password,
            }),
        };

        console.log(config);
        const response: ILoginResponseAxios = await axios(config);
        const DataPassing: ILoginResponse = {
            id: response?.data.data._id || "",
            username: response?.data.data.username,
            firstname: response?.data.data.firstname,
            lastname: response?.data.data.lastname,
            fullname: response?.data.data.fullname,
            phonenumber: response?.data.data.phonenumber,
            email: response?.data.data.email,
            token: {
                access_token: response?.data.data.token.access_token,
                refresh_token: response?.data.data.token.refresh_token,
                session_token: response?.data.data.token.session_token,
                sso_refresh_token: response?.data.data.token.sso_refresh_token,
                expired_rf: response?.data.data.token.expired_rf,
                expired: response?.data.data.token.expired,
                type: response?.data.data.token.type,
            },
        };

        return DataPassing;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const VerifySSOSession = async (sessionToken: string) => {
    try {
        const config = {
            url: `${BaseURL}/authentication/verify-session`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        };

        console.log(config);

        const response = await axios(config);
        return { valid: true, data: response?.data?.data };
    } catch (error: any) {
        return {
            valid: false,
            message: error?.response?.data?.message || error?.message,
        };
    }
};

export const RefreshAccessToken = async (
    refreshToken: string,
    sessionToken?: string
) => {
    try {
        const config = {
            url: `${BaseURL}/authentication/refresh-token`, // Endpoint baru
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Tidak perlu Authorization header
            },
            data: {
                rftc: refreshToken,
            },
        };

        console.log("Refreshing token...", config.url);

        const response = await axios(config);

        return {
            access_token: response.data.data.access_token,
            expired: response.data.data.expired,
        };
    } catch (error: any) {
        console.error(
            "Failed to refresh token:",
            error?.response?.data || error?.message
        );
        return null;
    }
};

export const DestroySSOSession = async (sessionToken: string) => {
    try {
        const config = {
            url: `${BaseURL}/authentication/logout`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        };

        console.log(config);

        await axios(config);
        return { success: true };
    } catch (error: any) {
        console.error("Failed to destroy SSO session:", error?.message);
        return { success: false };
    }
};
