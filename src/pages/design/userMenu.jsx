import '../../styles/menu.css';

export default function UserMenu({onSignOut}) {
    return (
        <div className="user-menu" tabIndex={0}>
            <button
                onClick={onSignOut}
                className="user-menu-item user-menu-signout">
                Sign out
            </button>
        </div>
    );
}