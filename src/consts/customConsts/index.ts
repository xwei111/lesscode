import buttonAttr from "./button/attr";
import buttonStl from "./button/stl";

import rectAttr from "./rect/attr";
import rectStl from "./rect/stl";

import textAttr from "./text/attr";
import textStl from "./text/stl";

import imgAttr from "./img/attr";
import imgStl from "./img/stl";

import qrAttr from "./qr/attr";
import qrStl from "./qr/stl";

export default {
  button: {
    attr: buttonAttr,
    stl: buttonStl,
  },
  rect: {
    attr: rectAttr,
    stl: rectStl,
  },
  text: {
    attr: textAttr,
    stl: textStl,
  },
  img: {
    attr: imgAttr,
    stl: imgStl,
  },
  qr: {
    attr: qrAttr,
    stl: qrStl,
  },
} as any;
