import customButton from "@/customComs/custom-button/index.vue";
import customText from "@/customComs/custom-text/index.vue";
import customRect from "@/customComs/custom-rect/index.vue";

const install = (app: any): void => {
  app.component("customButton", customButton);
  app.component("customText", customText);
  app.component("customRect", customRect);
};

export default install;
