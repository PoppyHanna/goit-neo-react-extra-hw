import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAstronaut, FaUserCircle, FaUserCheck } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { RiUserSmileLine } from "react-icons/ri";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { clearContacts } from "../../redux/contacts/slice";
import css from "./UserMenu.module.css";

const iconOptions = [
  { id: "classic", label: "Classic", Icon: FaUserCircle },
  { id: "friendly", label: "Friendly", Icon: RiUserSmileLine },
  { id: "modern", label: "Modern", Icon: HiUserCircle },
  { id: "accent", label: "Accent", Icon: FaUserAstronaut },
];

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [activeIcon, setActiveIcon] = useState(iconOptions[0].id);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearContacts());
  };

  const selectedIcon =
    iconOptions.find((icon) => icon.id === activeIcon) ?? iconOptions[0];
  const SelectedIcon = selectedIcon.Icon;

  return (
    <div className={css.menu}>
      <div className={css.iconPicker}>
        <span className={css.iconLabel}>Icon:</span>
        <div className={css.iconOptions}>
          {iconOptions.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`${css.iconOption} ${activeIcon === id ? css.active : ""}`}
              onClick={() => setActiveIcon(id)}
              aria-label={`Use ${label} icon`}
            >
              <Icon className={css.optionIcon} />
              <span className={css.optionLabel}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className={css.name}>
        <span className={css.iconWrap}>
          <SelectedIcon className={css.userIcon} />
        </span>
        Welcome, {user.name}
      </p>
      <button className={css.btn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
