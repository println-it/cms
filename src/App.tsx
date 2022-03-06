import React from "react";

import { getAuth, User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    FirebaseCMSApp,
    NavigationBuilder,
    NavigationBuilderProps,
} from "@camberi/firecms";

import "typeface-rubik";
import "typeface-space-mono";
import PageSchema from "./schemas/PageSchema";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};

export default function App() {

    const navigation: NavigationBuilder = async ({
                                                     user,
                                                     authController
                                                 }: NavigationBuilderProps) => {
        return ({
            collections: [
                buildCollection({
                    path: "pages",
                    schema: PageSchema,
                    name: "Pages",
                    permissions: ({ authController }) => ({
                        edit: true,
                        create: true,
                        delete: true
                    })
                })
            ]
        });
    };

    const myAuthenticator: Authenticator<FirebaseUser> = async ({
                                                                    user,
                                                                    authController
                                                                }) => {
        
        const idTokenResult = await getAuth().currentUser?.getIdTokenResult();
        console.log(idTokenResult)
        if (idTokenResult?.claims.admin) {
            return true;
        } else {
            return false;
        }
    };

    return <FirebaseCMSApp
        name={"My Online Shop"}
        authentication={myAuthenticator}
        navigation={navigation}
        firebaseConfig={firebaseConfig}
    />;
}