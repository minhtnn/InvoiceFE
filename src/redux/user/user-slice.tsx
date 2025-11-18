import { apiRequest } from "@/lib/http";
import type { TPassioOrderResponse } from "@/schema/passio-order.schema";
import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";

interface UserState
{
    order: TPassioOrderResponse | null;
}

const initialState: UserState = {
    order: null,
};

// const isTokenExpired = ( token: string ): boolean =>
// {
//     try
//     {
//         const decodedToken = jwtDecode( token ) as any;

//         if ( !decodedToken.exp )
//         {
//             return true;
//         }

//         const currentTime = Date.now() / 1000;
//         const bufferTime = 30;

//         return decodedToken.exp < ( currentTime + bufferTime );
//     } catch ( error )
//     {
//         console.error( 'Error decoding token:', error );
//         return true;
//     }
// };

const setAuthorizationHeaders = ( token: string ) =>
{
    const authHeader = `Bearer ${ token }`;
    apiRequest.passioInvoice.defaults.headers.common.Authorization = authHeader;
};

const clearAuthorizationHeaders = () =>
{
    apiRequest.passioInvoice.defaults.headers.common.Authorization = null;
};

const clearStoredAuthData = () =>
{
    localStorage.removeItem( "accessToken" );
    localStorage.removeItem( "refreshToken" );
    localStorage.removeItem( "user" );
    clearAuthorizationHeaders();
};

const userSlice = createSlice( {
    name: "user",
    initialState,
    reducers: {
        logout ( state )
        {
            state.order = null;

            clearStoredAuthData();

            //console.log( 'User logged out successfully' );
        }
    },
} );

export const { logout } = userSlice.actions;
export default userSlice.reducer;