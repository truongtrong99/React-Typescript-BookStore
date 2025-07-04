import { useCurrentApp } from "components/context/app.context";


const AppHeader = () => {
    const { user } = useCurrentApp();
    return (
        <div>
            <p>App Header</p>
            <div>
                {JSON.stringify(user)}
            </div>
        </div>
    );
}

export default AppHeader;