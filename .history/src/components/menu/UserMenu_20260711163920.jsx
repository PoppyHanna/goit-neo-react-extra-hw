import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { clearContacts } from "../../redux/contacts/slice";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
     dispatch(clearContacts())
  }

  return (
    <div className={css.menu}>
      <p className={css.name}>👤 Welcome, {user.name}</p>
      {/* <button className={css.btn} onClick={() => dispatch(logout())}> */}
      <button className={css.btn} onClick={() => dispatch(handleLogout())}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
