/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

export const autoImportIcons = (app) => {
  /* add icons to the library */
  library.add(faEnvelope, faEye, faHeart, faEyeSlash, faUser);
  app.component("font-awesome-icon", FontAwesomeIcon);
};
