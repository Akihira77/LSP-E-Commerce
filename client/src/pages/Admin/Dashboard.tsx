import React from "react";
import { AuthContext } from "../../utils/context/AuthContext.tsx";
import { AdminMainLayout, Page } from "../../utils/styles/index.tsx";

const Dashboard = () => {
    const { user } = React.useContext(AuthContext);

    console.log(user);
    return (
        <Page>
            <AdminMainLayout>
                haloe
                {user && <div>{user.username}</div>}
            </AdminMainLayout>
        </Page>
    )
};

export default Dashboard;