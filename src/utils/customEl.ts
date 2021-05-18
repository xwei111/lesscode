import customButton from "@/customComs/custom-button/index.vue";
import customText from "@/customComs/custom-text/index.vue";
import customRect from "@/customComs/custom-rect/index.vue";
import customImg from "@/customComs/custom-img/index.vue";
import customQr from "@/customComs/custom-qr/index.vue";

const install = (app: any): void => {
  app.component("customButton", customButton);
  app.component("customText", customText);
  app.component("customRect", customRect);
  app.component("customImg", customImg);
  app.component("customQr", customQr);
};

export default install;
